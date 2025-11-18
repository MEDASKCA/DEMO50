import { NextResponse } from 'next/server';

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );

  // Clear authentication cookies
  response.cookies.delete('tom_authenticated');
  response.cookies.delete('tom_user');

  return response;
}
