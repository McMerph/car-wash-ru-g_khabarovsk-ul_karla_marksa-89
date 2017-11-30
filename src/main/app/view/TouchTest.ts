export default class TouchTest {

    private readonly element: HTMLElement = document.querySelector('.touch-test') as HTMLElement;

    private touch: Touch;
    private swipeStarted: boolean = false;
    private swipeDetecting: boolean = false;

    public constructor() {
        this.element.addEventListener('touchstart', (event: TouchEvent) => this.handleTouchStart(event));
        this.element.addEventListener('touchmove', (event: TouchEvent) => this.handleTouchMove(event));
        this.element.addEventListener('touchend', (event: TouchEvent) => this.handleTouchEnd(event));
        this.element.addEventListener('touchcancel', (event: TouchEvent) => this.handleTouchEnd(event));
    }

    private handleTouchStart(event: TouchEvent) {
        if (event.touches.length === 1 && !this.swipeStarted) {
            this.swipeDetecting = true;
            this.touch = event.changedTouches[0];

            // TODO Delete
            this.element.textContent =
                `event: 'touchstart'
                started: ${this.swipeStarted}
                detecting: ${this.swipeDetecting}
                this.touch.identifier: ${this.touch.identifier}
                x: ${this.touch.pageX}
                y: ${this.touch.pageY}`;
        }
    }

    private handleTouchMove(event: TouchEvent) {
        if (this.swipeStarted || this.swipeDetecting) {
            // const inList: boolean = this.isInList(event.touches);
            if (event.touches.length === 1) {
                const touch: Touch = event.changedTouches[0];

                if (this.swipeDetecting) {
                    if (this.isHorizontalSwipe(touch)) {
                        event.preventDefault();
                        this.swipeStarted = true;
                    }
                    this.swipeDetecting = false;
                }
                if (this.swipeStarted) {
                    event.preventDefault();
                    const delta: number = this.touch.pageX - touch.pageX;
                    // Если листать некуда, делим смещение на некоторую величину
                    // для создания визуального эффекта «сопротивления движению» страницы.
                    // Таким образом, даем пользователю понять, что дальше страниц нет
                    // if (delta > 0 && !leftPage || delta < 0 && !rightPage) {
                    //     delta = delta / 5;
                    // }

                    this.element.textContent = `delta: ${delta}`;
                    console.log(delta);
                    // TODO Fix
                    // this.moveTo(delta);
                }
            }
        }
    }

    private handleTouchEnd(event: TouchEvent) {
        if (event.touches.length === 1 && this.swipeStarted) {
            event.preventDefault();

            // Определяем, в какую сторону нужно произвести перелистывание
            // swipeTo = delta < 0 ? 'left' : 'right';
            // Отрисовываем перелистывание, о чем чуть позже
            // swipe(swipeTo);
            this.element.textContent = `touchend`;
        }
        this.swipeStarted = false;
    }

    /**
     * Определение хотел ли пользователь перелистнуть страницу.
     * Стравнивается смещения пальца по осям.
     * Если смещение больше по оси х, чем по у, значит, пользователь листает по горизонтали.
     * @param {Touch} touch - touch to check
     */
    private isHorizontalSwipe(touch: Touch) {
        return Math.abs(this.touch.pageX - touch.pageX) >= Math.abs(this.touch.pageY - touch.pageY);
    }

}
