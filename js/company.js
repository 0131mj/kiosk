const companyNav = document.getElementById("company-nav");
const companyMenu = {
    ho: {
        text: "본사",
        subMenu: {
            introduce: "인사말",
            vision: "비전",
            history: "연혁",
        }
    },
    hq: {
        text: "본부",
        subMenu: {
            history: "연혁",
            vision: "비전",
            introduce: "소개",
            beauty: "아름다운 경남",
        }
    },
    new: {
        text: "신기술",
        subMenu: {
            tech: "신기술 소개",
        }
    }
}

/** 현재 메뉴 결정 **/
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const {menu, submenu} = params || {};
const curMenu = menu || Object.keys(companyMenu)[0];
const curSubMenu = submenu || Object.keys(companyMenu[curMenu].subMenu)[0];


/** 현재 메뉴 표시 **/
companyNav.outerHTML = `
<div class="company-nav">
    <div class="flex-row menus">   
        ${Object.entries(companyMenu).reduce((acc, [key, {text}]) => {
    return acc + `<a href="./company.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
}, "")}
    </div>
    <div class="flex-row sub-menus">
        ${Object.entries(companyMenu[curMenu].subMenu).reduce((acc, [key, val]) => {
    return acc + `<a href="./company.html?menu=${curMenu}&submenu=${key}" class="sub-menu${key === curSubMenu ? ' on' : ''}">${val}</a>`;
}, "")}
    </div>
</div>
`;

function loadHTML(){
    fetch(`./company_content/${curMenu}_${curSubMenu}.html`)
        .then(response=> response.text())
        .then(text=> document.getElementById('company-content').innerHTML = text);
}

loadHTML();