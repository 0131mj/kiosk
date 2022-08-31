const el = document.getElementById("photo-target");

let isResizing = false;

const pRect = preview.getBoundingClientRect();

const BOUND_PADDING = 3;

el.addEventListener("touchstart", mousedown);

function mousedown(e) {
    window.addEventListener("touchmove", mousemove);
    window.addEventListener("touchend", mouseup);

    let prevX = e.touches[0].clientX;
    let prevY = e.touches[0].clientY;

    function mousemove(e) {
        if (!isResizing) {
            let newX = prevX - e.touches[0].clientX;
            let newY = prevY - e.touches[0].clientY;

            const rect = el.getBoundingClientRect();

            const x = rect.left - newX;
            const y = rect.top - newY;

            const isLeftEdge = pRect.x + BOUND_PADDING >= x;
            const isTopEdge = pRect.y + BOUND_PADDING >= y;
            const isRightEdge = pRect.x + pRect.width - BOUND_PADDING <= x + rect.width;
            const isBottomEdge = pRect.y + pRect.height - BOUND_PADDING <= y + rect.height;

            if (isLeftEdge || isTopEdge || isRightEdge || isBottomEdge) {
                return
            }
            el.style.left = x + "px";
            el.style.top = y + "px";
            prevX = e.touches[0].clientX;
            prevY = e.touches[0].clientY;


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
            const rect = el.getBoundingClientRect();

            if (currentResizer.classList.contains("se")) {
                el.style.width = rect.width - (prevX - e.touches[0].clientX) + "px";
                el.style.height = rect.height - (prevY - e.touches[0].clientY) + "px";
            } else if (currentResizer.classList.contains("sw")) {
                el.style.width = rect.width + (prevX - e.touches[0].clientX) + "px";
                el.style.height = rect.height - (prevY - e.touches[0].clientY) + "px";
                el.style.left = rect.left - (prevX - e.touches[0].clientX) + "px";
            } else if (currentResizer.classList.contains("ne")) {
                el.style.width = rect.width - (prevX - e.touches[0].clientX) + "px";
                el.style.height = rect.height + (prevY - e.touches[0].clientY) + "px";
                el.style.top = rect.top - (prevY - e.touches[0].clientY) + "px";
            } else {
                el.style.width = rect.width + (prevX - e.touches[0].clientX) + "px";
                el.style.height = rect.height + (prevY - e.touches[0].clientY) + "px";
                el.style.top = rect.top - (prevY - e.touches[0].clientY) + "px";
                el.style.left = rect.left - (prevX - e.touches[0].clientX) + "px";
            }

            prevX = e.touches[0].clientX;
            prevY = e.touches[0].clientY;
        }

        function mouseup() {
            window.removeEventListener("touchmove", mousemove);
            window.removeEventListener("touchend", mouseup);
            isResizing = false;
        }
    }
}