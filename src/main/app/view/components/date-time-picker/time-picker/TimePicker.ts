import Time from "../../../../model/Time";
import DirectPicker from "../DirectPicker";
import TimePickerLayout from "./TimePickerLayout";

import "./time-picker.pcss";
import TimePickerPreviousControlLayout from "./TimePickerPreviousControlLayout";

// TODO Check current time. Re-render on change
export default class TimePicker extends DirectPicker<Time> {

    protected layout: TimePickerLayout;

    public constructor(times: Time[]) {
        super(times);
        this.layout = new TimePickerLayout(this, times);
        this.layout.generateButtons();
    }

    public getRepresentation(time: Time): string {
        return time.getRepresentation();
    }

    public updateSlider(): void {
        this.layout.updateSlider();
    }

    public getSlider(): any {
        return this.layout.getSlider();
    }

    public setPreviousControlLayout(previousControlLayout: TimePickerPreviousControlLayout) {
        this.layout.setPreviousControlLayout(previousControlLayout);
    }

    public setNextTimeControl(nextTimeControl: HTMLElement) {
        this.layout.setNextTimeControl(nextTimeControl);
    }

    protected valuesEquals(time1: Time, time2: Time): boolean {
        return time1.equals(time2);
    }

}
