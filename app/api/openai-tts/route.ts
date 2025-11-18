import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/openai-tts
 * OpenAI Text-to-Speech with multiple voice options
 * Supports: alloy, echo, fable, onyx, nova, shimmer
 */
export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'onyx' } = await request.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.log('OpenAI API key not configured');
      return new Response(JSON.stringify({ useBrowserVoice: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const openai = new OpenAI({ apiKey });

    // Create speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1", // or "tts-1-hd" for higher quality
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
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
    console.error('OpenAI TTS Error:', error);

    // Fallback to browser voice
    return new Response(JSON.stringify({ useBrowserVoice: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
