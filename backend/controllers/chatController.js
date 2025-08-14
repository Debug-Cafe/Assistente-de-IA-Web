require("dotenv").config({ path: require("path").resolve(__dirname, "..", "..", ".env") });
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

console.log("GEMINI_API_KEY no chatController:", GEMINI_API_KEY);
console.log("GEMINI_API_URL no chatController:", GEMINI_API_URL);

async function handleChat(req, res) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Pergunta é obrigatória.' });
  }

  try {
    if (!GEMINI_API_KEY || !GEMINI_API_URL) {
        console.error('Erro: GEMINI_API_KEY ou GEMINI_API_URL não estão definidas. Verifique seu arquivo .env.');
        return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: question,
          }],
        }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resposta de erro da API Gemini:', response.status, errorBody);
      return res.status(response.status).json({ error: `⚠️ Erro ao obter resposta do Gemini. Status: ${response.status}` });
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sem resposta';

    res.json({ answer });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: '❌ Ocorreu um erro no servidor!!' });
  }
}

module.exports = { handleChat };