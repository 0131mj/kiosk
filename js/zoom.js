const boundRect = previewEl.getBoundingClientRect();
const photoTargetEl = document.getElementById("photo-target");

/** Preview (boundary) 사이즈 및 위치  **/
const PADDING = window.innerWidth / 100;
const boundLeftEnd = boundRect.x + PADDING;
const boundRightEnd = boundRect.x + boundRect.width - PADDING;
const boundTopEnd = boundRect.top + PADDING;
const boundBottomEnd = boundRect.top + boundRect.height - PADDING;

/** 사람모양 박스 최소,최대 사이즈 **/
const BOX_MIN_WIDTH = window.innerWidth / 10;
const BOX_MIN_HEIGHT = BOX_MIN_WIDTH * 2;
const BOX_MAX_WIDTH = BOX_MIN_WIDTH * 3;
const BOX_MAX_HEIGHT = BOX_MAX_WIDTH * 2;


/** 크기 및 위치 변화 적용 **/
const setWidth = (w) => photoTargetEl.style.width = `${w}px`;
const setHeight = (h) => photoTargetEl.style.height = `${h}px`;
const setLeft = (l) => photoTargetEl.style.left = `${l}px`;
const setTop = (t) => photoTargetEl.style.top = `${t}px`;

/**
 * 기능 1 : 위치 이동
 * *  */
let isResizing = false;
function onMoveStart(e) {
    let prevX = e.touches[0].clientX; // 마우스가 클릭된 위치값
    let prevY = e.touches[0].clientY; // 마우스가 클릭된 위치값

    function onMove(e) {

        if (!isResizing) {
            const xPos = e.touches[0].clientX;
            const yPos = e.touches[0].clientY;

            const xMoveDist = xPos - prevX; // 움직인 거리 : 현재 위치 - 이전 위치
            const yMoveDist = yPos - prevY; // 움직인 거리 : 현재 위치 - 이전 위치

            const {
                left: humanBoxLeft,
                top: humanBoxTop,
                width: humanBoxWidth,
                height: humanBoxHeight
            } = photoTargetEl.getBoundingClientRect();

            /** Left 결정 **/
            if (humanBoxWidth + humanBoxLeft + xMoveDist >= boundRightEnd) {
                setLeft(boundRightEnd - humanBoxWidth);
            } else if (humanBoxLeft + xMoveDist <= boundLeftEnd) {
                setLeft(boundLeftEnd);
            } else {
                setLeft(humanBoxLeft + xMoveDist);
            }
            if (xPos >= boundRightEnd) {
                prevX = boundRightEnd;
            } else if (xPos <= boundLeftEnd) {
                prevX = boundLeftEnd;
            } else {
                prevX = xPos;
            }

            /** Top 결정 **/
            if (humanBoxHeight + humanBoxTop + yMoveDist >= boundBottomEnd) {
                setTop(boundBottomEnd - humanBoxHeight);
            } else if (humanBoxTop + yMoveDist <= boundTopEnd) {
                setTop(boundTopEnd);
            } else {
                setTop(humanBoxTop + yMoveDist);
            }
            if (yPos >= boundBottomEnd) {
                prevY = boundBottomEnd;
            } else if (yPos <= boundTopEnd) {
                prevY = boundTopEnd;
            } else {
                prevY = yPos;
            }
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

        let prevX = e.touches[0].clientX; // 마우스가 클릭된 위치값
        let prevY = e.touches[0].clientY; // 마우스가 클릭된 위치값

        function onResizeMove(e) {

            const xPos = e.touches[0].clientX; // 마우스가 움직여서 도달한 위치값
            const yPos = e.touches[0].clientY; // 마우스가 움직여서 도달한 위치값

            const {
                width: humanBoxWidth,
                height: humanBoxHeight,
                top: humanBoxTop,
                left: humanBoxLeft
            } = photoTargetEl.getBoundingClientRect();

            if (currentResizer.classList.contains("se")) {
                /** 1. x 위치 제한 및 적용 **/
                let nextXPos = xPos;

                /** 1-1. 우측 Bound 제한 **/
                if (nextXPos >= boundRightEnd) {
                    nextXPos = boundRightEnd;
                }

                /** 1-2. 최대 너비 제한 **/
                if (nextXPos >= humanBoxLeft + BOX_MAX_WIDTH) {
                    nextXPos = humanBoxLeft + BOX_MAX_WIDTH;
                }

                /** 1-3. 최소 너비 제한 **/
                if (nextXPos <= humanBoxLeft + BOX_MIN_WIDTH) {
                    nextXPos = humanBoxLeft + BOX_MIN_WIDTH;
                }
                const xMoved = nextXPos - prevX;
                setWidth(humanBoxWidth + xMoved);
                prevX = nextXPos;


                /** 2. y 위치 제한 및 적용 **/
                let nextYPos = yPos;

                /** 2-1. 아래측 Bound 제한 **/
                if (nextYPos >= boundBottomEnd) {
                    nextYPos = boundBottomEnd;
                }

                /** 2-2. 최대 높이 제한 **/
                if (nextYPos >= humanBoxTop + BOX_MAX_HEIGHT) {
                    nextYPos = humanBoxTop + BOX_MAX_HEIGHT;
                }

                /** 2-3. 최소 높이 제한 **/
                if (nextYPos <= humanBoxTop + BOX_MIN_HEIGHT) {
                    nextYPos = humanBoxTop + BOX_MIN_HEIGHT;
                }

                const yMoved = nextYPos - prevY;
                setHeight(humanBoxHeight + yMoved)
                prevY = nextYPos;

            } else if (currentResizer.classList.contains("sw")) {

            } else if (currentResizer.classList.contains("ne")) {

            } else {

            }

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