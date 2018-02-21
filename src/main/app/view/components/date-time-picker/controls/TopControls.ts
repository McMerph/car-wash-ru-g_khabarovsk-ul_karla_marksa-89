import CLASS_NAMES from "../../../constants/class-names";
import DateSlider from "../date-picker/DateSlider";
import TimeSlider from "../time-picker/TimeSlider";

// TODO Implement ILayout interface with getLayout() method?
export default class TopControls {

    private layout: HTMLElement;

    public constructor(dateSlider: DateSlider, timeSlider: TimeSlider) {
        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.TOP);
        this.layout.appendChild(this.getDateControls(dateSlider, timeSlider));
        this.layout.appendChild(timeSlider.getPreviousControl());
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    private getDateControls(dateSlider: DateSlider, timeSlider: TimeSlider): HTMLElement {
        const dateControls: HTMLDivElement = document.createElement("div");
        dateControls.classList.add(CLASS_NAMES.DATE_PICKER.CONTROLS);
        dateControls.appendChild(dateSlider.getPreviousControl());
        dateControls.appendChild(dateSlider.getMonthChooser());
        dateControls.appendChild(dateSlider.getYearChooser());
        dateControls.appendChild(dateSlider.getNextControl());

        return dateControls;
    }

}
