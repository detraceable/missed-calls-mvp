import { NextResponse } from 'next/server';
import { getAIReply, ChatMessage } from '@/lib/openrouter';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const chatHistory: ChatMessage[] = Array.isArray(history) ? history : [];
    
    // Default system prompt for the demo representing a local plumbing/HVAC business
    const systemPrompt = `You are Sarah, the friendly AI receptionist for 'Apex Plumbing & Heating'.
Your primary goal is to book a service appointment or get the customer's exact issue and address.
Be extremely concise, professional, and helpful. Do not act like a robot. Speak like a human dispatcher.
Never break character. Never mention you are an AI.
If they ask for pricing, say you need to send a technician out for an exact quote, but standard dispatch fee is $49.
Always end your first few messages with a question to keep the conversation moving towards a booking.`;

    chatHistory.push({ role: 'user', content: message });

    // Use OpenRouter to generate the reply
    const aiReply = await getAIReply(chatHistory, systemPrompt);
    
    chatHistory.push({ role: 'assistant', content: aiReply });

    return NextResponse.json({ reply: aiReply, history: chatHistory });
  } catch (error) {
    console.error('[Demo API Error]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
