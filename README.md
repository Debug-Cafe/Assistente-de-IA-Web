# Projeto Assistente de IA Web

## Objetivos Gerais

- Criar uma aplicação web interativa do zero  
- Integrar com APIs externas (OpenAI/Gemini)  
- Implementar validação de formulários  
- Gerenciar estados de loading e erro  
- Usar APIs do navegador (localStorage, clipboard)  
- Criar interfaces responsivas e acessíveis  
- Aplicar boas práticas de UX/UI  

---

## Estrutura do Projeto

assistente-ia/
├── index.html
├── style.css
└── script.js

## Funcionalidades do Projeto

### Requisitos Básicos

Serão 4 requisitos principais para esse projeto:

#### 01 - Estrutura HTML Básica
- Cabeçalho com título da aplicação  
- Input para inserir a chave de API da OpenAI  
- Área principal com input para pergunta e botão de envio  
- Seção para exibir a resposta da IA  

#### 02 - Interface de Entrada
- Input de texto para a pergunta do usuário  
- Botão "Perguntar" para enviar a pergunta  
- Input para API Key (tipo password)  

#### 03 - Exibição da Resposta
- Área dedicada para mostrar a resposta da IA  
- Texto deve ser legível e bem formatado  
- Área deve ficar oculta até haver uma resposta  

#### 04 - Integração com API da IA
- Fazer requisição POST para endpoint da OpenAI  
- Enviar pergunta e API Key corretamente  
- Processar resposta e exibir para o usuário  
- Usar `fetch()` e `async/await`  

---

### Requisitos Extras (Opcionais)

#### Estados e Validação
- Estados de loading/carregamento enquanto aguarda resposta  
- Botão desabilitado durante carregamento  
- Validação de formulários (API Key e pergunta não vazias)  
- Tratamento e exibição de erros de conexão  
- Mensagens de erro amigáveis  

#### Funcionalidades de Interação
- Botão para limpar resposta da tela  
- Copiar resposta da IA para área de transferência  
- Salvar API Key no localStorage  
- Atalhos de teclado (Ctrl+Enter para enviar)  

#### Melhorias na Interface
- Mostrar a pergunta junto com a resposta  
- Ícones nos botões  
- Animações suaves e feedback visual  
- Contador de caracteres  
- Scroll automático para resposta  
- Dropdown para seleção de diferentes modelos de IA  

#### Configurações Avançadas
- Histórico de conversas anteriores  
- Temas (dark mode / light mode)  

---

## Configuração e Uso

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)  
- Chave de API da OpenAI  
- Editor de código (VS Code recomendado)  
- Conhecimentos básicos em HTML, CSS e JavaScript  

### Fluxo da Aplicação

1. Usuário obtém uma API Key da OpenAI  
2. Usuário abre a aplicação no navegador  
3. Usuário insere sua API Key no campo apropriado  
4. Usuário digita sua pergunta no textarea  
5. Usuário clica em "Perguntar" ou usa Ctrl+Enter  
6. Aplicação exibe a resposta da IA  
7. Usuário pode copiar a resposta ou limpar para nova pergunta

# Desenvolvimento

Esta seção documenta as contribuições e implementações realizadas durante o desenvolvimento do projeto.

## Backend (server.js)

- Implementado servidor em **Node.js** com **Express**.
- Configuração para servir os arquivos estáticos da pasta `public/`.
- Definição de rota **GET /** para envio do `index.html` com **Content Security Policy** restritiva (`default-src 'self'`).
- Criação do endpoint **POST /ask**:
  - Recebe a pergunta enviada pelo front-end (`question`).
  - Encaminha a requisição para a API Gemini usando variáveis de ambiente (`GEMINI_API_KEY`, `GEMINI_API_URL`).
  - Retorna a resposta da IA para o cliente.
- Uso do **dotenv** para gerenciamento seguro das variáveis de ambiente.
- Estrutura preparada para deploy na **Vercel** com `vercel.json`.

## Frontend (public/)
- `public/index.html`: A estrutura HTML foi criada e atualizada para definir a base da página, incluindo cabeçalho, área de resposta da IA, campo de entrada de pergunta e botões de ação. A organização dos elementos foi otimizada para usabilidade e responsividade, com a separação do contador de caracteres dos botões de ação.
- `public/style.css`: Os estilos CSS foram desenvolvidos e ajustados para estilizar a aplicação, garantindo um design moderno e funcional. Isso inclui estilos para o layout geral, componentes da interface (como caixas de pergunta e resposta), e ajustes para diferentes tamanhos de tela. O posicionamento do contador de caracteres (#charCount) foi refinado para o canto inferior direito do campo de pergunta, evitando colisões.
- `public/script.js`: A lógica JavaScript foi implementada para gerenciar a interatividade do frontend. Isso abrange o envio de perguntas ao backend, a exibição das respostas da IA, a manipulação dos estados de carregamento e erro, e funcionalidades como limpar e copiar a resposta. O script também lida com o contador de caracteres e atalhos de teclado.

## Outras contribuições

- Reorganização da estrutura do projeto para manter o front-end em `public/`.
- Ajuste no README para refletir a nova arquitetura.
- Configuração de scripts no `package.json` para execução local e em produção.
- Implementação de boas práticas de segurança e privacidade, evitando exposição de chaves no front-end.

## Como testar o servidor localmente

1. **Instalar dependências**  
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**  
   Criar um arquivo `.env` na raiz com:
   ```ini
   PORT= a que você quiser
   GEMINI_API_KEY=sua_chave_aqui
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
   ```

3. **Rodar o servidor**  
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:a que voce quiser`.

4. **Testar o endpoint `/ask` via terminal**  


   **No Windows PowerShell:**
   ```powershell
   curl.exe -X POST http://localhost:a que você quiser/api/ask `
     -H "Content-Type: application/json" `
     -d "{\"question\": \"Qual é a capital do Brasil?\"}"
   ```

   **No Linux/Mac (bash/zsh):**
   ```bash
   curl -X POST http://localhost:a que voce quiser/ask      -H "Content-Type: application/json"      -d '{"question": "Qual é a capital do Brasil?"}'
   ```

5. **Testar pelo navegador**  
   - Acesse `http://localhost:a que voce quiser` para abrir a interface web.
   - Faça uma pergunta e verifique a resposta retornada pela IA.
