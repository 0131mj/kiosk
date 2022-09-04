const PADDING = 20;

let isResizing = false;

const boundRect = previewEl.getBoundingClientRect();
const photoTargetEl = document.getElementById("photo-target");

/** 크기 및 위치 변화 적용 **/

const setWidth = (w) => photoTargetEl.style.width = `${w}px`;
const setHeight = (h) => photoTargetEl.style.height = `${h}px`;
const setLeft = (l) => photoTargetEl.style.left = `${l}px`;
const setTop = (t) => photoTargetEl.style.top = `${t}px`;

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


/** 기본 변하지 않는 상수값 - 바운더리 좌표값 **/
const boundLeftEnd = boundRect.x + PADDING;
const boundRightEnd = boundRect.x + boundRect.width - PADDING;
const boundTopEnd = boundRect.top + PADDING;
const boundBottomEnd = boundRect.top + boundRect.height - PADDING;

/** 기본 변하지 않는 상수값 - 바운더리 좌표값
 * 1. 바운더리 크기 와 위치
 * 2. 박스 최대/최소 크기
 * **/

const BOX_MIN_WIDTH = 200;
const BOX_MAX_WIDTH = 600;
const BOX_MIN_HEIGHT = 200;
const BOX_MAX_HEIGHT = 600;

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

            const {
                width: humanBoxWidth,
                height: humanBoxHeight,
                top: humanBoxTop,
                left: humanBoxLeft
            } = photoTargetEl.getBoundingClientRect();


            /**
             * 1. resizer 가 바운더리를 벗어나지 않도록 처리
             * 2. 일정길이 이하 / 이상으로 변형되지 않도록 처리
             *  현재 위치값과 박스의 고정 최소/최대 크기를 고려하여 리사이저가 취할 수 있는 좌표값을 정한다.
             *  max 값에 도달하지 않았어도 마우스가 바운더리를 벗어나려 하면 더이상 늘어날 수 없다.
             *
             *  **/


            /** 현재 포지션과 크기에 따라 변하는 값
             * maxRangeWidth, minRangeWidth, minX, minY,
             * **/

            /** 리사이저가 움직일 수 있는 범위값 (위치 기준) **/


            // 결과적으로 리사이저가 움직일 수 있는 범위를 벗어나지 못하도록만 하면 됨


            if (currentResizer.classList.contains("se")) {

                // setWidth(humanBoxWidth + xMoveDist);
                // setHeight(humanBoxHeight + yMoveDist);
                /*** 사이즈만 변경되는 케이스
                 * 즉, 사이즈만 업데이트 해줄 수 있을 뿐
                 *
                 *
                 *
                 * 로직 :  마우스 커서의 움직임을 제한해야한다.
                 * 마우스커서의 리미트를 파악하고,거기에 맞도록 MAX_WIDTH 와 MAX_HEIGHT 를 결정.
                 * 마우스커서의 리미트를 확인하는 방식은 제한이 어떻게 걸려있는지를 판단하는데, 두가지케이스가 아니면
                 * 1) 일정크기 미만으로 줄어들 때 / 일정크기 이상으로 커질 때
                 * 2) 마우스커서가 상 / 하 / 좌 / 우 바깥을 벗서나려 할때
                 *
                 * 마우스가 바운드를 넘어갔을 때 문제 처리, 즉 MAX_X 값은 크기제한과 바운더리 맥스가 경합하여 한가지 값만 취한다.
                 * 결과갑의 마우스값도 보존
                 * */

                /** 제한 처리: 제한에 걸리면 커서는 제한된 위치에 그대로 머무르게 하기  **/

                /*** x 처리 ***/

                /* (1) 우측 제한 (2번 거름) **/
                let nextXPos = xPos;
                // 1) 바운드 제한
                if (nextXPos >= boundRightEnd) {
                    nextXPos = boundRightEnd;
                }
                // 2) 크기 제한
                if (nextXPos >= humanBoxLeft + BOX_MAX_WIDTH) {
                    nextXPos = humanBoxLeft + BOX_MAX_WIDTH;
                }

                /* (2) 좌측 제한 **/
                // 크기 제한 (바운드 제한은 크기에서 이미 걸러지므로 생략)
                if (nextXPos <= humanBoxLeft + BOX_MIN_WIDTH) {
                    nextXPos = humanBoxLeft + BOX_MIN_WIDTH;
                }
                const xMoved = nextXPos - prevX;
                setWidth(humanBoxWidth + xMoved);
                prevX = nextXPos;


                /*** y 처리 ***/

                let nextYPos = yPos;

                // (1) 바텀 제한 :
                // 1) 바운드 제한
                if (nextYPos >= boundBottomEnd) {
                    console.log('아래로 삐져나감')
                    nextYPos = boundBottomEnd;
                }

                // 2) 크기 Max 제한
                if (nextYPos >= humanBoxTop + BOX_MAX_HEIGHT) {
                    console.log('더 못 커짐')
                    nextYPos = humanBoxTop + BOX_MAX_HEIGHT;
                }


                // 크기 Min 제한
                if (nextYPos <= humanBoxTop + BOX_MIN_HEIGHT) {
                    console.log('더 못 작아짐')
                    nextYPos = humanBoxTop + BOX_MIN_HEIGHT;
                }

                const yMoved = nextYPos - prevY;
                setHeight(humanBoxHeight + yMoved)

                prevY = nextYPos; // 최대, 최소 적용

            } else if (currentResizer.classList.contains("sw")) {
                // setWidth(getRangeValue(humanBoxWidth - xMoveDist, MIN_WIDTH, MAX_WIDTH));
                // setHeight(getRangeValue(humanBoxHeight + yMoveDist, MIN_HEIGHT, MAX_HEIGHT));
                // setLeft(getRangeValue(humanBoxLeft + xMoveDist, MIN_X, MAX_X)); //ok
                // prevX = xPos; // 최대, 최소 적용
                // prevY = yPos; // 최대, 최소 적용
            } else if (currentResizer.classList.contains("ne")) {
                // setWidth(getRangeValue(humanBoxWidth + xMoveDist, MIN_WIDTH, MAX_WIDTH));
                // setHeight(getRangeValue(humanBoxHeight - yMoveDist, MIN_HEIGHT, MAX_HEIGHT));
                // setTop(getRangeValue(humanBoxTop + yMoveDist, MIN_Y, MAX_Y));
                // prevX = xPos; // 최대, 최소 적용
                // prevY = yPos; // 최대, 최소 적용
            } else {
                // setWidth(getRangeValue(humanBoxWidth - xMoveDist, MIN_WIDTH, MAX_WIDTH))
                // setHeight(getRangeValue(humanBoxHeight - yMoveDist, MIN_HEIGHT, MAX_HEIGHT))
                // setTop(getRangeValue(humanBoxTop + yMoveDist, MIN_Y, MAX_Y))
                // setLeft(getRangeValue(humanBoxLeft + xMoveDist, MIN_X, MAX_X));
                // prevX = xPos; // 최대, 최소 적용
                // prevY = yPos; // 최대, 최소 적용
            }


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