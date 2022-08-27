const setOffice = () => {
    const data = [
        {
            name: "경남본부 직할",
            address: " (51439) 경남 창원시 성산구 중앙대로210번길 13",
            coordinate: {
                x: 61,
                y: 45,
                w: 5,
                h: 9
            }
        },
        {
            name: "진주지사",
            address: "(52782) 경남 진주시 동진로 279",
            coordinate: {
                x: 20,
                y: 50,
                w: 14,
                h: 8
            }
        },
        {
            name: "마산지사",
            address: "(51350) 경남 창원시 마산회원구3.15대로 966",
            coordinate: {
                x: 49,
                y: 58,
                w: 7,
                h: 5
            }
        },
    ]
    const officeMap = document.getElementById("office-map");
    const nameEl = document.getElementById("office-name");
    const nameEl2 = document.getElementById("office-name-2");
    const addressEl = document.getElementById("office-address");
    const orgEl = document.getElementById("office-org");
    const officeImg = document.getElementById("office-img");
    const locationBtn = document.getElementById("location-btn");
    const telBtn = document.getElementById("tel-btn");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalTitle = document.getElementById("modal-title");
    const modal = document.querySelector("#popup > .modal");

    officeMap.addEventListener("click", (e) => {
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
        nameEl2.innerText = name;
        addressEl.innerText = address;
        officeMap.style.backgroundImage = `url("./img/hq_map/${idx}.png")`;
        orgEl.style.backgroundImage = `url(./img/hq_org/${idx}.jpg)`;
        officeImg.setAttribute("src", `./img/office/${idx}.png`);
        locationBtn.setAttribute("data-code", idx);
        telBtn.setAttribute("data-code", idx);
    }
    const officeBtn = document.querySelectorAll(".office-btn");
    officeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectOffice(btn.dataset.code);
        })
    });

    const openPopup = () =>{
        popup.classList.remove("hide");
    }

    const closePopup = () => {
        popup.classList.add("hide");
    }

    locationBtn.addEventListener("click",(e)=>{
        const code = e.currentTarget.dataset.code;
        popupImg.setAttribute("src", `./img/hq_location/${code}.png`);
        modalTitle.innerText = `찾아오시는 길 - ${data[Number(code)].name} `
        openPopup();
    })

    telBtn.addEventListener("click",(e)=>{
        const code = e.currentTarget.dataset.code;
        popupImg.setAttribute("src", `./img/hq_tel/${code}.png`);
        modalTitle.innerText = `업무별 전화번호 - ${data[Number(code)].name} `
        openPopup();
    })

    closeModalBtn.addEventListener("click",(e)=>{
        e.stopPropagation();
        closePopup();
    })

    modal.addEventListener("click",(e)=>{
        e.stopPropagation();
    })
    popup.addEventListener("click",(e)=>{
        e.stopPropagation();
        closePopup();
    })

    selectOffice(0);
}

setOffice();
