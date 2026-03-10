export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function getAIReply(messageHistory: ChatMessage[], systemPrompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('[OpenRouter] OPENROUTER_API_KEY is missing');
    return "Sorry, we're having trouble right now. Someone will follow up shortly!";
  }

  const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3-8b-instruct';

  // Construct payloads: System prompt first, then last 20 messages to keep context window tight
  const latestMessages = messageHistory.slice(-20);
  const messages = [
    { role: 'system', content: systemPrompt },
    ...latestMessages
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[OpenRouter] API Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error(`[OpenRouter] Response body:`, text);
      return "Sorry, we're having trouble right now. Someone will follow up shortly!";
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== 'string' || reply.trim() === '') {
      console.error('[OpenRouter] Invalid or empty response from model', data);
      return "Sorry, we're having trouble right now. Someone will follow up shortly!";
    }

    return reply.trim();
  } catch (error) {
    console.error('[OpenRouter] Network or timeout error calling API:', error);
    return "Sorry, we're having trouble right now. Someone will follow up shortly!";
  }
}
