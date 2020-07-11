const btn = document.getElementById("send");
const resultados = document.getElementById("resultados");
const ipInput = document.getElementById("ip-value");

const exemplo = document.getElementById("exemplo");

const load = document.getElementById("loading");

ipInput.addEventListener("focus", () =>{
    ipInput.style.border = "1.5px solid rgba(100, 0, 255, 1)";
    ipInput.style.boxShadow = "0 0 0";
});

ipInput.addEventListener("blur", () =>{
    ipInput.style.borderColor = "#FFF";
});

async function getLocation(e){
    btn.classList.add("disabled");
    loading.hidden = false;
    e.preventDefault();
    const ip = document.getElementById("ip-value").value;
    const url = `https://ipapi.co/${ip}/json/`;
    
    const request = new Request(url);
    const response = await fetch(request);
    const result = await response.json();

    showInfo(result);
};

function showInfo(result){
    ipInput.value = result.ip;
    btn.classList.remove("disabled");
    loading.hidden = true;
    resultados.innerHTML = "";
    exemplo.hidden = true;
    const res = `                    
    <div class="d-flex justify-content-between flex-column" id="exemplo">
        <h4 class="text-center mt-4 mb-2 sub-titulo-vaza">Resultado</h4>
        <span class="mb-4 text-center ip-ver">IP - (${result.ip}).</span>
        <div class="bg-dark" id="info">
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">IP:</h6>
                <div class="meio-div"></div>
                <span class="m-2 text-wrap">${result.ip}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">País:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_name}, ${result.country}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Capital:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_capital}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Região:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.region}, ${result.region_code}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Cidade</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.city}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Código Continental:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.continent_code}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Moeda:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.currency}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Nome da moeda:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.currency_name}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Linguagens faladas:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.languages}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Código de discagem:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_calling_code}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Código de domínio:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_tld}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Fuso horário:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.timezone}, ${result.utc_offset}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Latitude:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.latitude}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Longitude:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.longitude}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">Área aproximada do país:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_area}</span>
            </div>
            <div class="pais d-flex justify-content-between bordered align-items-center">
                <h6 class="m-2">População aproximada do país:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.country_population}</span>
            </div>
            <div class="pais d-flex justify-content-between align-items-center">
                <h6 class="m-2">Organização:</h6>
                <div class="meio-div"></div>
                <span class="m-2">${result.org}</span>
            </div>
        </div>
    </div>

    `;
    resultados.innerHTML += res;
}

btn.addEventListener("click", getLocation);