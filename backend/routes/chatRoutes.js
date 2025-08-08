const express   = require('express');
const router = express.Router();

const { chat } = require('../controllers/chatController');

router.post('/message', chat);

console.log('🛣️ As rotas do chat estão carregadas!')

module.exports = router;
