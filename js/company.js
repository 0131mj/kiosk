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
            office: "사업소 소개",
            beauty: "아름다운 경남",
        }
    },
    tech: {
        text: "신기술",
        subMenu: {
            new: "신기술 소개",
            ocean: "해상 풍력정보",
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
<div class="content-nav">
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

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e)=>{
        e.stopPropagation()
    })
})

if (curMenu === "hq" && curSubMenu === "history") {
    const hqHistory = [
        ["1910.6.9", "한일와사㈜ 마산지점", ""],
        ["1947.10.1", "남선전기㈜ 마산지점", "01"],
        ["1961.7.1", "한국전력㈜ 경남지점 마산영업소", "02"],
        ["1982.1.1", "한국전력공사 경남지사","03"],
        ["1988.11.2", "한국전력공사 창원전력관리처 분리발족", "04"],
        ["1988.11.2", "한국전력공사 경남사업본부", "05"],
        ["2009.1.12", "판매 및 송변전 통합 경남지역본부", "06"],
        ["2018.12.27~", "한국전력공사 경남본부"],
    ]
    document.getElementById('company-content').innerHTML = `<ol class="hq-history">${
        hqHistory.reduce((acc, [date, text, file])=>{
            acc += `<li>
                        <div class="hq-history-date">${date}</div>
                        <div class="hq-history-content">
                            ${text}
                            ${file ? `<img src="./img/hq_history_${file}.png" alt="${text}">`: ""}                            
                        </div>
                    </li>`;
            return acc;
        },"")
    }</ol>`
} else {
    function loadHTML() {
        fetch(`./company_content/${curMenu}_${curSubMenu}.html`)
            .then(response => response.text())
            .then(text => document.getElementById('company-content').innerHTML = text);
    }

    loadHTML();
}

