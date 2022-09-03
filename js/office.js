const setOffice = () => {
    const data = [
        {
            name: "경남본부 직할",
            address: " (51439) 경남 창원시 성산구 중앙대로210번길 13",
            coordinate: {
                x: 61,
                y: 47,
                w: 5,
                h: 8.5,
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
        {
            name: "거제지사",
            address: "(53252) 경남 거제시 서문로3길 21",
            coordinate: {
                x: 52,
                y: 76,
                w: 10,
                h: 14,
            }
        },
        {
            name: "밀양지사",
            address: "(50444) 경남 밀양시 가곡7길 30",
            coordinate: {
                x: 65,
                y: 29,
                w: 11,
                h: 10,
            }
        },
        {
            name: "사천지사",
            address: "(52566) 경남 사천시 동금6길 28",
            coordinate: {
                x: 17,
                y: 64,
                w: 9,
                h: 8
            }
        },
        {
            name: "통영지사",
            address: "(53019) 경남 통영시 광도면 죽림2로 25-40",
            coordinate: {
                x: 43,
                y: 78,
                w: 5,
                h: 9,
            }
        },
        {
            name: "거창지사",
            address: "(50146) 경남 거창군 거창읍 강남로 246",
            coordinate: {
                x: 16,
                y: 4,
                w: 8,
                h: 11
            }
        },
        {
            name: "함안지사",
            address: "(52044) 경남 함안군 가야읍 함마대로 1490",
            coordinate: {
                x: 43,
                y: 48,
                w: 10,
                h: 5,
            }
        },
        {
            name: "창녕지사",
            address: "(50332) 경남 창녕군 창녕읍 남창녕로 71",
            coordinate: {
                x: 50,
                y: 25,
                w: 7,
                h: 11,
            }
        },
        {
            name: "합천지사",
            address: "(50232) 경남 합천군 합천읍 대야로 921",
            coordinate: {
                x: 25,
                y: 23,
                w: 9,
                h: 9,
            }
        },
        {
            name: "진해지사",
            address: "(51689) 경남 창원시 진해구 여좌천로 122",
            coordinate: {
                x: 61,
                y: 62,
                w: 8,
                h: 5,
            }
        },
        {
            name: "하동지사",
            address: "(52331) 경남 하동군 하동읍 경서대로 83",
            coordinate: {
                x: 4,
                y: 52,
                w: 8,
                h: 12,
            }
        },
        {
            name: "고성지사",
            address: "(52944) 경남 고성군 고성읍 성내로 162",
            coordinate: {
                x: 33,
                y: 66,
                w: 9,
                h: 7,
            }
        },
        {
            name: "산청지사",
            address: "(52223) 경남 산청군 산청읍 웅석봉로 45",
            coordinate: {
                x: 9,
                y: 38,
                w: 11,
                h: 6.8,
            }
        },
        {
            name: "남해지사",
            address: "(52412) 경남 남해군 남해읍 남해대로 2962",
            coordinate: {
                x: 11,
                y: 78,
                w: 10,
                h: 10,
            }
        },
        {
            name: "함양지사",
            address: "(50031) 경남 함양군 함양읍 함양로 1207",
            coordinate: {
                x: 4,
                y: 11,
                w: 7,
                h: 15,
            }
        },
        {
            name: "의령지사",
            address: "(52139) 경남 의령군 의령읍 의병로 181",
            coordinate: {
                x: 36,
                y: 39,
                w: 8,
                h: 5,
            },
        }
    ]
    const officeMap = document.getElementById("office-map");
    const nameEl = document.getElementById("office-name");
    const nameEl2 = document.getElementById("office-name-2");
    const addressEl = document.getElementById("office-address");
    const orgEl = document.getElementById("office-org");
    const officeImg = document.getElementById("office-img");
    const mapBtn = document.getElementById("map-btn");
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
        officeImg.setAttribute("src", `./img/office/${idx}.gif`);
        officeImg.setAttribute("alt", name);
        mapBtn.setAttribute("data-code", idx);
        telBtn.setAttribute("data-code", idx);
    }
    const officeBtn = document.querySelectorAll(".office-btn");
    officeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectOffice(btn.dataset.code);
        })
    });

    const openPopup = (e) => {
        const code = e.currentTarget.dataset.code;
        const type = e.currentTarget.id.replace("-btn","");
        const prefix = type === "tel" ? "업무별 전화번호" : "찾아오시는 길";
        popupImg.setAttribute("src", `./img/office_${type}/${code}.png`);
        popupImg.setAttribute("data-type", type);
        modalTitle.innerText = `${prefix} - ${data[Number(code)].name} `
        popup.classList.remove("hide");
    }

    const closePopup = () => {
        popup.classList.add("hide");
    }

    mapBtn.addEventListener("click", openPopup)

    telBtn.addEventListener("click", openPopup)

    closeModalBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closePopup();
    })

    modal.addEventListener("click", (e) => {
        e.stopPropagation();
    })
    popup.addEventListener("click", (e) => {
        e.stopPropagation();
        closePopup();
    })

    selectOffice(0);
}

setOffice();
