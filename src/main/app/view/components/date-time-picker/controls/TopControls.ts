import CLASS_NAMES from "../../../constants/class-names";
import DateSlider from "../date-picker/DateSlider";
import ILayout from "../../ILayout";
import TimeSlider from "../time-picker/TimeSlider";

export default class TopControls implements ILayout {

    private static getDateControls(dateSlider: DateSlider, timeSlider: TimeSlider): HTMLElement {
        const dateControls: HTMLDivElement = document.createElement("div");
        dateControls.classList.add(CLASS_NAMES.DATE_PICKER.CONTROLS);
        dateControls.appendChild(dateSlider.getPreviousControl());
        dateControls.appendChild(dateSlider.getMonthChooser());
        dateControls.appendChild(dateSlider.getYearChooser());
        dateControls.appendChild(dateSlider.getNextControl());

        return dateControls;
    }

    private layout: HTMLElement;

    public constructor(dateSlider: DateSlider, timeSlider: TimeSlider) {
        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.TOP);
        this.layout.appendChild(TopControls.getDateControls(dateSlider, timeSlider));
        this.layout.appendChild(timeSlider.getPreviousControl());
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

}
