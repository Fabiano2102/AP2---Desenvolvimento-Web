// Primeiro, defina a função acha_cookie
const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find((e) => e.startsWith(chave));
    return procurado.split("=")[1];
};

// Agora, defina as funções relacionadas aos detalhes do atleta
const exibirDetalhesAtleta = (dados) => {
    const detalhesImagem = document.createElement("img");
    detalhesImagem.src = dados.imagem;
    detalhesImagem.alt = `foto de ${dados.nome}`;

    const detalhesTexto = document.createElement("p");
    detalhesTexto.style.textAlign = "center";
    detalhesTexto.innerHTML = dados.descricao;

    const botaoVoltar = document.createElement("button");
    botaoVoltar.innerHTML = "Voltar";
    botaoVoltar.onclick = voltar;

    const detalhesContainer = document.getElementById('detalhes-container');
    detalhesContainer.appendChild(detalhesImagem);
    detalhesContainer.appendChild(detalhesTexto);
    detalhesContainer.appendChild(botaoVoltar);
};

const obterDetalhesAtleta = async () => {
    const atletaId = acha_cookie('id');
    const endpoint = `https://botafogo-atletas.mange.li/${atletaId}`;

    try {
        const resposta = await fetch(endpoint);
        const dados = await resposta.json();

        // Chame a função para exibir os detalhes do atleta
        exibirDetalhesAtleta(dados);
    } catch (error) {
        console.error("Erro ao obter detalhes do atleta:", error);
    }
};

const voltar = () => {
    window.location.href = "elenco_completo.html";
};

// Agora, adicione o evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Chame a função para obter os detalhes do atleta quando a página carregar
    obterDetalhesAtleta();
});

