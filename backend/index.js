require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const e = require('express');

const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Oba! 🚀 Servidor rodando na porta ${PORT}`);

});