const companyNav = document.getElementById("company-nav");
const companyMenu = {
    high: "고효율 기기 구매비용 지원",
    efficiency: "에너지 효율화",
    power: "파워체크",
    cash: "에너지 캐쉬백 지원",
}

/** 현재 메뉴 결정 **/
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const {menu} = params || {};
const curMenu = menu || Object.keys(companyMenu)[0];


/** 현재 메뉴 표시 **/
companyNav.outerHTML = `
<div class="content-nav">
    <div class="flex-row menus">   
        ${Object.entries(companyMenu).reduce((acc, [key, text]) => {
    return acc + `<a href="./support.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
}, "")}
    </div>    
</div>
`;

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e)=>{
        e.stopPropagation()
    })
})

document.getElementById('company-content').innerHTML = `<img src="./img/support_img/${curMenu}.jpg" style="height: 80vh; max-width: 100%" />`
