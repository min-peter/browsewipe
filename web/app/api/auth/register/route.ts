import { createUser } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  try {
    const { name, email, password, confirm_password } = body;
    console.log(`Registering user with email: ${email}`);
    if (password !== confirm_password) {
      return new NextResponse('Passwords do not match', { status: 400 });
    }
    
    const user = await createUser(body);

    if (!user || user.success === false) {
      return new NextResponse('Registration failed: '+user?.message, { status: 400 });
    }
    return new NextResponse('User registered successfully', { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return new NextResponse('Registration failed', { status: 500 });
  }
}