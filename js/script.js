function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

function copiarTxt() {
    var copyText = document.getElementById("resultado-senha");
  
    copyText.select();
    copyText.setSelectionRange(0, 99999);
  
    document.execCommand("copy");
}

function gerarSenha(num){
    let senhaGerada = "";
    let tudoJunto = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "1234567890" + "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + '"';
    let caracteres = [];
    for (i in tudoJunto){
        caracteres.push(tudoJunto[i]);
    }
    for (n in range(0,num-1)){
        senhaGerada += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    return senhaGerada;
}


function empty(input) {
    return input.value.trim() == "";
}

let errorListUl = document.querySelector("#error-list ul");

function errorMessage(message) { 
    errorListUl.innerHTML += "<li>" + message + "</li>";
}

let email = document.getElementById("verifica");
let x = document.querySelector("div.x-close");

let errorList = document.getElementById('error-list');

function arroba(){
    let temArroba = 0;
    for (char in email.value){
        if (email.value[char] == '@'){
            temArroba ++;
        }
    }
    if (temArroba == 1){
        return temArroba == 1;
    }
    if (temArroba > 1){
            errorMessage("Inclua somente um <b class='text-dark'>@</b> no endereço de email.");  
    }
    else{
        return false;
    }
}    

email.addEventListener("focus", () =>{
    email.style.borderColor = "0"
    email.style.boxShadow = "0 0 0"
});

email.addEventListener("blur", () =>{
    email.style.border = "none";
});

const btnSend = document.getElementById("btn-verifica");

btnSend.addEventListener("click", ev => {
    errorListUl.innerHTML = "";
    
    if (empty(email)){
        errorMessage("O campo <b class='text-dark'>email</b> não pode estar vazio.");
    };
    
    if (arroba() == false){
        errorMessage("Inclua um <b class='text-dark'>@</b> no endereço de email.");
    }

    if (errorListUl.querySelectorAll('li').length > 0){
        ev.preventDefault();
        errorList.hidden = ""; // tira o hidden
        errorList.classList.add("aparece");
        email.style.borderTop = '2px solid red';
        email.style.borderLeft = '2px solid red';
        email.style.borderBottom = '2px solid red';
    } else {
        errorList.hidden = true;
        getBreachs(ev);
    }
});

x.addEventListener('click', () =>{
    errorList.hidden = true;
    email.style.border = "none"
});



//Parte do gerador de Senha
let btnGerador = document.getElementById("btn-gerar");
let resultado = document.getElementById("resultado-senha");
let btnCopiar = document.getElementById("btn-copiar");
let inputTamanho = document.getElementById("tamanho-senha");
let erro = document.getElementById("msg-erro");
let txtCopiado = document.getElementById("txt-copiado");
const abrirGerador = document.getElementById("abrir-gerador");
const dicaGerador = document.getElementById("dicaGerador");

abrirGerador.addEventListener("click", ()=>{
    txtCopiado.hidden = true;
});

dicaGerador.addEventListener("click", ()=>{
    txtCopiado.hidden = true;
});

btnGerador.addEventListener("click", () =>{
    txtCopiado.hidden = true;
    if (inputTamanho.value >= 10){
        erro.hidden = true;
        resultado.value = gerarSenha(inputTamanho.value);
        inputTamanho.style.border = "1px solid #343a40";
        inputTamanho.style.borderRadius = "2px";
    }
    else{
        erro.hidden = false;
        inputTamanho.style.borderRadius = "2px";
        inputTamanho.style.border = "1px solid rgb(255, 0, 0)";
    }
});

btnCopiar.addEventListener("click", () =>{
    if (resultado.value != ""){
        copiarTxt();
        txtCopiado.hidden = false;
    }
});

const solucao = document.getElementById("solucao");
const loading = document.getElementById("loading");

const divResult = document.getElementById("valid");

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

function resestResultDiv() {
  divResult.innerHTML = "";
  solucao.hidden = true;
}

function reverse(str){
    return str.split("-").reverse().join("-");
}

const showBreach = function showMessage(breachs) {
    btnSend.classList.remove("disabled")
    loading.hidden = true;    
    solucao.hidden = false;
    let total = 0;
    divResult.style.background = "linear-gradient(155deg, rgb(0, 0, 0) -50%, rgb(161, 4, 4))";
    breachs.forEach(element => {
        total++;
        if(total == 1){
            divResult.innerHTML = `<p class="badResultTitle">Ops...</p>
                                   <p class="badResult text-center">O email inserido foi encontrado em ${total} vazamento.</p>`
        }else{
        divResult.innerHTML = `<p class="badResultTitle">Ops...</p>
                               <p class="badResult text-center">O email inserido foi encontrado em ${total} vazamentos.</p>`
        }

        const logoPath = `https://haveibeenpwned.com/api/v3/breach/${element.Name}`
        fetch(logoPath)
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                const messageCard = `
                        <div class="result-meio caixa mb-5">
                            <span class="breachName">${info.Name}</span>
                            <p>Data do vazamento: ${reverse(info.BreachDate)}</p>
                            <a href="https://${info.Domain}" target="_blank"><img class="img-fluid" src="${info.LogoPath}" width=115 height=100></a>
                            <p>${info.Description}</p>
                            <div class="d-flex justify-content-center flex-column">
                                <p class="pb-0 mb-0">Dados comprometidos no vazamento:</p>
                                <p class="pt-0">${info.DataClasses.join(", ")}.</p>
                            </div>
                        </div>
                    `;
                divResult.innerHTML += messageCard;
            })
        });
};

const showNotBreached = function showMessage() {
    btnSend.classList.remove("disabled");
    loading.hidden = true;    
    const messageCard = `
                <div class="result-meio">
                    <p class="goodResult">Boas notícias! O email inserido não foi encontrado em nenhum vazamento de dados.</p>
                    <img src="img/cadeado.png" class="img-fluid" width=170 height=170>
                    <p class="mt-3">Para mais segurança, recomendamos que leia as <a href="#dicas" id="link-dicas"><strong>dicas de segurança</strong></a>.</p>
                </div>
            `;
    divResult.innerHTML = messageCard;
    divResult.style.background = "linear-gradient(155deg, rgb(0, 0, 0) -50%, rgb(0, 172, 10))";
};

async function getBreachs(e) {
    btnSend.classList.add("disabled");
    loading.hidden = false;
    e.preventDefault();
    resestResultDiv();
    const account = document.getElementById("verifica").value;
    const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${account}`;

    const request = new Request(proxyUrl + url, {
        method: "GET",
        headers: new Headers({
        "hibp-api-key": "0836f9afecb84519b81975155e961cf5",
        "User-Agent": "Javascript-Verifica",
        "Content-Type": "application/json",
        }),
    });

    const response = await fetch(request);
    if (response.status === 200) {
        const result = await response.json();
        showBreach(result);
        return;
    }
    if (response.status === 404) {
        showNotBreached();
    }
}

const body = document.querySelector("body");
const btnNav = document.querySelector(".btn-nav");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
let ativado = false;

btnNav.addEventListener("click", ()=>{
    if (ativado == false){
        header.style.position = "relative";
        header.style.height = "100vh";
        nav.style.position = "fixed";
        body.style.overflow = "hidden";
        ativado = true;
    } else {
        nav.style.position = "relative";
        header.style.height = "auto";
        body.style.overflow = "scroll";
        ativado = false;
    }
});

let links = document.querySelectorAll(".nav-item");

for (let i = 0; i < links.length; i++) { 
    let link = links[i]; 
    link.addEventListener("click", function() { 
        nav.style.position = "relative";
        document.getElementById("nav-principal").classList.remove("show");
        header.style.height = "auto";
        body.style.overflow = "scroll";
        ativado = false;
    }); 
}