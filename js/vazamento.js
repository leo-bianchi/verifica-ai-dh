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