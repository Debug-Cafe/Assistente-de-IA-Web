require ('dotenv').config();
const express = require('express');
const path = require ('path');
const app = express();

// Variaveis, colocando no .env para não ter nada hard coded

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

// Arquivos estáticos 
app.use(express.static('public'));

//Rota principal com variaveis injetadas

app.get('/', (req, res) => {
    res.set('Content-Security-Policy', "default-src 'self'");
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint com as perguntas, para evitar expor a chave no front

app.use(express.json());

app.post('/ask', async(req, res) => {
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: req.body.question
                    }]
                }]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});