const controlMenus = `
<div class="control-menus">
    <a class="control-menu" href="./index.html">HOME</a>
    <button class="control-menu" id="back-btn">뒤로 가기</button>
    <button class="control-menu global-menu-open-btn">메뉴</button>
</div>
`;

const showGlobalMenu = () => {
    const globalMenuEl = document.querySelector(".global-menu-bg");
    globalMenuEl.classList.remove("hide");
};

const hideGlobalMenu = () => {
    const globalMenuEl = document.querySelector(".global-menu-bg");
    globalMenuEl.classList.add("hide");
};


const renderControlMenu = () => {
    const controlMenusEl = document.getElementById("control-menus");
    if (controlMenusEl) {
        controlMenusEl.outerHTML = controlMenus;
        const globalMenuOpenBtnEl = document.querySelector(".global-menu-open-btn");
        globalMenuOpenBtnEl.addEventListener("click", showGlobalMenu);
        const backBtnEl = document.getElementById("back-btn");
        backBtnEl.addEventListener("click", () => {
            window.history.back()
        })
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
        <header class="global-menu-header">
            전체 메뉴
        </header>
        <div class="global-menus">
            ${Object.entries(globalMenuObj).reduce((rows, [link, text]) => {
    const linkUrl = link === "photo" ? `./${link}.html` : "";
    rows += `<a href="${linkUrl}" class="global-menu">${text}</a>`
    return rows;
}, "")}
        </div>    
        <footer class="global-menu-close-btn">닫기</footer>    
    </div>
</div>
`
const renderGlobalMenu = () => {
    const globalMenusEl = document.getElementById("global-menu-panel");
    if (globalMenusEl) {
        globalMenusEl.outerHTML = globalMenus;
        const globalMenuCloseBtn = document.querySelector(".global-menu-close-btn");
        globalMenuCloseBtn.addEventListener("click", hideGlobalMenu);
    }
}

window.addEventListener("DOMContentLoaded", renderGlobalMenu);