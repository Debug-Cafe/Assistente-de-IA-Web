const inputPergunta = document.querySelector('.caixa-pergunta input[type="text"]');
const btnEnviar = document.getElementById('submit-btn');
const caixaResposta = document.querySelector('.caixa-resposta');
const paragrafoResposta = caixaResposta.querySelector('p');
const btnLimpar = document.getElementById('limpar-btn');
const btnCopiar = document.getElementById('copiar-btn');
const charCount = document.getElementById('charCount');

inputPergunta.addEventListener('input', () => {
  charCount.textContent = `${inputPergunta.value.length}/300`;
});

function mostrarErro(msg) {
  paragrafoResposta.textContent = '❌ ' + msg;
}

btnLimpar.addEventListener('click', () => {
  paragrafoResposta.textContent = 'Ele conta com nosso modelo mais inteligente, rápido e útil até hoje, com raciocínio integrado para você receber sempre a melhor resposta.';
  inputPergunta.value = '';
  if (charCount) charCount.textContent = '0/300';
  inputPergunta.focus();
});

btnCopiar.addEventListener('click', () => {
  const texto = paragrafoResposta.textContent;
  if (!texto) return alert('Nada para copiar!');
  navigator.clipboard.writeText(texto).then(() => {
    alert('Resposta copiada!');
  }).catch(() => {
    alert('Erro ao copiar!');
  });
});

async function enviarPergunta() {
  const pergunta = inputPergunta.value.trim();

  if (!pergunta) {
    mostrarErro('Por favor, digite sua pergunta.');
    return;
  }

  btnEnviar.disabled = true;
  paragrafoResposta.textContent = '⏳ Carregando...';

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: pergunta }),
    });

    if (!response.ok) {
      throw new Error('Erro na resposta do servidor 😢');
    }

    const data = await response.json();

    paragrafoResposta.textContent = data.answer || 'Sem resposta da IA 😢';

    caixaResposta.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    mostrarErro('Erro ao conectar com o servidor 😢');
  } finally {
    btnEnviar.disabled = false;
  }
}

btnEnviar.addEventListener('click', (e) => {
  e.preventDefault();
  enviarPergunta();
});

inputPergunta.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    enviarPergunta();
  }
});
