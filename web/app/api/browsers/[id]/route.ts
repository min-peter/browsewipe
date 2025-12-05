import { connectMongoose } from "@/lib/mongoose";
import UserBrowser from "@/models/UserBrowser";
import { type NextRequest, NextResponse } from "next/server";
const BASE_URL = process.env.EXTERNAL_API_DOMAIN;

// Update browser emergacy status
export async function PUT(
  request: any,
  context: { params: { id: string } }
) {
  await connectMongoose();

  try {
    const { id } = await context.params;
    const browserId =  await id;
    const userId = await request.userId;

    const browser = await UserBrowser.findOne({
        _id: browserId,
        user_id: userId,
    });

    if (!browser) {
        return NextResponse.json({ message: "Browser profile not found" },{ status: 400 });
    }

    browser.emergency_action = !browser.emergency_action;
    await browser.save();

    return NextResponse.json({
      status: 'success',
      message: 'Successfully updated.',
      data: browser,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({
      status: 'fail',
      message: 'Fail to update.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });

    if (! response.ok) {
      throw new Error(`External API failed with status: ${response.status}`);
    }

    return NextResponse.json({
      status: 'success',
      message: `Successfully deleted post ID: ${id}.`,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Fail to delete.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}