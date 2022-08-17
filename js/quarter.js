const companyNav = document.getElementById("company-nav");
const companyMenu = {
    vision: "비전",
    office: "사업소 소개",
}

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
    return acc + `<a href="./quarter.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
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
    fetch(`./content_quarter/${curMenu}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('company-content').innerHTML = text);
}

loadHTML();
