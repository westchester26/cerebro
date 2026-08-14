import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, mode, isIncognito } = await req.json();

    const OLLAMA_MODEL = 'cerebro';
    const OLLAMA_URL = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434/api/chat';

    let systemPrompt = 'Ты — Cerebro (Серебро ИИ).';
    if (mode === 'search') systemPrompt += ' Режим: Поиск.';
    if (mode === 'computer') systemPrompt += ' Режим: Компьютер.';
    if (isIncognito) systemPrompt += ' Режим Инкогнито.';

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.message?.content || 'Cerebro прислал пустой ответ.';

    return NextResponse.json({ result });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { result: '⚠️ Ошибка связи с Ollama. Проверь, запущен ли сервис.' },
      { status: 500 }
    );
  }
}