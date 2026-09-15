// Ativar links do menu
const links = document.querySelectorAll('.header-menu a');

function ativarLink(link) {
  const url = location.href; //window.location.href
  const href = link.href;

  if (url.includes(href)) {
    link.classList.add("ativo");
  }
}

links.forEach(ativarLink);

// Ativar itens do Orçamento
const parametros = new URLSearchParams(location.search);

function ativarProduto(parametro) {
  const elemento = document.getElementById(parametro);

  if(elemento) {
    elemento.checked = true;
  }
}

parametros.forEach(ativarProduto);

// Perguntas frequentes (página seguro.html)

const perguntas = document.querySelectorAll('.perguntas button');

function ativarPergunta(event) {
  const pergunta = event.currentTarget;
  const controls = pergunta.getAttribute('aria-controls');
  const resposta = document.getElementById(controls);

  
  resposta.classList.toggle("ativa");
  const ativa = resposta.classList.contains("ativa");
  pergunta.setAttribute("aria-expanded", ativa);
  console.log(controls);
}

function eventosPergunta(pergunta) {
  pergunta.addEventListener('click', ativarPergunta);
}

perguntas.forEach(eventosPergunta);

// Galeria de Bicicletas

const galeria = document.querySelectorAll('.bicicleta-imagens img');
const galeriaContainer = document.querySelector('.bicicleta-imagens');

function trocarImagem(event) {
  const img = event.currentTarget;
  const media = matchMedia("(min-width: 1000px)").matches;
  if (media) {
    galeriaContainer.prepend(img);
  }
}

function eventosGaleria (img) {
  img.addEventListener('click', trocarImagem);
}

galeria.forEach(eventosGaleria);

// Inicialização do Plugin de animação

if (window.SimpleAnime) {
  new SimpleAnime(); 
};

//  ENVIO DO FORMULÁRIO DE CONTATO (WEB3FORMS) 

function configurarFormulario(formId, botaoId, feedbackId, msgSucesso) {
  const form = document.getElementById(formId);
  const botao = document.getElementById(botaoId);
  const feedback = document.getElementById(feedbackId);

  // Se os elementos não existirem na página atual, encerra a execução
  if (!form || !botao || !feedback) return;

  const textoOriginal = botao.innerText;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Estado de carregamento
    botao.disabled = true;
    botao.innerText = 'Enviando...';
    feedback.style.display = 'none';
    feedback.innerText = '';

    // 2. Extrai todos os campos que possuem o atributo "name"
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        // Sucesso
        feedback.innerText = msgSucesso;
        feedback.style.color = '#38b000';
        feedback.style.display = 'block';
        form.reset();
      } else {
        // Erro retornado pela API
        feedback.innerText = data.message || 'Ocorreu um erro no envio. Tente novamente.';
        feedback.style.color = '#e63946';
        feedback.style.display = 'block';
      }
    } catch (error) {
      // Erro de rede/offline
      feedback.innerText = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      feedback.style.color = '#e63946';
      feedback.style.display = 'block';
    } finally {
      // Restaura o botão ao texto original
      botao.disabled = false;
      botao.innerText = textoOriginal;
    }
  });
}

// Formulário da página de Contato
configurarFormulario(
  'contato-form',
  'botao-enviar',
  'form-feedback',
  'Mensagem enviada com sucesso! Responderemos em até 24h.'
);

// Formulário da página de Orçamento
configurarFormulario(
  'orcamento-form',
  'botao-orcamento',
  'orcamento-feedback',
  'Pedido de orçamento enviado com sucesso! Responderemos em breve.'
);

