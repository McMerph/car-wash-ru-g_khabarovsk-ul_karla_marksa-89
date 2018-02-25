(() => {
    const CAN_TOUCH_CLASS_NAME = "can-touch";
    const DELAY_IN_MS = 500;

    let currentInputTypeIsTouch = false;
    let touchStateTimerId: number;
    let touchClassAttached = false;

    function addTouchClass() {
        clearTimeout(touchStateTimerId);
        currentInputTypeIsTouch = true;
        if (!touchClassAttached) { // add "can-touch' class if it's not already present
            document.documentElement.classList.add(CAN_TOUCH_CLASS_NAME);
            touchClassAttached = true;
        }
        // maintain touch state so removeTouchClass doesn't get fired immediately following a touch event
        touchStateTimerId = window.setTimeout(() => currentInputTypeIsTouch = false, DELAY_IN_MS);
    }

    function removeTouchClass() {
        if (!currentInputTypeIsTouch && touchClassAttached) {
            currentInputTypeIsTouch = false;
            document.documentElement.classList.remove(CAN_TOUCH_CLASS_NAME);
            touchClassAttached = false;
        }
    }

    // this event only gets called when input type is touch
    document.addEventListener("touchstart", addTouchClass, false);

    // this event gets called when input type is everything from touch to mouse/trackpad
    document.addEventListener("mouseover", removeTouchClass, false);
})();
