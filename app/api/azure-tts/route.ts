import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/azure-tts
 * Azure Text-to-Speech for natural voice output (like ChatGPT)
 */
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return new Response('Text is required', { status: 400 });
    }

    const apiKey = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION || 'uksouth';

    if (!apiKey) {
      console.log('Azure Speech not configured, using browser fallback');
      return new Response(JSON.stringify({ useBrowserVoice: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use Azure TTS endpoint
    const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const ssml = `
      <speak version='1.0' xml:lang='en-GB'>
        <voice xml:lang='en-GB' name='en-GB-RyanNeural'>
          <prosody rate='0.95' pitch='0%'>
            ${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </prosody>
        </voice>
      </speak>
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      },
      body: ssml,
    });

    if (!response.ok) {
      throw new Error(`Azure TTS failed: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    console.error('Azure TTS Error:', error);

    // Fallback to browser voice
    return new Response(JSON.stringify({ useBrowserVoice: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
