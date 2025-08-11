require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API — registre ANTES do static
app.use('/api', chatRoutes);

// Serve arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota principal que envia o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});




