export default class TouchTest {

    private readonly element: HTMLElement = document.querySelector('.touch-test') as HTMLElement;

    private touch: Touch;
    private swipeStarted: boolean = false;
    private swipeDetecting: boolean = false;
    private delta: number;

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
            // this.element.textContent =
            //     `event: 'touchstart'
            //     started: ${this.swipeStarted}
            //     detecting: ${this.swipeDetecting}
            //     this.touch.identifier: ${this.touch.identifier}
            //     x: ${this.touch.pageX}
            //     y: ${this.touch.pageY}`;
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
                    this.delta = this.touch.pageX - touch.pageX;
                    // Если листать некуда, делим смещение на некоторую величину
                    // для создания визуального эффекта «сопротивления движению» страницы.
                    // Таким образом, даем пользователю понять, что дальше страниц нет
                    // if (delta > 0 && !leftPage || delta < 0 && !rightPage) {
                    //     delta = delta / 5;
                    // }

                    this.moveTo(this.delta);
                }
            }
        }
    }

    private handleTouchEnd(event: TouchEvent) {
        console.log('JSON.stringify(event):', JSON.stringify(event));
        if (this.swipeStarted) {
            event.preventDefault();
            this.slideTo(this.delta);

            // Определяем, в какую сторону нужно произвести перелистывание
            // swipeTo = delta < 0 ? 'left' : 'right';
            // Отрисовываем перелистывание, о чем чуть позже
            // swipe(swipeTo);
            // this.element.textContent = `touchend`;
        }
        this.swipeStarted = false;
    }

    private slideTo(delta: number): void {
        this.getLeftSlide().classList.add('slide-animating');
        this.getCenterSlide().classList.add('slide-animating');
        this.getRightSlide().classList.add('slide-animating');

        if (delta < 0) {
            this.slideToRight();
        } else if (delta > 0) {
            this.slideToLeft();
        }
    }

    private slideToRight(): void {
        this.getLeftSlide().style.transform = 'translate3d(0, 0, 0)';
        this.getCenterSlide().style.transform = 'translate3d(100%, 0, 0)';
    }

    private slideToLeft(): void {
        this.getRightSlide().style.transform = 'translate3d(0, 0, 0)';
        this.getCenterSlide().style.transform = 'translate3d(-100%, 0, 0)';
    }

    private moveTo(delta: number): void {
        const percentageDelta = delta / this.element.clientWidth * 100;

        this.getLeftSlide().style.transform = `translate3d(${-100 - percentageDelta}%, 0, 0`;
        this.getCenterSlide().style.transform = `translate3d(${-percentageDelta}%, 0, 0`;
        this.getRightSlide().style.transform = `translate3d(${100 - percentageDelta}%, 0, 0`;
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

    private getLeftSlide() {
        return (this.element.getElementsByClassName('slide-left')[0] as HTMLElement);
    }

    private getCenterSlide() {
        return (this.element.getElementsByClassName('slide-center')[0] as HTMLElement);
    }

    private getRightSlide() {
        return (this.element.getElementsByClassName('slide-right')[0] as HTMLElement);
    }

}
