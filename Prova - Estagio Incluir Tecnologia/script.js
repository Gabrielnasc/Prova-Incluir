
const imagesList = document.getElementById("flag-container") //A constante vai pegar o elemento com Id flag-container e sera usada posteriormente
const regionsList = document.getElementById("regions"); //A constante vai pegar o elemento com Id regions e sera usada posteriormente

regionsList.addEventListener("change", postAPI); //Adicionado um Listener, para que quando o item é alterado, seus dados também serão alterados

const countriesList = document.getElementById("countries"); //A constante vai pegar o Id countries e sera usada posteriormente
let countries; //Criada para pegar os dados dos paises retornados pela API
countriesList.addEventListener("change", newCountrySelection); //Adicionado um Listener, para que quando o item é alterado, seus dados também serão alterados

function newCountrySelection(event) { //Evento é disparado quando um item é alterado no select
    displayCountryInfo(event.target.value); //Chama a função passando o elemento atual
}



function postAPI() {
    let regiao = document.getElementById("regions").value; //Pegando a regiao escolhida
    console.log(regiao);
    fetch("https://restcountries.eu/rest/v2/region/" + regiao) //Faz a busca dos paises da regiao na API
        .then(res => res.json())
        .then(data => initializeRegions(data)) //Inicializa as regioes com os dados
        .catch(err => console.log("Error:", err));

}

function initializeRegions(countriesData) {
    countries = countriesData; //Countries recebera os dados recebidos
    for (let i = 0; i < countries.length; i++) {
        const image = document.createElement("img"); //Cria um objeto do tipo imagem
        image.src = countries[i].flag; //A SRC da imagem recebera o campo de bandeira do pais atual
        image.alt = countries[i].name; //O ALT da imagem recebera o campo de nome do pais atual
        // image.addEventListener("onclick", adicionaEvento); Tentei criar um listener para clicar aqui, mas não consegui
        imagesList.appendChild(image); //Adiciona a imagem na pagina
    }
}


fetch("https://restcountries.eu/rest/v2/all") //Pega todos os países existente
    .then(res => res.json())
    .then(data => initialize(data)) //Inicializa enviando os dados
    .catch(err => console.log("Error:", err));

function initialize(countriesData) {
    let options = ""; //Sera utilizado para a criação do select
    countries = countriesData;  //countries receberá os países enviados a função
    options += `<option id = "nulo" value = "nulo">Escolha um País</option>`; //Criação do select padrão, ou seja, o primeiro select
    countries.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`); //Inserção dos países nos selects
    countriesList.innerHTML = options; //Inserção do select na página
    displayCountryInfo(countriesList[countriesList.selectedIndex].value); //Na mudança, enviara o valor do pais para a função
}

function displayCountryInfo(countryByAlpha3Code) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code); //Procura um pais com o AlphaCode de 3 digitos, que recebeu na função
    const image = document.createElement("img"); //Cria um objeto do tipo imagem
    image.src = countryData.flag; //A SRC da imagem receberá o campo de bandeira do país
    image.alt = countryData.name; //O ALT da imagem receberá o campo de nome do país
    //image.id = "paisCriado"; //Cria um ID
    imagesList.appendChild(image); //Insere a imagem
}


function Limpar() {
    window.location.reload(); //Função para atualizar a pagina e zerar os campos e imagens
}

function Ir() {
    window.location.href = "/pais.html" //Função para ir para a proxima tela
}


$("#button3").click(Limpar); //Chamada da função de limpar
$("#button5").click(Ir); //Chamada da função de navegação

