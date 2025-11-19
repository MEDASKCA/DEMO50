import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'fable' } = await request.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('❌ OPENAI_API_KEY is missing!');
      return new Response(JSON.stringify({ useBrowserVoice: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`🎙️ Generating TTS with voice: ${voice}, model: tts-1-hd`);
    const openai = new OpenAI({ apiKey });

    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: text,
      speed: 1.3, // 30% faster - dynamic, energetic delivery to mask robotic qualities
    });

    console.log('✅ OpenAI TTS generated successfully');

    const buffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    console.error('❌ OpenAI TTS Error:', error.message || error);
    console.error('Full error:', error);
    return new Response(JSON.stringify({
      useBrowserVoice: true,
      error: error.message
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
