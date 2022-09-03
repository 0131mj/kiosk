const PADDING = 20;
const MIN_WIDTH = 200;
const MAX_WIDTH = 1000;
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 1000;

let isResizing = false;

const boundaryRect = previewEl.getBoundingClientRect();
const photoTargetEl = document.getElementById("photo-target");

/** 크기 및 위치 변화 적용 **/

const setWidth = (w) => {
    if (w <= MIN_WIDTH || w >= MAX_WIDTH) {
        return;
    }
    photoTargetEl.style.width = `${w}px`
};
const setHeight = (h) => {
    if (h <= MIN_HEIGHT || h >= MAX_HEIGHT) {
        return;
    }
    photoTargetEl.style.height = `${h}px`
};
const setLeft = (_l) => photoTargetEl.style.left = `${_l}px`;
const setTop = (_t) => photoTargetEl.style.top = `${_t}px`;

const getRangeValue = (val, min, max) => {
    if (val <= min) {
        return min;
    } else if (val >= max) {
        return max;
    } else {
        return val;
    }
}

/**
 * 기능 1 : 위치 이동
 * *  */
function onMoveStart(e) {
    let prevX = e.touches[0].clientX; // 마우스가 클릭된 위치값
    let prevY = e.touches[0].clientY; // 마우스가 클릭된 위치값

    function onMove(e) {
        if (!isResizing) {
            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;

            let xMoveDist = xPos - prevX; // 움직인 거리 : 현재 위치 - 이전 위치
            let yMoveDist = yPos - prevY; // 움직인 거리 : 현재 위치 - 이전 위치

            const {left: humanBoxLeft, top: humanBoxTop} = photoTargetEl.getBoundingClientRect();

            const x = humanBoxLeft + xMoveDist;
            const y = humanBoxTop + yMoveDist;

            const MIN_X = 200;  // 임시값,
            const MAX_X = 1750; // 임시값, 동적이어야 함. 현재 너비 추가

            const MIN_Y = 900;  // 임시값,
            const MAX_Y = 1600; // 임시값, 동적이어야 함. 현재 높이 추가

            setLeft(getRangeValue(x, MIN_X, MAX_X));
            setTop(getRangeValue(y, MIN_Y, MAX_Y));

            prevX = getRangeValue(xPos, MIN_X, MAX_X)
            prevY = getRangeValue(yPos, MIN_Y, MAX_Y)
        }
    }

    function onMoveEnd() {
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onMoveEnd);
    }

    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onMoveEnd);
}

photoTargetEl.addEventListener("touchstart", onMoveStart);


/**
 * 기능 2 : Resize
 * *  */
const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
    function onResizeStart(e) {
        currentResizer = e.target;
        isResizing = true;

        let prevX = e.touches[0].clientX;
        let prevY = e.touches[0].clientY;

        function onResizeMove(e) {

            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;

            /** 1. resizer 가 바운더리를 벗어나지 않도록 처리 **/
            const isLeftEdge = xPos <= boundaryRect.x + PADDING;
            const isRightEdge = xPos >= boundaryRect.x + boundaryRect.width - PADDING;
            const isTopEdge = yPos <= boundaryRect.y + PADDING;
            const isBottomEdge = yPos >= boundaryRect.y + boundaryRect.height - PADDING;
            if (isLeftEdge || isRightEdge || isTopEdge || isBottomEdge) {
                return;
            }

            const xGap = prevX - xPos;
            const yGap = prevY - yPos;

            const {width: w, height: h, top: t, left: l} = photoTargetEl.getBoundingClientRect();


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

        function onResizeStop() {
            window.removeEventListener("touchmove", onResizeMove);
            window.removeEventListener("touchend", onResizeStop);
            isResizing = false;
        }

        window.addEventListener("touchmove", onResizeMove);
        window.addEventListener("touchend", onResizeStop);
    }

    resizer.addEventListener("touchstart", onResizeStart);
}