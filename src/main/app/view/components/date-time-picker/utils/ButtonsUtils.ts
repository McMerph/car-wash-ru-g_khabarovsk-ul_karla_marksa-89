// TODO Delete class
import { CLASS_NAMES } from "../../../constants";

export default class ButtonsUtils {

    public static disableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.add(CLASS_NAMES.PICK_CONTROL.DISABLED));
    }

    public static enableButtons(...buttons: HTMLButtonElement[]) {
        buttons.forEach((button) => button.classList.remove(CLASS_NAMES.PICK_CONTROL.DISABLED));
    }

}
