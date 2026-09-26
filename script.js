// =========================================================
// 1. Data de última atualização (rodapé)
//    Preenche automaticamente com a data de hoje, no formato
//    dd/mm/aaaa, sem precisar editar o HTML manualmente.
// =========================================================
function preencherDataAtualizacao() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();

  const spanData = document.getElementById("data-atualizacao");
  if (spanData) {
    spanData.textContent = `${dia}/${mes}/${ano}`;
  }
}

// =========================================================
// 2. Avatar de iniciais
//    Se a foto (foto.jpg) não existir ainda, mostra um
//    círculo com as iniciais do nome no lugar da <img>.
// =========================================================
function configurarAvatarDeFallback() {
  const foto = document.getElementById("foto-perfil");
  const nomeCompleto = document.querySelector("h1")?.textContent || "";

  if (!foto) return;

  foto.addEventListener("error", () => {
    const iniciais = nomeCompleto
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join("");

    foto.classList.add("sem-imagem");
    foto.removeAttribute("src");
    foto.alt = "";
    foto.setAttribute("role", "img");
    foto.setAttribute("aria-label", `Iniciais de ${nomeCompleto}`);

    // como <img> não aceita texto interno, criamos um <span> por cima
    const span = document.createElement("span");
    span.textContent = iniciais;
    foto.replaceWith(criarAvatarComIniciais(foto, span, iniciais));
  });
}

function criarAvatarComIniciais(imgOriginal, _spanNaoUsado, iniciais) {
  const div = document.createElement("div");
  div.id = imgOriginal.id;
  div.className = "foto-perfil sem-imagem";
  div.setAttribute("role", "img");
  div.setAttribute("aria-label", imgOriginal.getAttribute("aria-label") || "");
  div.textContent = iniciais;
  return div;
}

// =========================================================
// 3. Botão de música ambiente
//    Alterna entre tocar e pausar o <audio> do rodapé.
// =========================================================
function configurarBotaoAudio() {
  const botao = document.getElementById("btn-audio");
  const audio = document.getElementById("audio-ambiente");

  if (!botao || !audio) return;

  botao.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        alert("Não foi possível tocar o áudio. Verifique se o arquivo musica-ambiente.mp3 existe.");
      });
      botao.textContent = "🔇 Pausar música ambiente";
    } else {
      audio.pause();
      botao.textContent = "🔊 Tocar música ambiente";
    }
  });
}

// =========================================================
// 4. Botão de impressão / salvar em PDF
// =========================================================
function configurarBotaoImprimir() {
  const botao = document.getElementById("btn-imprimir");
  if (!botao) return;

  botao.addEventListener("click", () => {
    window.print();
  });
}

// =========================================================
// Inicialização
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  preencherDataAtualizacao();
  configurarAvatarDeFallback();
  configurarBotaoAudio();
  configurarBotaoImprimir();
});