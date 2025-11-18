// Runtime delegation to canonical login handler to preserve existing client URL
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const mod = await import('../../login/route');
    if (mod && typeof mod.POST === 'function') {
      return await mod.POST(request as any);
    }
    return new Response(JSON.stringify({ success: false, message: 'Login handler not available' }), { status: 500 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: 'Delegation error' }), { status: 500 });
  }
}
