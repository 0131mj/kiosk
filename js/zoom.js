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
    photoTargetEl.style.width = `${w}px`
};
const setHeight = (h) => {
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

            const xMoveDist = xPos - prevX; // 움직인 거리 : 현재 위치 - 이전 위치
            const yMoveDist = yPos - prevY; // 움직인 거리 : 현재 위치 - 이전 위치

            const {
                left: humanBoxLeft,
                top: humanBoxTop,
                width: humanBoxWidth,
                height: humanBoxHeight
            } = photoTargetEl.getBoundingClientRect();

            const x = humanBoxLeft + xMoveDist;
            const y = humanBoxTop + yMoveDist;

            const MIN_X = 190;  // 임시값,
            const MAX_X = 1750; // 임시값, 동적이어야 함. 현재 너비 추가

            const MIN_Y = 910;  // 임시값,
            const MAX_Y = 1660; // 임시값, 동적이어야 함. 현재 높이 추가

            setLeft(getRangeValue(x, MIN_X, MAX_X));
            setTop(getRangeValue(y, MIN_Y, MAX_Y));

            prevX = getRangeValue(xPos, MIN_X, MAX_X);
            prevY = getRangeValue(yPos, MIN_Y, MAX_Y);
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
        console.log("리사이즈 중")
        currentResizer = e.target;
        isResizing = true;

        let prevX = e.touches[0].clientX; // 마우스가 클릭된 위치값
        let prevY = e.touches[0].clientY; // 마우스가 클릭된 위치값

        function onResizeMove(e) {

            const xPos = e.touches[0].clientX; // 마우스가 움직여서 도달한 위치값
            const yPos = e.touches[0].clientY; // 마우스가 움직여서 도달한 위치값

            const xMoveDist = xPos - prevX; // 움직인 거리 : 현재 위치 - 이전 위치
            const yMoveDist = yPos - prevY; // 움직인 거리 : 현재 위치 - 이전 위치

            const {width: humanBoxWidth, height: humanBoxHeight, top: humanBoxTop, left: humanBoxLeft} = photoTargetEl.getBoundingClientRect();

            /**
             * 1. resizer 가 바운더리를 벗어나지 않도록 처리
             * 2. 일정길이 이하 / 이상으로 변형되지 않도록 처리
             *  현재 위치값과 박스의 고정 최소/최대 크기를 고려하여 리사이저가 취할 수 있는 좌표값을 정한다.
             *  max 값에 도달하지 않았어도 마우스가 바운더리를 벗어나려 하면 더이상 늘어날 수 없다.
             *
             *  **/

            /** 리사이저가 움직일 수 있는 범위값 (위치 기준) **/
            const MIN_X = 190;  // 임시값,
            const MAX_X = 1750; // 임시값, 동적이어야 함. 현재 너비 추가
            const MIN_Y = 910;  // 임시값,
            const MAX_Y = 1660; // 임시값, 동적이어야 함. 현재 높이 추가

            /** 리사이저가 움직일 수 있는 범위값 (사이즈 기준) **/
            const MIN_WIDTH = 200;
            const MAX_WIDTH = 600; // 임시값, 현재 x 포지션과 width 너비에 따라 동적이어야 함.
            const MIN_HEIGHT = 200;
            const MAX_HEIGHT = 600;

            // 결과적으로 리사이저가 움직일 수 있는 범위를 벗어나지 못하도록만 하면 됨


            if (currentResizer.classList.contains("se")) {

                // setWidth(humanBoxWidth + xMoveDist);
                // setHeight(humanBoxHeight + yMoveDist);
                /*** 사이즈만 변경되는 케이스 */
                setWidth(getRangeValue(humanBoxWidth + xMoveDist, MIN_WIDTH, MAX_WIDTH));
                setHeight(getRangeValue(humanBoxHeight + yMoveDist, MIN_HEIGHT, MAX_HEIGHT));

            } else if (currentResizer.classList.contains("sw")) {
                setWidth(humanBoxWidth - xMoveDist);
                setHeight(humanBoxHeight + yMoveDist);
                setLeft(humanBoxLeft + xMoveDist); //ok
            } else if (currentResizer.classList.contains("ne")) {
                setWidth(humanBoxWidth + xMoveDist);
                setHeight(humanBoxHeight - yMoveDist);
                setTop(humanBoxTop + yMoveDist);
            } else {
                setWidth(humanBoxWidth - xMoveDist)
                setHeight(humanBoxHeight - yMoveDist)
                setTop(humanBoxTop + yMoveDist)
                setLeft(humanBoxLeft + xMoveDist);
            }


            prevX = xPos;
            prevY = yPos;

            // prevX = getRangeValue(xPos, MIN_X, MAX_X);
            // prevY = getRangeValue(yPos, MIN_Y, MAX_Y);
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