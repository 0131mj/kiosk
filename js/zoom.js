const el = document.getElementById("photo-target");

let isResizing = false;

const pRect = preview.getBoundingClientRect();

const PADDING = 20;

el.addEventListener("touchstart", mousedown);

/** 리사이즈시, 크기 변화적용 **/
const MIN_WIDTH = 200;
const MAX_WIDTH = 1000;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 1000;
const setWidth = (w) => {
    if (w <= MIN_WIDTH || w >= MAX_WIDTH) {
        return;
    }
    el.style.width = `${w}px`
};
const setHeight = (h) => {
    if (h <= MIN_HEIGHT || h >= MAX_HEIGHT) {
        return;
    }
    el.style.height = `${h}px`
};
const setLeft = (_l) => el.style.left = `${_l}px`;
const setTop = (_t) => el.style.top = `${_t}px`;

function mousedown(e) {
    window.addEventListener("touchmove", mousemove);
    window.addEventListener("touchend", mouseup);

    let prevX = e.touches[0].clientX;
    let prevY = e.touches[0].clientY;

    function mousemove(e) {
        if (!isResizing) {
            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;
            let newX = prevX - xPos;
            let newY = prevY - yPos;

            const rect = el.getBoundingClientRect();

            const x = rect.left - newX;
            const y = rect.top - newY;

            const isLeftEdge = pRect.x + PADDING >= x;
            const isTopEdge = pRect.y + PADDING >= y;
            const isRightEdge = pRect.x + pRect.width - PADDING <= x + rect.width;
            const isBottomEdge = pRect.y + pRect.height - PADDING <= y + rect.height;

            if (isLeftEdge || isTopEdge || isRightEdge || isBottomEdge) {
                return
            }
            el.style.left = x + "px";
            el.style.top = y + "px";
            prevX = xPos;
            prevY = yPos;
        }
    }

    function mouseup() {
        window.removeEventListener("touchmove", mousemove);
        window.removeEventListener("touchend", mouseup);
    }
}

const resizers = document.querySelectorAll(".resizer");
let currentResizer;


for (let resizer of resizers) {
    resizer.addEventListener("touchstart", mousedown);

    function mousedown(e) {
        currentResizer = e.target;
        isResizing = true;

        let prevX = e.touches[0].clientX;
        let prevY = e.touches[0].clientY;

        window.addEventListener("touchmove", mousemove);
        window.addEventListener("touchend", mouseup);

        function mousemove(e) {

            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;

            /** 1. resizer 가 바운더리를 벗어나지 않도록 처리 **/
            const isLeftEdge = xPos <= pRect.x + PADDING;
            const isRightEdge = xPos >= pRect.x + pRect.width - PADDING;
            const isTopEdge = yPos <= pRect.y + PADDING;
            const isBottomEdge = yPos >= pRect.y + pRect.height - PADDING;
            if (isLeftEdge || isRightEdge || isTopEdge || isBottomEdge) {
                return;
            }

            const xGap = prevX - xPos;
            const yGap = prevY - yPos;

            const {width: w, height: h, top: t, left: l} = el.getBoundingClientRect();


            /** 2. 일정길이 이하 / 이상으로 변형되지 않도록 처리 **/

            if (currentResizer.classList.contains("se")) {
                setWidth(w - xGap);
                setHeight(h - yGap);
            } else if (currentResizer.classList.contains("sw")) {
                setWidth(w + xGap);
                setHeight(h - yGap);
                setLeft(l - xGap);
            } else if (currentResizer.classList.contains("ne")) {
                setWidth(w - xGap);
                setHeight(h + yGap);
                setTop(t - yGap);
            } else {
                setWidth(w + xGap)
                setHeight(h + yGap)
                setTop(t - yGap)
                setLeft(l - xGap);
            }

            prevX = xPos;
            prevY = yPos;
        }

        function mouseup() {
            window.removeEventListener("touchmove", mousemove);
            window.removeEventListener("touchend", mouseup);
            isResizing = false;
        }
    }
}