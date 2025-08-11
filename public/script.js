const inputPergunta = document.querySelector('.caixa-pergunta input[type="text"]');
const btnEnviar = document.getElementById('submit-btn');
const caixaResposta = document.querySelector('.caixa-resposta');

const inputApiKey = document.getElementById('apiKeyInput');
const selectModel = document.getElementById('modelSelect');
const btnLimpar = document.getElementById('limpar-btn');
const btnCopiar = document.getElementById('copiar-btn');
const charCount = document.getElementById('charCount');


// Carrega API Key do localStorage ao iniciar
inputApiKey.value = localStorage.getItem('apiKey') || '';

// Atualiza contador de caracteres do input pergunta
inputPergunta.addEventListener('input', () => {
  charCount.textContent = `${inputPergunta.value.length}/300`;
});

// Função para mostrar mensagens de erro
function mostrarErro(msg) {
  caixaResposta.textContent = '❌ ' + msg;
}

// Função para limpar resposta e pergunta
btnLimpar.addEventListener('click', () => {
  caixaResposta.textContent = '';
  inputPergunta.value = '';
  charCount.textContent = '0/300';
  inputPergunta.focus();
});

// Função para copiar texto da resposta para a área de transferência
btnCopiar.addEventListener('click', () => {
  const texto = caixaResposta.textContent;
  if (!texto) return alert('Nada para copiar!');
  navigator.clipboard.writeText(texto).then(() => {
    alert('Resposta copiada!');
  }).catch(() => {
    alert('Erro ao copiar!');
  });
});

// Função principal de envio da pergunta
async function enviarPergunta() {
  const pergunta = inputPergunta.value.trim();
  const apiKey = inputApiKey.value.trim();
  const modelo = selectModel.value;

  // Validações
  if (!apiKey) {
    mostrarErro('API Key é obrigatória.');
    return;
  }
  if (!pergunta) {
    mostrarErro('Por favor, digite sua pergunta.');
    return;
  }

  // Salvar API Key no localStorage
  localStorage.setItem('apiKey', apiKey);

  btnEnviar.disabled = true;
  caixaResposta.textContent = '⏳ Carregando...';

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: pergunta, apiKey, model: modelo }),
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor 😢');
    }

    const data = await response.json();

    // Mostrar pergunta + resposta
    caixaResposta.innerHTML = `<strong>Pergunta:</strong> ${pergunta}<br/><br/><strong>Resposta:</strong> ${data.answer || 'Sem resposta da IA 😢'}`;

    // Scroll automático para resposta
    caixaResposta.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    mostrarErro('Erro ao conectar com o servidor 😢');
  } finally {
    btnEnviar.disabled = false;
  }
}

// Evento clique no botão enviar
btnEnviar.addEventListener('click', (e) => {
  e.preventDefault();
  enviarPergunta();
});

// Atalho Ctrl+Enter para enviar pergunta
inputPergunta.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    enviarPergunta();
  }
});


