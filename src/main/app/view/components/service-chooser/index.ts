import CLASS_NAMES from "../../constants/class-names";
import DICTIONARY from "../../constants/dictionary";
import ILayout from "../ILayout";

export default class ServiceChooser implements ILayout {

    public getLayout(): HTMLElement {
        const selectService: HTMLSelectElement = document.createElement("select");
        selectService.classList.add(CLASS_NAMES.SERVICE_CHOOSER_BLOCK.ELEMENTS.SELECT);
        const placeholderOption: HTMLOptionElement = document.createElement("option");
        placeholderOption.value = DICTIONARY.SERVICES.PLACEHOLDER;
        placeholderOption.text = DICTIONARY.SERVICES.PLACEHOLDER;

        placeholderOption.disabled = true;
        placeholderOption.selected = true;

        selectService.options.add(placeholderOption);
        DICTIONARY.SERVICES.LIST.forEach((service) => {
            const option: HTMLOptionElement = document.createElement("option");
            option.value = service;
            option.text = service;
            selectService.options.add(option);
        });

        const wrapper: HTMLElement = document.createElement("div");
        wrapper.classList.add(
            CLASS_NAMES.SERVICE_CHOOSER_BLOCK.NAME,
            CLASS_NAMES.ICON_BLOCK,
        );
        wrapper.appendChild(selectService);

        return wrapper;
    }

}
