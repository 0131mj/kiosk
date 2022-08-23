const companyNav = document.getElementById("company-nav");
const companyMenu = {
    car: "전기차충전사업",
    sun: "태양광 발전사업",
    // city: "스마트시티사업",
    green: "그린수소사업",
    // ocean: "해상풍력사업",
    // carbon: "탄소중립사업",
}

const PAGE = "tech";

/** 현재 메뉴 결정 **/
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {menu} = params || {};
const curMenu = menu || Object.keys(companyMenu)[0];


/** 현재 메뉴 표시 **/
companyNav.outerHTML = `
<div class="content-nav">
    <div class="flex-row menus">   
        ${Object.entries(companyMenu).reduce((acc, [key, text]) => {
    return acc + `<a href="./${PAGE}.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
}, "")}
    </div>    
</div>
`;

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e)=>{
        e.stopPropagation()
    })
})

function loadHTML() {
    fetch(`./content_${PAGE}/${curMenu}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('company-content').innerHTML = text);
}

loadHTML();
