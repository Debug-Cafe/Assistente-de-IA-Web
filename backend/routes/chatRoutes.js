const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/chatController"); 

router.post("/ask", handleChat);

console.log('🛣️ As rotas do chat estão carregadas!')

module.exports = router;