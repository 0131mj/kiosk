const controlMenus = `
<div class="control-menus">    
    <button class="control-menu global-menu-open-btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
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
    ceo: "ceo 인사말",
    vision: "비전",
    history: "연혁",
    company: "본사소개",
    quarter: "본부소개",
    office:"관할 사업소",
    department: "부서소개",
    support: "지원사업",
    complains: "민원안내",
    photo: "기념촬영",
    discuss: "회의내역",
    manager: "담당자 찾기",
    tech: "전력 신기술",
    quiz: "퀴즈",
    beauty: "아름다운 경남",
    index: "홈",
}

const globalMenus = `
<div class="global-menu-bg dimmed hide">
    <div class="global-menu-panel">          
        <div class="global-menus">
            ${Object.entries(globalMenuObj).reduce(
    (rows, [link, text]) => rows + `
                    <a href="${link}.html" class="global-menu">
                        ${text}
                    </a>`, ""
)
}
        </div>    
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

if (titleHeader) {
    titleHeader.insertBefore(headerHomeBtn, titleHeader.firstChild);
    titleHeader.appendChild(headerBackBtn);
}
