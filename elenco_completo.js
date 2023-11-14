document.addEventListener("DOMContentLoaded", function () {

        const categorias = [
            { nome: 'Elenco Completo', link: 'elenco_completo.html' },
            { nome: 'Masculino', link: 'masculino.html' },
            { nome: 'Feminino', link: 'feminino.html' }
        ];

        const botoesContainer = document.getElementById('botoesContainer');

        categorias.forEach(categoria => {
            const botao = document.createElement('button');
            botao.textContent = categoria.nome;
            botao.onclick = () => filtrarAtletas(categoria.link);
            botoesContainer.appendChild(botao);
        });

        const filtrarAtletas = (categoria) => {
            // Redireciona para a página da categoria selecionada
            window.location.href = categoria;
        };
    
        const url = "https://botafogo-atletas.mange.li";

        const cria_cartao = (entrada) => {
            const container_atleta = document.createElement("article");
            container_atleta.dataset.id = entrada.id;
            container_atleta.dataset.altura = entrada.altura;
            container_atleta.dataset.nome_completo = entrada.nome_completo;
            container_atleta.dataset.nascimento = entrada.nascimento;
        
            const titulo = document.createElement("h3");
            titulo.innerHTML = entrada.nome;
            const imagem = document.createElement("img");
            imagem.src = entrada.imagem;
            imagem.alt = `foto de ${entrada.nome}`;
        
            const saibaMaisBotao = document.createElement("button");
            saibaMaisBotao.innerHTML = "Saiba Mais";
            saibaMaisBotao.onclick = () => mostrarDetalhes(entrada);
        
            container_atleta.appendChild(titulo);
            container_atleta.appendChild(imagem);
            container_atleta.appendChild(saibaMaisBotao);
        
            container_atleta.onclick = manipulaClick;
        
            document.getElementById("jogadores-container").appendChild(container_atleta);
        };
        const mostrarDetalhes = (entrada) => {
            document.cookie = `id=${entrada.id}`;
            document.cookie = `altura=${entrada.altura}`;
            document.cookie = `nome_completo=${entrada.nome_completo}`;
            document.cookie = `nascimento=${entrada.nascimento}`;
        
            criaPaginaDetalhes({
                imagem: entrada.imagem,
                descricao: entrada.descricao
            });
        };
        const criaPaginaDetalhes = (entrada) => {
            // Cria os elementos da página de detalhes
            const detalhesContainer = document.createElement("div");
            detalhesContainer.style.display = "flex";
            detalhesContainer.style.flexDirection = "column";
            detalhesContainer.style.alignItems = "center";
            detalhesContainer.style.justifyContent = "center";
            detalhesContainer.style.height = "100vh";
            detalhesContainer.style.padding = "20px";
        
            const detalhesImagem = document.createElement("img");
            detalhesImagem.style.maxWidth = "100%";
            detalhesImagem.style.marginBottom = "20px";
            detalhesImagem.src = entrada.imagem;
            detalhesImagem.alt = `foto de ${entrada.nome}`;
            detalhesImagem.style.display = "block";
            detalhesImagem.style.marginLeft = "auto";
            detalhesImagem.style.marginRight = "auto";
        
            const detalhesTexto = document.createElement("p");
            detalhesTexto.style.textAlign = "center";
            detalhesTexto.innerHTML = entrada.descricao;
        
            const botaoVoltar = document.createElement("button");
            botaoVoltar.innerHTML = "Voltar";
            botaoVoltar.onclick = voltar;

            detalhesContainer.appendChild(detalhesImagem);
            detalhesContainer.appendChild(detalhesTexto);
        detalhesContainer.appendChild(botaoVoltar);

        
            // Adiciona o container de detalhes à página body
            document.body.innerHTML = ""; // Limpa o conteúdo existente
            document.body.appendChild(detalhesContainer);
        };

        const voltar = () => {
            window.location.href = "elenco_completo.html";
        };

        const manipulaClick = (e) => {
            const artigo = e.target.closest("article");
            document.cookie = `id=${artigo.dataset.id}`;
            document.cookie = `altura=${artigo.dataset.altura}`;
            document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
            document.cookie = `nascimento=${artigo.dataset.nascimento}`;

            criaPaginaDetalhes({
                imagem: artigo.querySelector("img").src,
                descricao: artigo.querySelector("p").innerHTML
            });
        };

        const acha_cookie = (chave) => {
            const lista_de_cookies = document.cookie.split("; ");
            const procurado = lista_de_cookies.find((e) => e.startsWith(chave));
            return procurado.split("=")[1];
        };

        const pega_json = async (caminho) => {
            try {
                const resposta = await fetch(caminho);
                const dados = await resposta.json();
                return dados;
            } catch (error) {
                console.error("Erro ao obter dados:", error);
            }
        };

        pega_json(`${url}/all`)
    .then((r) => {
        console.log("Dados recebidos:", r); // Adicione esta linha
        for (let atleta of r) {
            cria_cartao(atleta);
        }
        console.log("síncrono");
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
});
