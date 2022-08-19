const companyNav = document.getElementById("company-nav");
const companyMenu = {
    vision: "비전",
    office: "사업소 소개",
    history: "연혁",
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
    return acc + `<a href="./quarter.html?menu=${key}" class="menu${key === curMenu ? ' on' : ''}">${text}</a>`;
}, "")}
    </div>    
</div>
`;

document.querySelectorAll('a').forEach(a => {
    a.addEventListener("click", (e) => {
        e.stopPropagation()
    })
})

const setOffice = () => {
    const data = [
        {
            name: "경남본부 직할",
            address: " (51439) 경남 창원시 성산구 중앙대로210번길 13",
            coordinate: {
                x: 62,
                y: 45,
                w: 5,
                h: 7
            }
        },
        {
            name: "진주지사",
            address: "(52782) 경남 진주시 동진로 279",
            coordinate: {
                x: 40,
                y: 53,
                w: 10,
                h: 5
            }
        },
        {
            name: "마산지사",
            address: "(51350) 경남 창원시 마산회원구3.15대로 966",
            coordinate: {
                x: 54,
                y: 58,
                w: 7,
                h: 5
            }
        },
    ]
    const officeMap = document.getElementById("office-map");
    const nameEl = document.getElementById("office-name");
    const addressEl = document.getElementById("office-address");
    const orgEl = document.getElementById("office-org");

    officeMap.addEventListener("click", (e)=>{
        e.stopPropagation();
    })

    /** 버튼 그룹 생성 **/
    officeMap.innerHTML = data.reduce((acc, cur, idx) => {
        const {x, y, w, h} = cur.coordinate;
        const style = `left: ${x}%; top:${y}%; width:${w}vw; height: ${h}vw`
        acc += `<button class="office-btn" data-code="${idx}" style="${style}">${cur.name}</button>`;
        return acc;
    }, "")
    const selectOffice = (idx) => {
        const {name, address} = data[Number(idx)];
        nameEl.innerText = name;
        addressEl.innerText = address;
        officeMap.style.backgroundImage = `url("./img/hq_map/${idx}.gif")`;
        orgEl.setAttribute("src", `./img/hq_org/${idx}.jpg`)
    }
    const officeBtn = document.querySelectorAll(".office-btn");
    officeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectOffice(btn.dataset.code);
        })
    })

    selectOffice(0);
}

const showHistory = () => {
    const history = [
        ["1910.6.9", "한일와사㈜ 마산지점", ""],
        ["1947.10.1", "남선전기㈜ 마산지점", "01"],
        ["1961.7.1", "한국전력㈜ 경남지점 마산영업소", "02"],
        ["1982.1.1", "한국전력공사 경남지사","03"],
        ["1988.11.2", "한국전력공사 창원전력관리처 분리발족", "04"],
        ["1988.11.2", "한국전력공사 경남사업본부", "05"],
        ["2009.1.12", "판매 및 송변전 통합 경남지역본부", "06"],
        ["2018.12.27~", "한국전력공사 경남본부"],
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
    fetch(`./content_quarter/${curMenu}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('company-content').innerHTML = text)
        .then((l) => {
            if (curMenu === "office") {
                setOffice();
            } else if (curMenu === "history") {
                showHistory();
            }
        })
    ;
}

loadHTML();
