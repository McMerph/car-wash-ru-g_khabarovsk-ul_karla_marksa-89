export default class TouchTest {

    private static readonly MAX_DELTA = 95;

    private static readonly HIDDEN_CLASS: string = 'visually-hidden';
    private static readonly SLIDE_CLASS: string = 'slide';
    private static readonly LEFT_SLIDE_CLASS = 'slide-left';
    private static readonly CURRENT_SLIDE_CLASS = 'slide-current';
    private static readonly RIGHT_SLIDE_CLASS = 'slide-right';
    private static readonly ANIMATING_CLASS: string = 'slide-animating';

    private readonly element: HTMLElement = document.querySelector('.touch-test') as HTMLElement;

    private touch: Touch;
    private swipeStarted: boolean = false;
    private swipeDetecting: boolean = false;
    private delta: number;

    // TODO null vs undefined?
    private leftSlide: HTMLElement | null;
    private centerSlide: HTMLElement;
    private rightSlide: HTMLElement | null;
    private slideToLeft: boolean = false;
    private slideToRight: boolean = false;

    public constructor() {
        const children: HTMLCollection = this.element.children;
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add(TouchTest.SLIDE_CLASS, TouchTest.HIDDEN_CLASS);
            }

            this.centerSlide = (this.element.firstElementChild as HTMLElement);
            this.centerSlide.classList.add(TouchTest.CURRENT_SLIDE_CLASS);
            this.render();

            this.element.addEventListener('touchstart', (event: TouchEvent) => this.handleTouchStart(event));
            this.element.addEventListener('touchmove', (event: TouchEvent) => this.handleTouchMove(event));
            this.element.addEventListener('touchend', (event: TouchEvent) => this.handleTouchEnd(event));
            this.element.addEventListener('touchcancel', (event: TouchEvent) => this.handleTouchEnd(event));
            this.element.addEventListener('transitionend', (event: TouchEvent) => this.handleTransitionEnd(event));
        }
    }

    private render(): void {
        for (let i = 0; i < this.element.children.length; i++) {
            const children: Element = this.element.children[i];
            children.classList.remove(
                TouchTest.LEFT_SLIDE_CLASS,
                TouchTest.CURRENT_SLIDE_CLASS,
                TouchTest.RIGHT_SLIDE_CLASS
            );
            children.classList.add(TouchTest.HIDDEN_CLASS);
        }
        this.centerSlide.classList.add(TouchTest.CURRENT_SLIDE_CLASS);
        this.centerSlide.classList.remove(TouchTest.HIDDEN_CLASS);
        this.centerSlide.style.transform = null;
        this.handleLeftSlide();
        this.handleRightSlide();
    }

    private handleTouchStart(event: TouchEvent) {
        if (event.touches.length === 1 && !this.swipeStarted) {
            this.swipeDetecting = true;
            this.touch = event.changedTouches[0];
        }
    }

    private handleTouchMove(event: TouchEvent) {
        if (this.swipeStarted || this.swipeDetecting) {
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
                    this.delta = this.getDelta(touch);
                    this.moveTo();
                }
            }
        }
    }

    private getDelta(touch: Touch): number {
        let delta: number = touch.pageX - this.touch.pageX;
        if ((delta > 0 && !this.leftSlide) || (delta < 0 && !this.rightSlide)) {
            delta = delta / 5;
        }
        delta = delta / this.element.clientWidth * 100;
        if (delta > TouchTest.MAX_DELTA) {
            delta = TouchTest.MAX_DELTA;
        }
        if (delta < -TouchTest.MAX_DELTA) {
            delta = -TouchTest.MAX_DELTA;
        }

        return delta;
    }

    private handleTouchEnd(event: TouchEvent) {
        if (this.swipeStarted) {
            event.preventDefault();
            this.slideTo(this.delta);
        }
        this.swipeStarted = false;
    }

    // TODO Rename
    private getSlides(): HTMLElement[] {
        const slides = [];
        if (this.leftSlide) {
            slides.push(this.leftSlide);
        }
        slides.push(this.centerSlide);
        if (this.rightSlide) {
            slides.push(this.rightSlide);
        }

        return slides;
    }

    private handleTransitionEnd(event: TouchEvent) {
        // TODO optimize?
        this.getSlides().forEach((slide) => slide.classList.remove(TouchTest.ANIMATING_CLASS));
        // for (let i = 0; i < this.element.children.length; i++) {
        //     this.element.children[i].classList.remove(TouchTest.ANIMATING_CLASS);
        // }
        if (this.slideToLeft) {
            this.centerSlide = (this.leftSlide as HTMLElement);
            this.slideToLeft = false;
        }
        if (this.slideToRight) {
            this.centerSlide = (this.rightSlide as HTMLElement);
            this.slideToRight = false;
        }
        this.render();
    }

    private handleLeftSlide() {
        const left = this.centerSlide.previousElementSibling;
        if (left) {
            this.leftSlide = left as HTMLElement;
            this.leftSlide.classList.add(TouchTest.LEFT_SLIDE_CLASS);
            this.leftSlide.classList.remove(TouchTest.HIDDEN_CLASS);
            this.leftSlide.style.transform = null;
        } else {
            this.leftSlide = null;
        }
    }

    private handleRightSlide() {
        const right = this.centerSlide.nextElementSibling;
        if (right) {
            this.rightSlide = right as HTMLElement;
            this.rightSlide.classList.add(TouchTest.RIGHT_SLIDE_CLASS);
            this.rightSlide.classList.remove(TouchTest.HIDDEN_CLASS);
            this.rightSlide.style.transform = null;
        } else {
            this.rightSlide = null;
        }
    }

    private slideTo(delta: number): void {
        // TODO optimize?
        this.getSlides().forEach((slide) => slide.classList.add(TouchTest.ANIMATING_CLASS));
        // for (let i = 0; i < this.element.children.length; i++) {
        //     this.element.children[i].classList.add(TouchTest.ANIMATING_CLASS);
        // }

        if (delta < 0) {
            if (this.rightSlide) {
                (this.rightSlide as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
                (this.centerSlide as HTMLElement).style.transform = 'translate3d(-100%, 0, 0)';
                this.slideToRight = true;
            } else {
                this.centerSlide.style.transform = 'translate3d(0, 0, 0)';
            }
        } else if (delta > 0) {
            if (this.leftSlide) {
                this.leftSlide.style.transform = 'translate3d(0, 0, 0)';
                this.centerSlide.style.transform = 'translate3d(100%, 0, 0)';
                this.slideToLeft = true;
            } else {
                this.centerSlide.style.transform = 'translate3d(0, 0, 0)';
            }
        }
    }

    private moveTo(): void {
        if (this.leftSlide) {
            this.leftSlide.style.transform = `translate3d(${this.delta - 100}%, 0, 0`;
        }

        this.centerSlide.style.transform = `translate3d(${this.delta}%, 0, 0`;

        if (this.rightSlide) {
            this.rightSlide.style.transform = `translate3d(${this.delta + 100}%, 0, 0`;
        }
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
