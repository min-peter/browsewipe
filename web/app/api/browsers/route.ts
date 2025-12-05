import { NextResponse } from "next/server";
import UserBrowser from '../../../models/UserBrowser';
import { connectMongoose } from "@/lib/mongoose";

// Get all browsers
export async function GET(request: Request) {
  await connectMongoose();
  
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const searchTerm = searchParams.get('searchTerm') || '';

  console.log("userId:", userId);
  console.log("searchTerm:", searchTerm);
  if (!userId) {
    return NextResponse.json({
      error: 'No user id found!',
    }, {
      status: 400
    });
  }

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
