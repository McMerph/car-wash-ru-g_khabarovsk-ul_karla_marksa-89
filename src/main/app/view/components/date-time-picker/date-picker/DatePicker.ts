import * as Slider from "swiper/dist/js/swiper.min.js";
import AvailabilityHandler from "../../../../model/AvailabilityHandler";
import DateUtils from "../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../constants/class-names";
import SETTINGS from "../../../constants/settings";
import TopControls from "../controls/TopControls";
import IPicker from "../IPicker";
import IDateObserver from "../observers/IDateObserver";
import IMonthObserver from "../observers/IMonthObserver";
import SliderUtils from "../utils/SliderUtils";
import DateOfMonthPicker from "./date-of-month-picker/DateOfMonthPicker";

import "./date-picker.pcss";

// TODO Check current time. Re-render on change
export default class DatePicker implements IPicker<Date>, IDateObserver {

    private topControls: TopControls;

    private slider: any;
    private blockSlideChangeTransitionEnd: boolean = false;

    private sliderContainer: HTMLElement;

    private monthObservers: IMonthObserver[] = [];
    private dateOfMonthObservers: IDateObserver[] = [];

    private availabilityHandler: AvailabilityHandler;

    private month: Date;

    private dateOfPreviousMonthPicker: DateOfMonthPicker;
    private dateOfMonthPicker: DateOfMonthPicker;
    private dateOfNextMonthPicker: DateOfMonthPicker;

    public constructor(initialMonth: Date, availabilityHandler: AvailabilityHandler) {
        this.month = initialMonth;
        this.availabilityHandler = availabilityHandler;

        this.sliderContainer = SliderUtils.getContainer();
        this.handleSlider(this.sliderContainer);

        this.updateMonth(initialMonth);
    }

    public isPicked(): boolean {
        return this.dateOfMonthPicker.isPicked();
    }

    public getPickedValue(): Date {
        return this.dateOfMonthPicker.getPickedValue();
    }

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER.MAIN);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public onDatePick(): void {
        this.dateOfMonthObservers.forEach((observer) => observer.onDatePick());
    }

    public addDateObserver(observer: IDateObserver) {
        this.dateOfMonthObservers.push(observer);
    }

    public removeDateObserver(observer: IDateObserver) {
        const index: number = this.dateOfMonthObservers.indexOf(observer);
        this.dateOfMonthObservers.splice(index, 1);
    }

    public addMonthObserver(observer: IMonthObserver) {
        this.monthObservers.push(observer);
    }

    public removeMonthObserver(observer: IMonthObserver) {
        const index: number = this.monthObservers.indexOf(observer);
        this.monthObservers.splice(index, 1);
    }

    public updateSlider(): void {
        this.slider.update();
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.month)) {
            this.updateMonth(date, true);
        }
        this.dateOfMonthPicker.pick(date);
    }

    public changeMonthOfTheYear(monthIndex: number): void {
        this.updateMonth(new Date(this.month.getFullYear(), monthIndex));
    }

    public changeYear(year: number): void {
        this.updateMonth(new Date(year, this.month.getMonth()));
    }

    public sameMonthOfTheYear(monthIndex: number): boolean {
        return this.month.getMonth() === monthIndex;
    }

    public sameYear(year: number): boolean {
        return this.month.getFullYear() === year;
    }

    public getMonth(): Date {
        return this.month;
    }

    public getSlider(): any {
        return this.slider;
    }

    public setTopControls(topControls: TopControls) {
        this.topControls = topControls;
    }

    private getPreviousMonthLayout(): Node {
        return this.dateOfPreviousMonthPicker.getLayout();
    }

    private getCurrentMonthLayout(): Node {
        return this.dateOfMonthPicker.getLayout();
    }

    private getNextMonthLayout(): Node {
        return this.dateOfNextMonthPicker.getLayout();
    }

    private getPreviousMonth(): Date {
        return DateUtils.getPreviousMonth(this.month);
    }

    private getNextMonth(): Date {
        return DateUtils.getNextMonth(this.month);
    }

    private toPreviousMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getPreviousMonth(this.month));
    }

    private toNextMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getNextMonth(this.month));
    }

    private handleSlider(sliderContainer: HTMLElement) {
        this.slider = new Slider(sliderContainer, {
            grabCursor: true,
            spaceBetween: SETTINGS.SPACE_BETWEEN_MONTHS_SLIDES,
        });
        this.handleSlideChange();
        this.handleSlideChangeTransitionEnd();
    }

    private handleSlideChangeTransitionEnd() {
        this.slider.on("slideChangeTransitionEnd", () => {
            if (!this.blockSlideChangeTransitionEnd) {
                this.blockSlideChangeTransitionEnd = true;
                if (this.slider.activeIndex === 0) {
                    this.toPreviousMonth();
                } else if (this.slider.activeIndex === 2) {
                    this.toNextMonth();
                }
            }
        });
    }

    private handleSlideChange() {
        this.slider.on("slideChange", () => {
            this.blockSlideChangeTransitionEnd = false;
            if (this.slider.activeIndex === 0) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.getPreviousMonth());
                }
            } else if (this.slider.activeIndex === 1) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.getMonth());
                }
            } else if (this.slider.activeIndex === 2) {
                // TODO Remove if?
                if (this.topControls) {
                    this.topControls.updateSelects(this.getNextMonth());
                }
            }
        });
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.month = month;
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(this.getPreviousMonth(), this.availabilityHandler);
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfNextMonthPicker = new DateOfMonthPicker(this.getNextMonth(), this.availabilityHandler);
        this.dateOfMonthPicker.addDateObserver(this);

        this.monthObservers.forEach((observer) => observer.onMonthChange());

        this.update(animated);
    }

    private update(animated?: boolean): void {
        this.slider.removeAllSlides();
        this.slider.appendSlide(SliderUtils.getSlide(this.getPreviousMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.getCurrentMonthLayout()));
        this.slider.appendSlide(SliderUtils.getSlide(this.getNextMonthLayout()));
        this.slider.slideTo(1, animated ? undefined : 0);
        this.updateSlider();

        // TODO Remove if?
        if (this.topControls) {
            this.topControls.updateSelects(this.getMonth());
        }
    }

}
