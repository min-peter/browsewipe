"use server"

import { signIn } from "@/lib/auth"
import { createUser } from "@/lib/db";

export async function registerUser(form: FormData) {
  const credentials =  await createUser(form);
  if (!credentials || credentials.success === false) {
    return credentials;
  }
  await signIn("credentials", credentials, { redirectTo: "/dashboard" });
}

export async function loginUser(formdata: FormData) {
  try {
    await signIn("credentials", formdata, { redirectTo: "/dashboard" });
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    let message = "An unknown error occurred during login.";
    if (error instanceof Error) {
      message = "Invalid email or password"; 
    }
    return { success: false, message: message };
  }
}

export async function signInWithEmail(formdata: FormData) {
  console.log("signInWithEmail", Object.fromEntries(formdata));
  // TODO: Implement signIn with email provider
}
