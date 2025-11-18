import OpenAI from 'openai';

/**
 * OpenAI Client for TOM AI
 * Uses OpenAI SDK v4
 */

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in environment variables.');
    }

    client = new OpenAI({
      apiKey,
    });

    console.log('✅ OpenAI client initialized');
  }

  return client;
}

export async function queryOpenAI(userMessage: string, systemPrompt?: string): Promise<string> {
  try {
    const client = getOpenAIClient();
    const model = 'gpt-4o-mini'; // Cost-effective model for your $5 credit

    console.log('🔵 OpenAI - Querying model:', model);

    const messages: any[] = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }

    messages.push({
      role: 'user',
      content: userMessage,
    });

    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content || '';
    console.log('✅ OpenAI - Response received:', content.substring(0, 100) + '...');

    return content;
  } catch (error: any) {
    console.error('❌ OpenAI Error:', error);
    throw error;
  }
}

export async function streamOpenAI(userMessage: string, systemPrompt?: string): Promise<ReadableStream> {
  const client = getOpenAIClient();
  const model = 'gpt-4o-mini';

  console.log('🔵 OpenAI - Streaming from model:', model);

  const messages: any[] = [];

  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: systemPrompt,
    });
  }

  messages.push({
    role: 'user',
    content: userMessage,
  });

  const stream = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 1500,
    stream: true,
  });

  // Create a ReadableStream from the OpenAI stream
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
