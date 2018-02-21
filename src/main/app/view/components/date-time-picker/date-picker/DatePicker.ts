import AvailabilityHandler from "../../../../model/AvailabilityHandler";
import DateUtils from "../../../../model/utils/DateUtils";
import CLASS_NAMES from "../../../constants/class-names";
import IPicker from "../IPicker";
import MonthHandler from "../MonthHandler";
import IDateObserver from "../observers/IDateObserver";
import IMonthObserver from "../observers/IMonthObserver";
import SliderUtils from "../utils/SliderUtils";
import DateOfMonthPicker from "./date-of-month-picker/DateOfMonthPicker";
import DateSlider from "./DateSlider";

import "./date-picker.pcss";

// TODO Check current time. Re-render on change
export default class DatePicker implements IPicker<Date>, IDateObserver, IMonthObserver {

    private monthObservers: IMonthObserver[] = [];
    private dateOfMonthObservers: IDateObserver[] = [];

    private readonly availabilityHandler: AvailabilityHandler;

    private monthHandler: MonthHandler;

    private dateOfPreviousMonthPicker: DateOfMonthPicker;
    private dateOfMonthPicker: DateOfMonthPicker;
    private dateOfNextMonthPicker: DateOfMonthPicker;

    private readonly slider: DateSlider;

    public constructor(monthHandler: MonthHandler, availabilityHandler: AvailabilityHandler, slider: DateSlider) {
        this.monthHandler = monthHandler;
        this.monthHandler.addMonthObserver(this);

        this.availabilityHandler = availabilityHandler;
        this.slider = slider;

        this.updateMonth(monthHandler.getMonth());
    }

    public onMonthChange(): void {
        this.updateMonth(this.monthHandler.getMonth());
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
        layout.appendChild(this.slider.getSliderContainer());

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
        // TODO Declare update() method to DateSlider class?
        this.slider.getSlider().update();
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.monthHandler.getMonth())) {
            this.updateMonth(date, true);
        }
        this.dateOfMonthPicker.pick(date);
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(this.getPreviousMonth(), this.availabilityHandler);
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfNextMonthPicker = new DateOfMonthPicker(this.getNextMonth(), this.availabilityHandler);
        this.dateOfMonthPicker.addDateObserver(this);

        this.monthObservers.forEach((observer) => observer.onMonthChange());

        this.update(animated);
    }

    private update(animated?: boolean): void {
        // TODO Declare removeAllSlides() method to DateSlider class?
        this.slider.getSlider().removeAllSlides();

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getPreviousMonthLayout()));

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getCurrentMonthLayout()));

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getNextMonthLayout()));

        // TODO Declare slideTo() method to DateSlider class?
        this.slider.getSlider().slideTo(1, animated ? undefined : 0);
        this.updateSlider();

        // TODO Declare updateSelects() method to DateSlider class?
        this.slider.updateSelects(this.monthHandler.getMonth());
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
        return DateUtils.getPreviousMonth(this.monthHandler.getMonth());
    }

    private getNextMonth(): Date {
        return DateUtils.getNextMonth(this.monthHandler.getMonth());
    }

}
