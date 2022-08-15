const controlMenus = `
<div class="control-menus">
    <button id="control-spread-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
</button>
    <a class="control-menu" href="./index.html">홈</a>
    <button class="control-menu global-menu-open-btn">전체<br/>메뉴</button>
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

        /** 홈 메뉴 아닐 때는 접어서 표시 **/
        const isHome = window.location.href.endsWith('index.html');
        if (!isHome) {
            const controlSpreadBtn = document.getElementById("control-spread-btn");
            const el = document.querySelector(".control-menus");
            el.classList.add("fold")
            controlSpreadBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                el.classList.remove("fold")
            })
        }
    }
}

window.addEventListener("DOMContentLoaded", renderControlMenu);

const globalMenuObj = {
    company: "회사소개",
    department: "부서소개",
    complains: "민원안내",
    photo: "기념촬영",
    support: "지원사업",
    discuss: "회의내역",
    manager: "담당자 찾기",
    quiz: "퀴즈",
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
headerHomeBtn.innerHTML = `<img src="./img/logo.png" alt="한전 로고" id="logo">`;
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
