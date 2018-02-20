import SliderUtils from "../utils/SliderUtils";
import { CLASS_NAMES } from "../../../constants";

// TODO Implement ILayout interface with getLayout() method?
export default class BottomControls {

    private nextTimeControl: HTMLButtonElement;
    private layout: HTMLElement;

    public constructor(slider: any) {
        this.nextTimeControl = SliderUtils.getNextButton(slider);
        this.nextTimeControl.classList.add(
            CLASS_NAMES.NAVIGATION.MAIN,
            CLASS_NAMES.NAVIGATION.TO_BOTTOM,
        );

        this.layout = document.createElement("div");
        this.layout.classList.add(CLASS_NAMES.CONTROLS.BOTTOM);
        this.layout.appendChild(this.nextTimeControl);
    }

    public getLayout(): HTMLElement {
        return this.layout;
    }

    public getNextTimeControl(): HTMLElement {
        return this.nextTimeControl;
    }

}
