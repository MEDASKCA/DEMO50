import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Demo credentials
    const validCredentials = [
      { username: 'demo', password: 'nhscep2025', role: 'viewer' },
      { username: 'admin', password: 'medaskca2025', role: 'admin' },
      { username: 'theatremanager', password: 'tom2025', role: 'manager' }
    ];

    const user = validCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (user) {
      const response = NextResponse.json(
        { success: true, message: 'Authentication successful', user: { username: user.username, role: user.role } },
        { status: 200 }
      );

      // Set HTTP-only cookie for security
      response.cookies.set('tom_authenticated', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      response.cookies.set('tom_user', user.username, {
        httpOnly: false, // Accessible by client for display
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
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
