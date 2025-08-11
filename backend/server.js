require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors"); 
const app = express();
const chatRoutes = require("./routes/chatRoutes"); // Caminho corrigido para a estrutura do usuário

// Middleware para permitir requisições de outras origens
app.use(cors());
// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Serve arquivos estáticos da pasta 'public' 
app.use(express.static(path.join(__dirname, "..", "public")));

// Rota principal que envia o index.html 
app.get("/", (req, res) => {
    res.set("Content-Security-Policy", "default-src 'self'");
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Usa as rotas do chat
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});