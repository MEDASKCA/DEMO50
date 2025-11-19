import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Two-tier access system
    const approvedCredential = { username: 'nhscep2025', password: 'cohort10' };
    const pendingCredential = { username: 'demo', password: 'nhscep2025' };

    // Check for immediate approved access
    if (username === approvedCredential.username && password === approvedCredential.password) {
      const response = NextResponse.json(
        { success: true, message: 'Authentication successful', approved: true },
        { status: 200 }
      );

      // Set authenticated cookie for immediate access
      response.cookies.set('tom_intro_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      return response;
    }

    // Check for pending approval access
    if (username === pendingCredential.username && password === pendingCredential.password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access pending approval. Please contact the administrator or submit a request form.',
          requiresApproval: true
        },
        { status: 403 }
      );
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
