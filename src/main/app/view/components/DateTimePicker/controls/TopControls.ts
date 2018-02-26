import CLASS_NAMES from "../../../constants/ClassNames";
import DateSlider from "../../DatePicker/DateSlider";
import ILayout from "../../ILayout";
import MonthControls from "../../MonthControls";
import TimeSlider from "../../TimePicker/TimeSlider";

export default class TopControls implements ILayout {

    private layout: HTMLElement;

    public constructor(dateSlider: DateSlider, timeSlider: TimeSlider) {
        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.TOP_BLOCK);
        this.layout.appendChild(new MonthControls(dateSlider).getLayout());
        this.layout.appendChild(timeSlider.getPreviousControl());
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

}
