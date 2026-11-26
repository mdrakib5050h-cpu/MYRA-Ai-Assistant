const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function askGemini(message, apiKey) {
  if (!apiKey) {
    throw new Error('Gemini API key is missing');
  }

  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini request failed');
  }

  return data.candidates?.[0]?.content?.parts
    ?.map(part => part.text || '')
    .join('') || 'No response received';
}
