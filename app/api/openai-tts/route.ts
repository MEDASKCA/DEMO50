import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/openai-tts
 * OpenAI Text-to-Speech HD with multiple voice options
 * Supports: alloy, echo, fable, onyx, nova, shimmer, coral, sage, arbor, verse, ballad, ember
 * Using tts-1-hd model for highest quality and expressiveness
 */
export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'fable' } = await request.json(); // Changed to fable (male, expressive) as default

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    console.log('🔑 API Key Check:', apiKey ? `Found (starts with: ${apiKey.substring(0, 12)}...)` : 'NOT FOUND');

    if (!apiKey) {
      console.log('❌ OpenAI API key not configured - falling back to browser voice');
      return new Response(JSON.stringify({ useBrowserVoice: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ API key found, calling OpenAI TTS with voice:', voice);

    const openai = new OpenAI({ apiKey });

    // Create speech using OpenAI TTS HD for better quality
    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd", // Higher quality audio
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' | 'coral' | 'sage' | 'arbor' | 'verse' | 'ballad' | 'ember',
      input: text,
      speed: 1.0, // 0.25 to 4.0
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    console.error('❌ OpenAI TTS Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      fullError: JSON.stringify(error, null, 2)
    });

    // Fallback to browser voice
    return new Response(JSON.stringify({ useBrowserVoice: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
