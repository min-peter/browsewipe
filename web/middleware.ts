import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');

    if (!token) {
        return NextResponse.json({
            success: false,
            message: 'authentication failed',
        },
        {
            status: 401,
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/browsers/protected/:path*',
    // matcher: '/api/browsers/:path*',
}
