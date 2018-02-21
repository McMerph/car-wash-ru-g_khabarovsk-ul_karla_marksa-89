import CLASS_NAMES from "../../../constants/class-names";
import TimeSlider from "../time-picker/TimeSlider";

// TODO Implement ILayout interface with getLayout() method?
export default class BottomControls {

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
