const controlMenus = `
<div class="control-menus">    
    <button class="control-menu global-menu-open-btn">
        <div style="font-size: 2rem">🏠</div>
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

const globalMenuObj = {
    ceo: {text: "CEO 인사말", submenu: {}},
    vision: {text: "회사 Vision", submenu: {}},
    history: {text: "회사 연혁", submenu: {}},
    office: {text: "관할 사업소", submenu: {}},
    photo: {text: "방문기념 사진촬영", submenu: {}},
    manager: {text: "담당자 찾기", submenu: {}},
    discuss: {text: "회의 안내", submenu: {}},
    beauty: {text: "아름다운 경남사진", submenu: {}},
    counter: {text: '고객창구 업무소개', submenu: {}},
    guest: {
        text: "방문고객 안내",
        submenu: {
            trans: "송변전설비 인근주민지원",
            reward: "송전선로 용지보상",
            sunpower: "태양광 접수"
        }
    },
    support: {
        text: "한전 지원사업",
        submenu: {
            high: "고효율 기기 구매비용 지원",
            efficiency: "에너지 효율화",
            power: "파워체크",
            root: "뿌리기업 지원",
        }
    },
    tech: {
        text: "전력 신기술",
        submenu: {
            car: "전기차 충전사업",
            sun: "태양광 발전사업",
            green: "그린수소 사업",
            // city: "스마트시티사업",
            // ocean: "해상풍력사업",
            // carbon: "탄소중립사업",
        }
    },
    // department: "부서소개",
    // complain_etc: '기타 민원',
    // complains: "민원안내",
    // quiz: "퀴즈",
    // index: "홈",
}

const globalMenus = `
<div class="global-menu-bg dimmed hide">
    <div class="global-menu-panel">
        <div class="global-menu-panel-title bold">한전 경남본부 방문을 환영합니다.</div>          
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
        ${["guest", "support", "tech"].reduce((acc, page)=>{
                acc += Object.entries(globalMenuObj[page].submenu).reduce((_acc, [key, val])=>{
                    _acc += `<a class="tree-fruit color-${page}" href="./${page}.html?menu=${key}" data-menu="${key}">${val}</a>`
                    return _acc;
                },"")
                return acc;
            },"")
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


if (path === "guest" || path === "support" || path === "tech") {
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
        return acc + `<a href="./${path}.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
    }, "")}
            </div>    
        </div>
    `;

    /** 현재 내용 표시 **/
    if (path === "guest" || path === "support") {
        document.getElementById('content').innerHTML = `<img src="./img/${path}/${curMenu}.jpg" style="height: 80vh; max-width: 100%" />`
    } else if (path === "tech") {
        function loadHTML() {
            fetch(`./content_${path}/${curMenu}.html`)
                .then(response => response.text())
                .then(text => document.getElementById('content').innerHTML = text);
        }

        loadHTML();
    }
}

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e) => {
        e.stopPropagation()
    })
})

/**
 * @todo: 30초동안 없으면 슬라이드쇼 넘어가는걸로, 아름다운 경남사진 페이지 크게, 없는 페이지 :  해당 내용은 준비중입니다. 전력신기술 색상 변경, home 아이콘 추가변경
 */