// TODO Refactor
(function () {
    let isTouch = false; //var to indicate current input type (is touch versus no touch)
    let isTouchTimer;
    let curRootClass = ''; //var indicating current document root class ("can-touch" or "")

    function addTouchClass(e) {
        clearTimeout(isTouchTimer);
        isTouch = true;
        if (curRootClass !== 'can-touch') { //add "can-touch' class if it's not already present
            curRootClass = 'can-touch';
            document.documentElement.classList.add(curRootClass)
        }
        isTouchTimer = setTimeout(function () {
            isTouch = false
        }, 500) //maintain "istouch" state for 500ms so removeTouchClass doesn't get fired immediately following a touch event
    }

    function removeTouchClass(e) {
        if (!isTouch && curRootClass === 'can-touch') { //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false;
            curRootClass = '';
            document.documentElement.classList.remove('can-touch')
        }
    }

    document.addEventListener('touchstart', addTouchClass, false); //this event only gets called when input type is touch
    document.addEventListener('mouseover', removeTouchClass, false); //this event gets called when input type is everything from touch to mouse/ trackpad
})();
