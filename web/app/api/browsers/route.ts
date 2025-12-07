import { NextResponse } from "next/server";
import UserBrowser from '../../../models/UserBrowser';
import { connectMongoose } from "@/lib/mongoose";
import { auth } from "@/lib/auth";

// Get all browsers
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ name: "You must be logged in to access this api." }, { status: 401 });
  }

  await connectMongoose();
  
  const userId = session.user?.id;

  if (!userId) {
    return NextResponse.json({
      error: 'User not authenticated or user id not found in session.',
    }, {
      status: 401
    });
  }

  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm') || '';

  try {
    const query: { user_id: string; browser_name?: any} = { user_id: userId };
    if (searchParams) {
      query.browser_name = { $regex: searchTerm, $options: 'i' };
    }
    
    const browsers = await UserBrowser.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
      return NextResponse.json(browsers);
  } catch (error) {
    console.error("Mongoose query failed:", error);
    return new NextResponse('Failed to fetch post', {
      status: 500
    });
  }
}
