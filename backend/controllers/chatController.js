
async function handleChat(req, res) {
  const { question, apiKey, model } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Pergunta é obrigatória.' });
  }
  if (!apiKey) {
    return res.status(400).json({ error: 'API Key é obrigatória.' });
  }
  if (!model) {
    return res.status(400).json({ error: 'Modelo é obrigatório.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateText`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: {
          text: question,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resposta de erro da API Gemini:', response.status, errorBody);
      return res.status(response.status).json({ error: `Erro ao obter resposta do Gemini. Status: ${response.status}` });
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.output || 'Sem resposta';

    res.json({ answer });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = { handleChat };

