const controlMenus = `
<div class="control-menus">
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
            a.addEventListener("click", (e)=>{
                e.stopPropagation()
            })
        })
        document.querySelectorAll('button').forEach(a => {
            a.addEventListener("click", (e)=>{
                e.stopPropagation()
            })
        })
        const globalMenuOpenBtnEl = document.querySelector(".global-menu-open-btn");
        globalMenuOpenBtnEl.addEventListener("click", showGlobalMenu);
        const backBtnEl = document.getElementById("back-btn");
        backBtnEl.addEventListener("click", moveBack);
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
headerHomeBtn.innerText = "홈";
headerHomeBtn.classList.add("header-control-btn");
headerHomeBtn.classList.add("header-home-btn");
headerHomeBtn.setAttribute("href", "./index.html")
headerHomeBtn.addEventListener("click", (e)=>{
    e.stopPropagation();
})

titleHeader.insertBefore(headerHomeBtn, titleHeader.firstChild);

const headerBackBtn = document.createElement("button");
headerBackBtn.innerText = "뒤로 가기";
headerBackBtn.classList.add("header-control-btn");
headerBackBtn.classList.add("header-back-btn");
headerBackBtn.addEventListener("click", moveBack);
titleHeader.appendChild(headerBackBtn);
