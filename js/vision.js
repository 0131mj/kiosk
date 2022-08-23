const companyNav = document.getElementById("company-nav");
const companyMenu = {
    ho: "본부 비전",
    hq: "본사 비전",
}

/** 현재 메뉴 결정 **/
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {menu} = params || {};
const curMenu = menu || Object.keys(companyMenu)[0];

const page = "vision";

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

const showHistory = () => {
    const history = [
        ["1887.03", "우리나라 최초의 전기점등(경복궁 건청궁)", ""],
        ["1898.01", "한성전기 설립", ""],
        ["1900.04", "한성전기, 종로에 가로등 3등을 점등(우리나라 최초의 민간점등)", ""],
        ["1905.06", "인천 거주 일본인 중심, 인천전기(주)를 설립\n" +
        "최초의 수력발전소 운산 수력 준공(660마력, 500kW발전)\n" +
        "평북 청천강 지류 구룡강댐에서 발전 개시", ""],
        ["1908.09", "일한와사(주) 설립", ""],
        ["1917.04", "개성전기(주) 설립", ""],
        ["1943.02", "조선전업㈜ 설립 (조선송전, 부령수력전기, 조선수력전기 3개사 1차 통합)", ""],
        ["1961.07", "한국전력주식회사 발족(3사 통합 : 조선전업, 경성전기, 남선전기)", ""],
        ["1982.01", "한국전력공사 발족", ""],
        ["2001.04", "발전부문 6개 자회사로 분리", ""],
        ["2014.12", "본사 나주 혁신도시 이전", ""],
    ]
    document.getElementById('history').innerHTML = `<ol class="hq-history">${
        history.reduce((acc, [date, text, file])=>{
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
}

function loadHTML() {
    fetch(`./content_${page}/${curMenu}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('company-content').innerHTML = text)
        .then(()=>{
            if (curMenu === "history") {
                showHistory();
            }
        });
}

loadHTML();


