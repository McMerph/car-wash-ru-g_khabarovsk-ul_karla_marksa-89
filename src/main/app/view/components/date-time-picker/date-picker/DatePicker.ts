import * as Slider from "swiper/dist/js/swiper.min.js";
import AvailabilityHandler from "../../../../model/AvailabilityHandler";
import DateUtils from "../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../constants/class-names";
import SETTINGS from "../../../constants/settings";
import TopControls from "../controls/TopControls";
import IPicker from "../IPicker";
import IDateOfMonthObserver from "../observers/IDateOfMonthObserver";
import IMonthObserver from "../observers/IMonthObserver";
import SliderUtils from "../utils/SliderUtils";
import DateOfMonthPicker from "./date-of-month-picker/DateOfMonthPicker";

import "./date-picker.pcss";

// TODO Check current time. Re-render on change
export default class DatePicker implements IPicker<Date>, IDateOfMonthObserver {

    private topControls: TopControls;

    private slider: any;
    private blockSlideChangeTransitionEnd: boolean = false;

    private sliderContainer: HTMLElement;

    private monthObservers: IMonthObserver[] = [];
    private dateOfMonthObservers: IDateOfMonthObserver[] = [];

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

    public getLayout(): HTMLElement {
        const layout: HTMLElement = document.createElement("div");
        layout.classList.add(CLASS_NAMES.DATE_PICKER.MAIN);
        layout.appendChild(this.sliderContainer);

        return layout;
    }

    public update(animated?: boolean): void {
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

    public updateSlider(): void {
        this.slider.update();
    }

    public setTopControls(topControls: TopControls) {
        this.topControls = topControls;
    }

    public onDateOfMonthPick(): void {
        this.dateOfMonthObservers.forEach((observer) => observer.onDateOfMonthPick());
    }

    public addDateOfMonthObserver(observer: IDateOfMonthObserver) {
        this.dateOfMonthObservers.push(observer);
    }

    public removeDateOfMonthObserver(observer: IDateOfMonthObserver) {
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

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.month)) {
            this.updateMonth(date, true);
        }
        this.dateOfMonthPicker.pick(date);
    }

    public getPreviousMonthLayout(): Node {
        return this.dateOfPreviousMonthPicker.getLayout();
        // return new DateOfMonthPicker(DateUtils.getPreviousMonth(this.month), this.availabilityHandler).getLayout();
    }

    public getCurrentMonthLayout(): Node {
        return this.dateOfMonthPicker.getLayout();
    }

    public getNextMonthLayout(): Node {
        return this.dateOfNextMonthPicker.getLayout();
        // return new DateOfMonthPicker(DateUtils.getNextMonth(this.month), this.availabilityHandler).getLayout();
    }

    public isPicked(): boolean {
        return this.dateOfMonthPicker.isPicked();
    }

    public getPickedValue(): Date {
        return this.dateOfMonthPicker.getPickedValue();
    }

    public getMonth(): Date {
        return this.month;
    }

    public getPreviousMonth(): Date {
        return DateUtils.getPreviousMonth(this.month);
    }

    public getNextMonth(): Date {
        return DateUtils.getNextMonth(this.month);
    }

    public toPreviousMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getPreviousMonth(this.month));
    }

    public toNextMonth(animated?: boolean): void {
        this.updateMonth(DateUtils.getNextMonth(this.month));
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

    public getSlider(): any {
        return this.slider;
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
        this.dateOfMonthPicker.addDateOfMonthObserver(this);

        this.monthObservers.forEach((observer) => observer.onMonthChange());

        this.update(animated);
    }

}
