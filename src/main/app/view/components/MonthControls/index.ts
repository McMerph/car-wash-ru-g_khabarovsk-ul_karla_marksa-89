import CLASS_NAMES from "../../constants/ClassNames";
import DateSlider from "../DatePicker/DateSlider";
import ILayout from "../ILayout";

export default class MonthControls implements ILayout {

    private readonly dateSlider: DateSlider;

    public constructor(dateSlider: DateSlider) {
        this.dateSlider = dateSlider;
    }

    public getLayout(): HTMLElement {
        const controls: HTMLDivElement = document.createElement("div");
        controls.classList.add(CLASS_NAMES.MONTH_CONTROLS_BLOCK);
        controls.appendChild(this.dateSlider.getPreviousControl());
        controls.appendChild(this.dateSlider.getMonthChooser());
        controls.appendChild(this.dateSlider.getYearChooser());
        controls.appendChild(this.dateSlider.getNextControl());

        return controls;
    }

}
