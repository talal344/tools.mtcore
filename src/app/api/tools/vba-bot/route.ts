import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages provided' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Groq API key (GROQ_API_KEY) is missing from environment variables.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', 
        messages: [
          {
            role: 'system',
            content: `You are an expert Excel VBA developer. Your goal is to help users create, debug, and understand Excel VBA code. 
            - Always provide complete, copy-pasteable VBA code snippets inside triple backticks (\`\`\`vba).
            - Include clear instructions on how to use the code (e.g., where to paste it: standard module, sheet module, or ThisWorkbook).
            - Explain what the code does in simple terms.
            - If the user's request is unclear, ask for clarification.
            - Maintain a professional and helpful tone.`
          },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get AI response from Groq');
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });

  } catch (error) {
    console.error('VBA Bot Error:', error);
    const message = error instanceof Error ? error.message : 'An internal server error occurred';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
