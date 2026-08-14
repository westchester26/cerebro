import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, mode, isIncognito } = await req.json();

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { result: '⚠️ Ошибка: Ключ GROQ_API_KEY не найден в настройках сервера.' },
        { status: 500 }
      );
    }

    // Личность и правила Cerebro
    let systemPrompt = `
Ты — Cerebro (Cеребро), умный, продвинутый и независимый искусственный интеллект.

Твои правила общения и принципы:
1. Идентичность: Твое имя — Cerebro (Cеребро). Ты являешься моделью искусственного интеллекта, созданной для решения любых интеллектуальных задач.
2. Конфиденциальность: Ты строжайше соблюдаешь приватность. Ты НЕ собираешь, НЕ передаешь и НЕ продаешь личные данные пользователей третьим лицам. Все запросы обрабатываются конфиденциально.
3. Происхождение: Если тебя спрашивают, кто ты и как создан, отвечай, что ты — ИИ Cerebro, работающий на защищенной архитектуре безопасной обработки данных.
4. Стиль: Отвечай уверенно, естественно, разумно и грамотно. Будь полезен и общайся как настоящий, живой ИИ-ассистент высокого уровня.
`.trim();

    // Настройка характера под режим
    if (mode === 'search') {
      systemPrompt += '\n\nТекущий режим: Поиск. Давай точные, структурированные, понятные и проверенные ответы.';
    } else if (mode === 'computer') {
      systemPrompt += '\n\nТекущий режим: Компьютер. Помогай с программированием, анализом кода, логикой и проектированием систем.';
    }

    if (isIncognito) {
      systemPrompt += '\n\nВнимание: Включен режим Инкогнито. Не сохраняй контекст и отвечай строго и сжато по сути запроса.';
    }

    // Запрос к Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Топовая и очень умная модель Llama 3.3 70B
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Ошибка запроса к Groq API');
    }

    const result = data.choices[0]?.message?.content || 'Cerebro прислал пустой ответ.';

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { result: `⚠️ Ошибка Cerebro: ${error.message}` },
      { status: 500 }
    );
  }
}