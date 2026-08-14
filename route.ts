import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, proMode } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Проверяем наличие ключа
    if (!apiKey) {
      return NextResponse.json(
        { result: "⚠️ Ошибка: GEMINI_API_KEY не настроен в Vercel Environment Variables." },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { result: "⚠️ Ошибка: Пустой запрос." },
        { status: 400 }
      );
    }

    const modelName = proMode ? "gemini-1.5-pro" : "gemini-1.5-flash";

    // 2. Используем правильный эндпоинт v1beta
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    // 3. Если Google вернул ошибку — передаем ее подробности и статус
    if (!response.ok || data.error) {
      console.error("Google API Error:", JSON.stringify(data.error, null, 2));
      return NextResponse.json(
        { result: `❌ Ошибка Google API (${response.status}): ${data.error?.message || 'Неизвестный сбой'}` },
        { status: response.status || 400 }
      );
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Ответ не получен.";

    return NextResponse.json({ result: aiText });

  } catch (error: any) {
    console.error("Vercel Internal Error:", error);
    return NextResponse.json(
      { result: `⚠️ Внутренняя ошибка сервера: ${error?.message || 'Сбой'}` },
      { status: 500 }
    );
  }
}