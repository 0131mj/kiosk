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
        nameEl2.innerText = name;
        addressEl.innerText = address;
        officeMap.style.backgroundImage = `url("./img/hq_map/_${idx}.png")`;
        orgEl.style.backgroundImage = `url(./img/hq_org/${idx}.jpg)`;
        officeImg.setAttribute("src",`./img/office/${idx}.png`)
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

setOffice();
