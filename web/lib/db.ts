import { MongoClient, ServerApiVersion } from "mongodb"
import bcrypt from 'bcryptjs';
import { signUpSchema } from "./zod";
import { ZodError } from "zod";

const DATABSE_NAME = process.env.DATABASE_NAME;
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client


export const getUserFromDb = async ({ email, password}: {email: string, password: string}) => {
  if (!DATABSE_NAME) {
    throw new Error("No DATABSE_NAME set in server enviornment");
  }

  const db = client.db(DATABSE_NAME);
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({email});

  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  const { password: _pw, _id, ...safeUser } = user;
  return {
    id: _id.toString(),
    name: user.name ?? null,
    email: user.email,
    image: user.image ?? null,
    ...safeUser,
  };
}

export const createUser = async (data) => {
  if (!DATABSE_NAME) {
    throw new Error("No DATABSE_NAME set in server enviornment");
  }

  const db = client.db(DATABSE_NAME);
  const usersCollection = db.collection('users');

  try {
    const { name, email, password } = signUpSchema.parse({
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    });

    const user_already_exit = await usersCollection.findOne({ email });
    if (user_already_exit) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    // Hash password
    const hashed_password = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name,
      email,
      password: hashed_password,
      createdAt: new Date(),
    });

    return {
      email,
      password
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, message: error.message };
    }

    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
}

export const loginUser = async (data) => {
  const { email, password } = data;
  try {
    const user = await getUserFromDb({ email, password });
    return {
      success: true,
      user: user,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred" };
  }
}