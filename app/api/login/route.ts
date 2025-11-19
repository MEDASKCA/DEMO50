import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Demo credentials - require approval for access
    const validCredentials = [
      { username: 'demo', password: 'nhscep2025' },
      { username: 'admin', password: 'medaskca2025' },
      { username: 'theatremanager', password: 'tom2025' }
    ];

    const user = validCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (user) {
      const response = NextResponse.json(
        { success: true, message: 'Authentication successful' },
        { status: 200 }
      );

      // Set HTTP-only cookie for security
      response.cookies.set('tom_intro_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
