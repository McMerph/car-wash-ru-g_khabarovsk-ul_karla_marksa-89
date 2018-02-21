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

    private dateObservers: IDateObserver[] = [];

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
        // TODO Delete
        // console.log("DatePicker.onMonthChange()");

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
        this.dateObservers.forEach((observer) => observer.onDatePick());
    }

    public addDateObserver(observer: IDateObserver) {
        this.dateObservers.push(observer);
    }

    public removeDateObserver(observer: IDateObserver) {
        const index: number = this.dateObservers.indexOf(observer);
        this.dateObservers.splice(index, 1);
    }

    public updateSwiper(): void {
        // TODO Declare update() method to DateSlider class?
        this.slider.getSlider().update();
    }

    public pick(date: Date): void {
        if (!DateUtils.equalsMonth(date, this.monthHandler.getMonth())) {
            this.monthHandler.setMonth(date);
        }
        this.dateOfMonthPicker.pick(date);
    }

    private updateMonth(month: Date, animated?: boolean): void {
        this.dateOfPreviousMonthPicker = new DateOfMonthPicker(
            this.monthHandler.getPreviousMonth(),
            this.availabilityHandler,
        );
        this.dateOfMonthPicker = new DateOfMonthPicker(month, this.availabilityHandler);
        this.dateOfNextMonthPicker = new DateOfMonthPicker(
            this.monthHandler.getNextMonth(),
            this.availabilityHandler,
        );
        // TODO Remove old observer?
        this.dateOfMonthPicker.addDateObserver(this);

        // TODO Update always animated?
        this.updateSlider(true);
    }

    private updateSlider(animated?: boolean): void {
        // TODO Delete?
        this.slider.setBlock();

        // TODO Declare removeAllSlides() method to DateSlider class?
        this.slider.getSlider().removeAllSlides();

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getPreviousMonthLayout()));

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getCurrentMonthLayout()));

        // TODO Declare appendSlide() method to DateSlider class?
        this.slider.getSlider().appendSlide(SliderUtils.getSlide(this.getNextMonthLayout()));

        this.updateSwiper();

        // TODO Delete?
        this.slider.unSetBlock();

        // TODO Declare slideTo() method to DateSlider class?
        this.slider.getSlider().slideTo(1, animated ? undefined : 0);

        // TODO Declare updateSelects() method to DateSlider class?
        // TODO Uncomment?
        // this.slider.updateSelects(this.monthHandler.getMonth());
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

}
