import CLASS_NAMES from "../../../constants/ClassNames";
import ILayout from "../../ILayout";
import TimeSlider from "../../TimePicker/TimeSlider";

export default class BottomControls implements ILayout {

    private layout: HTMLElement;

    public constructor(timeSlider: TimeSlider) {
        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.BOTTOM_BLOCK);
        this.layout.appendChild(timeSlider.getNextControl());
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

}
