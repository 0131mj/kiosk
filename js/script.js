const controlMenus = `
<div class="control-menus">    
    <button class="control-menu global-menu-open-btn">
        <svg height="4vw" width="4vw" id="Layer_1" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path fill="white" d="M15.45,7L14,5.551V2c0-0.55-0.45-1-1-1h-1c-0.55,0-1,0.45-1,1v0.553L9,0.555C8.727,0.297,8.477,0,8,0S7.273,0.297,7,0.555  L0.55,7C0.238,7.325,0,7.562,0,8c0,0.563,0.432,1,1,1h1v6c0,0.55,0.45,1,1,1h3v-5c0-0.55,0.45-1,1-1h2c0.55,0,1,0.45,1,1v5h3  c0.55,0,1-0.45,1-1V9h1c0.568,0,1-0.437,1-1C16,7.562,15.762,7.325,15.45,7z"/>
        </svg>
    </button>
</div>
`;

const showGlobalMenu = (e) => {
    const globalMenuEl = document.querySelector(".global-menu-bg");
    globalMenuEl.classList.remove("hide");
};

const hideGlobalMenu = (e) => {
    e.stopPropagation();
    const globalMenuEl = document.querySelector(".global-menu-bg");
    globalMenuEl.classList.add("hide");
};

const moveBack = (e) => {
    e.stopPropagation();
    window.history.back();
}

const renderControlMenu = () => {
    const controlMenusEl = document.getElementById("control-menus");
    if (controlMenusEl) {
        controlMenusEl.outerHTML = controlMenus;
        document.querySelectorAll('a').forEach(a => {
            a.addEventListener("click", (e) => {
                e.stopPropagation()
            })
        })
        document.querySelectorAll('button').forEach(a => {
            a.addEventListener("click", (e) => {
                e.stopPropagation()
            })
        })
        const globalMenuOpenBtnEl = document.querySelector(".global-menu-open-btn");
        globalMenuOpenBtnEl.addEventListener("click", showGlobalMenu);
    }
}

window.addEventListener("DOMContentLoaded", renderControlMenu);

const SUPPORT_MENUS = ["visitor", "support", "tech"];

const globalMenuObj = {
    ceo: {text: "CEO 인사말", submenu: {}},
    vision: {
        text: "회사 Vision",
        submenu: {
            hq: "본부 비전",
            ho: "본사 비전",
        }
    },
    history: {
        text: "회사 연혁",
        submenu: {
            hq: "본부 연혁",
            ho: "본사 연혁",
        }
    },
    office: {text: "관할 사업소"},
    photo: {text: "방문기념 사진촬영"},
    manager: {text: "담당자 찾기"},
    discuss: {text: "회의 안내"},
    beauty: {text: "아름다운 경남사진"},
    counter: {text: '고객창구 업무소개'},
    [SUPPORT_MENUS[0]]: {
        text: "방문고객 안내",
        submenu: {
            trans: "송변전설비 인근주민지원",
            reward: "송전선로 용지보상",
            sunpower: "태양광 접수"
        }
    },
    [SUPPORT_MENUS[1]]: {
        text: "한전 지원사업",
        submenu: {
            root: "뿌리기업 지원",
            high: "고효율 기기 구매비용 지원",
            efficiency: "에너지 효율화",
            power: "파워체크",
        }
    },
    [SUPPORT_MENUS[2]]: {
        text: "전력 신기술",
        submenu: {
            car: "전기차 충전사업",
            sun: "태양광 발전사업",
            green: "그린수소 사업",
        }
    },
}


const globalMenus = `
<div class="global-menu-bg dimmed hide">
    <div class="global-menu-panel">
        <div class="global-menu-panel-title">한전 경남본부 방문을 환영합니다</div>          
        <div class="global-menus">
            ${Object.entries(globalMenuObj).reduce(
    (rows, [page, {text}]) => rows + `
                    <a href="${page}.html" class="global-menu color-${page}">
                        ${text}
                    </a>`, ""
)
}
        </div>
        <div id="tree-area">
        ${SUPPORT_MENUS.reduce((acc, page) => {
    acc += Object.entries(globalMenuObj[page].submenu).reduce((_acc, [key, val]) => {
        _acc += `<a class="tree-fruit color-${page}" href="./${page}.html?menu=${key}" data-menu="${key}">${val}</a>`
        return _acc;
    }, "")
    return acc;
}, "")
}
        </div>
        <div class="visitor-introduce">전기사용신청, 전기요금, 계약변경, 전력량계 업무<br/><span class="bold">← 좌측 고객지원실</span> 을 이용 바랍니다.</div>
        <footer class="global-menu-close-btn">닫기</footer>    
    </div>
</div>
`
const renderGlobalMenu = () => {
    const globalMenusEl = document.getElementById("global-menu-panel");
    if (globalMenusEl) {
        globalMenusEl.outerHTML = globalMenus;
        const globalMenuEl = document.querySelector(".global-menu-bg");
        const globalMenuCloseBtn = document.querySelector(".global-menu-close-btn");
        globalMenuEl.addEventListener("click", hideGlobalMenu)
        globalMenuCloseBtn.addEventListener("click", hideGlobalMenu);
    }
}

window.addEventListener("DOMContentLoaded", renderGlobalMenu);
window.addEventListener("click", showGlobalMenu);

/* 헤더 버튼 추가 */
const titleHeader = document.querySelector(".title-header");
const headerHomeBtn = document.createElement("a");
headerHomeBtn.innerHTML = `<img src="./img/logo.png" alt="한전 로고 - 홈으로 이동" id="logo">`;
headerHomeBtn.classList.add("header-control-btn");
headerHomeBtn.classList.add("header-home-btn");
headerHomeBtn.setAttribute("href", "./index.html")
headerHomeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
})

const headerBackBtn = document.createElement("button");
headerBackBtn.innerText = "뒤로 가기";
headerBackBtn.classList.add("header-control-btn");
headerBackBtn.classList.add("header-back-btn");
headerBackBtn.addEventListener("click", moveBack);
/** Content **/
const path = window.location.pathname
    .replace(".html", "")
    .replace("kiosk/", "")
    .replace("/", "");

if (titleHeader && path) {
    titleHeader.textContent = globalMenuObj[path].text;
    titleHeader.insertBefore(headerHomeBtn, titleHeader.firstChild);
    titleHeader.appendChild(headerBackBtn);
}


/** MENU **/

if (globalMenuObj[path].submenu) {
    const contentNav = document.getElementById("content-nav");
    const contentMenu = globalMenuObj[path].submenu;

    /** 현재 메뉴 결정 **/
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const {menu} = params || {};
    const curMenu = menu || Object.keys(contentMenu)[0];

    /** 현재 메뉴 표시 **/
    contentNav.outerHTML = `
        <div class="content-nav">
            <div class="flex-row menus">   
                ${Object.entries(contentMenu).reduce((acc, [key, text]) => {
        return acc + `<a href="./${path}.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''} color-${path}">${text}</a>`;
    }, "")}
            </div>    
        </div>
    `;

    /** 현재 페이지 내용 표시 **/

    if (SUPPORT_MENUS.includes(path)) {
        document.body.classList.add("support-page");
        document.getElementById('content').innerHTML = `<img src="./img/${path}/${curMenu}.jpg" style="max-height: 80vh; max-width: 90vw" />`
    } else if (path === "vision") {
        function loadHTML() {
            fetch(`./content_${path}/${curMenu}.html`)
                .then(response => response.text())
                .then(text => document.getElementById('company-content').innerHTML = text)
        }

        loadHTML();
    } else if (path === "history") {
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
                ["1982.1.1", "한국전력공사 경남지사", "03"],
                ["1988.11.2", "한국전력공사 창원전력관리처 분리발족", "04"],
                ["1988.11.2", "한국전력공사 경남사업본부", "05"],
                ["2009.1.12", "판매 및 송변전 통합 경남지역본부", "06"],
                ["2018.12.27~", "한국전력공사 경남본부"],
            ]
        }

        const showHistory = (target) => {
            const historyEl = document.getElementById('history');
            historyEl.innerHTML = `<ol class="hq-history">${
                historyData[target].reduce((acc, [date, text, file]) => {
                    acc += `<li>
                        <div class="hq-history-date">${date}</div>
                        <div class="hq-history-content">
                            <duv class="hq-history-text">${text}</duv>
                            ${file ? `<img src="./img/hq_history_${file}.png" alt="${text}">` : ""}                            
                        </div>
                    </li>`;
                    return acc;
                }, "")
            }</ol>`;
            if (target === "ho") {
                const img = document.createElement("img");
                img.src = "./img/kepco.jpg";
                img.alt = "본사 사진";
                img.classList.add("ho-img");
                historyEl.append(img);
            }
        }

        showHistory(curMenu);
    }
}

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e) => {
        e.stopPropagation()
    })
})


/**
 * @description : 일정시간 동안 터치 없을시 홈으로 이동하는 기능
 */

const isHome = window.location.href.includes("index.html");

if (!isHome) {

    /** 프로그레스바 (테스트 시연용) **/
    const progressBar = document.createElement("div");
    const progressBarStyles = {
        position: "fixed",
        bottom: "0",
        zIndex: "3",
        background: "red",
        width: "100vw",
        height: "0.5vw",
        transition: "all 0.5s linear"
    }
    for (let style in progressBarStyles) {
        progressBar.style[style] = progressBarStyles[style];
    }
    document.body.appendChild(progressBar);
    const showProgress = () => progressBar.style.width = `${cnt / TIMING * 100}vw`;


    /** ----- 일정시간 이상 터치 없을시 홈으로 이동 ----- **/
    const TIMING = 30;
    let cnt;
    const countReset = () => cnt = TIMING;
    countReset();
    const countDown = window.setInterval(() => {
        showProgress(); // 테스트 시연용
        cnt--;
        if (cnt < 1) {
            clearInterval(countDown);
            const isDevMode = window.location.href.startsWith("http://192.168.1.16:8080");
            if (!isDevMode) {
                window.location.href = "./index.html";
            }
        }
    }, 1000);
    window.addEventListener("mousedown", countReset);
    window.addEventListener("touchstart", countReset);
}
