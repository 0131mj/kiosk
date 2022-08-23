const companyNav = document.getElementById("company-nav");
const companyMenu = {
    ho: "본부 연혁",
    hq: "본사 연혁",
}

/** 현재 메뉴 결정 **/
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {menu} = params || {};
const curMenu = menu || Object.keys(companyMenu)[0];

const page = "history";

/** 현재 메뉴 표시 **/
companyNav.outerHTML = `
<div class="content-nav">
    <div class="flex-row menus">   
        ${Object.entries(companyMenu).reduce((acc, [key, text]) => {
    return acc + `<a href="./${page}.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
}, "")}
    </div>    
</div>
`;

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e)=>{
        e.stopPropagation()
    })
})

const historyData = {
    ho: [
        ["1887.03", "우리나라 최초의 전기점등(경복궁 건청궁)", ""],
        ["1898.01", "한성전기 설립", ""],
        ["1908.09", "일한와사(주) 설립", ""],
        ["1917.04", "개성전기(주) 설립", ""],
        ["1943.02", "조선전업㈜ 설립", ""],
        ["1961.07", "한국전력주식회사 발족(3사 통합 : 조선전업, 경성전기, 남선전기)", ""],
        ["1982.01", "한국전력공사 발족", ""],
        ["2001.04", "발전부문 6개 자회사로 분리", ""],
        ["2014.12", "본사 나주 혁신도시 이전", ""],
    ],
    hq: [
        ["1910.6.9", "한일와사㈜ 마산지점", ""],
        ["1947.10.1", "남선전기㈜ 마산지점", "01"],
        ["1961.7.1", "한국전력㈜ 경남지점 마산영업소", "02"],
        ["1982.1.1", "한국전력공사 경남지사","03"],
        ["1988.11.2", "한국전력공사 창원전력관리처 분리발족", "04"],
        ["1988.11.2", "한국전력공사 경남사업본부", "05"],
        ["2009.1.12", "판매 및 송변전 통합 경남지역본부", "06"],
        ["2018.12.27~", "한국전력공사 경남본부"],
    ]
}

const showHistory = (target) => {
    const historyEl = document.getElementById('history');
    historyEl.innerHTML = `<ol class="hq-history">${
        historyData[target].reduce((acc, [date, text, file])=>{
            acc += `<li>
                        <div class="hq-history-date">${date}</div>
                        <div class="hq-history-content">
                            <duv class="hq-history-text">${text}</duv>
                            ${file ? `<img src="./img/hq_history_${file}.png" alt="${text}">`: ""}                            
                        </div>
                    </li>`;
            return acc;
        },"")
    }</ol>`;
    if(target === "ho"){
        const img = document.createElement("img");
        img.src = "./img/kepco.jpg";
        img.alt = "본사 사진";
        img.classList.add("ho-img");
        historyEl.append(img);
    }
}

showHistory(curMenu);



