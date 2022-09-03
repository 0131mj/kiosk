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

/**
 * 기능 1 : 위치 이동
 * *  */
function onMoveStart(e) {
    let prevX = e.touches[0].clientX;
    let prevY = e.touches[0].clientY;

    function onMove(e) {
        if (!isResizing) {
            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;
            let newX = prevX - xPos;
            let newY = prevY - yPos;

            const rect = photoTargetEl.getBoundingClientRect();

            const x = rect.left - newX;
            const y = rect.top - newY;

            const isLeftEdge = boundaryRect.x + PADDING >= x;
            const isTopEdge = boundaryRect.y + PADDING >= y;
            const isRightEdge = boundaryRect.x + boundaryRect.width - PADDING <= x + rect.width;
            const isBottomEdge = boundaryRect.y + boundaryRect.height - PADDING <= y + rect.height;

            if (isLeftEdge || isTopEdge || isRightEdge || isBottomEdge) {
                return
            }
            photoTargetEl.style.left = x + "px";
            photoTargetEl.style.top = y + "px";
            prevX = xPos;
            prevY = yPos;
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