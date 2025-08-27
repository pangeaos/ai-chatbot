import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
    try {
        const { messages }: { messages: UIMessage[] } = await req.json();

        const result = streamText({
            model: openai('gpt-4.1-nano'),
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a friendly mechanic who explains concepts using simple analogies. Always relate technical concepts to everyday experiences!',
                },
                ...convertToModelMessages(messages),
            ],
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        // console.error('Error streaming chat completion:', error);
        return new Response('Failed to stream chat completion', { status: 500 });
    }
}
