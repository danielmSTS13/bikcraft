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

//  ENVIO DO FORMULÁRIO (WEB3FORMS) 

const formContato = document.getElementById('contato-form');
const botaoEnviar = document.getElementById('botao-enviar');
const feedback = document.getElementById('form-feedback');

if (formContato && botaoEnviar && feedback) {
  formContato.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o redirecionamento padrão do navegador

    // 1. Estado de envio
    botaoEnviar.disabled = true;
    botaoEnviar.innerText = 'Enviando...';
    feedback.style.display = 'none';
    feedback.innerText = '';

    // 2. Extração dos dados do formulário
    const formData = new FormData(formContato);
    const json = JSON.stringify(Object.fromEntries(formData));

    try {
      // 3. Disparo assíncrono para a Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const data = await response.json();

      // Tratando a resposta
      if (response.status === 200 && data.success) {
        feedback.innerText = 'Mensagem enviada com sucesso! Responderemos em até 24h.';
        feedback.style.color = '#38b000';
        feedback.style.display = 'block';
        
        formContato.reset(); 
      } else {
          feedback.innerText = data.message || 'Ocorreu um erro no envio. Tente novamente.';
          feedback.style.color = '#e63946';
          feedback.style.display = 'block';
      }
    } catch (error) {
        feedback.innerText = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        feedback.style.color = '#e63946';
        feedback.style.display = 'block';
    } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.innerText = 'Enviar Mensagem';
    }
  });
}