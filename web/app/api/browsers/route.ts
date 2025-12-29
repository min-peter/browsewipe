import { NextResponse } from "next/server";
import UserBrowser from '../../../models/UserBrowser';
import { connectMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


// Get all browsers
export async function GET(request: Request) {
  const { user } = await getServerSession(authOptions);
  const userId = user?.id;

  await connectMongoose();
  if (! userId) {
    return NextResponse.json({
      error: 'User not authenticated or user id not found in session.',
    }, {
      status: 401
    });
  }
  console.log("GET browsers for userId:", userId);

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
