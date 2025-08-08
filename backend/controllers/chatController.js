const fetch = require('node-fetch');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

async function handleChat(req, res) {
    const question = req.body.question;
    if (!question) {
        return res.status(400).json({ error: 'Pergunta é obrigatória.' });
    }

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({
                question: question
            })
        });

        if (!response.ok) {
            throw new Error('⚠️ Erro ao obter resposta do Gemini.');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '❌ Ocorreu um erro no servidor!!' });
    }
}

module.exports = { handleChat };