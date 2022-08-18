const companyNav = document.getElementById("company-nav");
const companyMenu = {
    vision: "비전",
    office: "사업소 소개",
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
            tel: "000-0000",
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
            tel: "111-111",
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
            tel: "222-2222",
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
    const telEl = document.getElementById("office-tel");
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
        const {name, address, tel} = data[Number(idx)];
        nameEl.innerText = name;
        telEl.innerText = tel;
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

function loadHTML() {
    fetch(`./content_quarter/${curMenu}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('company-content').innerHTML = text)
        .then((l) => {
            if (curMenu === "office") {
                setOffice();
            }
        })
    ;
}

loadHTML();
