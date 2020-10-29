const countriesList = document.getElementById("countries1"); //A constante recebera o elemento com ID countries1, que sera utilizado posteriormente
const imagesList = document.getElementById("flag-container1") //A constante recebera o elemento com o ID flag-container1, que sera utilizado posteriormente
const borderList = document.getElementById("flag-container-borders") //A constante recebera o elemento com o ID flag-container-borders, que sera utilziado posteriormente
let countries;

countriesList.addEventListener("change", newCountrySelection); //Adicionado um listener para quando houver mudanca no select

function newCountrySelection(event) {
    displayCountryInfo(event.target.value); //Evento é disparado apos uma mudança no select e envia o item atual selecionado
}


fetch("https://restcountries.eu/rest/v2/all") //Pega todos os paises
    .then(res => res.json())
    .then(data => initialize(data)) //Chama a funcao de inicialização
    .catch(err => console.log("Error:", err));

function initialize(countriesData) {
    let options = ""; //Sera utilizado posteriormente para a insercao do select
    countries = countriesData; //Countries recebe os dados passados na função
    options += `<option id = "nulo" value = "nulo">Escolha um país</option>`; //Cria o primeiro item do select
    countries.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`); //Cria as opcoes do select, buscando os paises
    countriesList.innerHTML = options; //Adiciona o select
    displayCountryInfo(countriesList[countriesList.selectedIndex].value); //Na alteracao do select, chama a função com o valor do select
}

function displayCountryInfo(countryByAlpha3Code) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code); //Procura um pais com o Alpha3Code igual ao pais enviado
    const image = document.createElement("img"); //Cria um objeto do tipo imagem
    image.src = countryData.flag; //A SRC da imagem sera o campo flag do pais
    image.alt = countryData.name; //O ALT da imagem sera o campo name do pais
    imagesList.appendChild(image); //Insere a imagem
    document.getElementById("nome1").innerHTML = countryData.name; //O campo nome1 do HTML sera o nome do pais encontrado
    document.getElementById("capital1").innerHTML = countryData.capital; //O campo capital1 do HTML sera a capital do pais encontrado
    document.getElementById("region1").innerHTML = countryData.region; //O campo region1 do HTML sera a regiao do pais encontrado
    document.getElementById("subregion1").innerHTML = countryData.subregion; //O campo subregion1 do HTML sera a subregiao do pais encontrado
    document.getElementById("population1").innerHTML = countryData.population.toLocaleString("pt-BR"); //O campo population1 do HTML sera a populacao do pais encontrado, NOTA-SE que está transformada para o portugues do Brasil
    document.getElementById("languages.nativeName1").innerHTML = countryData.languages.filter(c => c.name).map(c => `${c.name} `).join(", "); //O campo languages.nativeName1 do HTML serao as linguas do pais encontrado, NOTA-SE que pode haver mais de uma lingua, então uma trativa é feita para buscar todas
    for (let i = 0; i < countryData.borders.length; i++) { //For utilizado para inserir as imagens dos paises que fazem fronteira com o país em questão
        const images = document.createElement("img"); //Cria um objeto imagem
        let source = countryData.borders[i].toLowerCase(); //Pega a String de borda na posição "i" e deixa em minusculo
        images.src = `https://restcountries.eu/data/${source}.svg`; //A SRC da imagem será a página web com a "source" recem utilizada
        images.alt = countryData.borders[i].name; //O ALT da imagem será o nome do pais atual que faz fronteira
        // image.addEventListener("onclick", adicionaEvento); Tentei adicionar um evento para que quando fosse clicado, chamaria o país em questão, porém não consegui
        borderList.appendChild(images); //Adiciona a imagem da bandeira do pais atual que faz fronteira
    }
}

function Limpar() {
    window.location.reload(); //Atualiza a janela para limpar os campos
}

function Voltar() {
    window.location.href = "/index.html" //Vai para o index.html
}

$("#button3").click(Limpar); //Chamada da função de Limpar
$("#button4").click(Voltar); //Chamada da função de Voltar