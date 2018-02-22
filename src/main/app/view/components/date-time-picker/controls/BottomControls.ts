import CLASS_NAMES from "../../../constants/class-names";
import ILayout from "../ILayout";
import TimeSlider from "../time-picker/TimeSlider";

export default class BottomControls implements ILayout {

    private layout: HTMLElement;

    public constructor(timeSlider: TimeSlider) {
        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.BOTTOM);
        this.layout.appendChild(timeSlider.getNextControl());
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

}
