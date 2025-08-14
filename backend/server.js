require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors"); 
const app = express();
const chatRoutes = require("./routes/chatRoutes"); // Caminho para a estrutura do usuário

// Middleware para permitir requisições de outras origens
app.use(cors());

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Rota principal com variaveis injetadas
app.get("/", (req, res) => {
    res.set("Content-Security-Policy", "default-src 'self'");
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Usa as rotas do chat
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Oba! 🚀 Servidor rodando na porta ${PORT}`);
});