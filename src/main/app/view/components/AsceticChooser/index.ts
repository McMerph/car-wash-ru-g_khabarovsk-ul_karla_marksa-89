import CLASS_NAMES from "../../constants/ClassNames";
import ILayout from "../ILayout";

export default class AsceticChooser implements ILayout {

    public getLayout(): HTMLSelectElement {
        const select: HTMLSelectElement = document.createElement("select");
        select.classList.add(CLASS_NAMES.ASCETIC_CHOOSER_BLOCK);

        return select;
    }

}
