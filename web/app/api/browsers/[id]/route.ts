import { connectMongoose } from "@/lib/mongoose";
import UserBrowser from "@/models/UserBrowser";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// Update browser emergacy status
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { user } = await getServerSession(authOptions);
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const { id: browserId } = await context.params;

  await connectMongoose();

  try {
    const browser = await UserBrowser.findOne({
        _id: browserId,
        user_id: userId,
    });

    if (!browser) {
        return NextResponse.json({ message: "Browser profile not found" },{ status: 404 });
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
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  const userId = session.user.id;
  const { id: browserId } = await context.params;

  await connectMongoose();

  try {
    const result = await UserBrowser.deleteOne({
        _id: browserId,
        user_id: userId,
    });

    if (result.deletedCount === 0) {
        return NextResponse.json({ message: "Browser profile not found or you don't have permission to delete it." },{ status: 404 });
    }

    return NextResponse.json({
      status: 'success',
      message: `Successfully deleted browser profile ID: ${browserId}.`,
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({
      status: 'fail',
      message: 'Fail to delete.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}