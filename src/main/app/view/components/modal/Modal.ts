import IApi from "../../../model/api/IApi";
import IAvailability from "../../../model/api/IAvailability";
import MockApi from "../../../model/api/MockApi";
import AvailabilityHandler from "../../../model/AvailabilityHandler";
import CLASS_NAMES from "../../constants/class-names";
import DICTIONARY from "../../constants/dictionary";
import BottomControls from "../date-time-picker/controls/BottomControls";
import TopControls from "../date-time-picker/controls/TopControls";
import DateSlider from "../date-time-picker/date-picker/DateSlider";
import DateTimePicker from "../date-time-picker/DateTimePicker";
import DateTimePickerState from "../date-time-picker/DateTimePickerState";
import TimeSlider from "../date-time-picker/time-picker/TimeSlider";
import ILayout from "../ILayout";

import "./index.pcss";

export default class Modal implements ILayout {

    private static readonly ESCAPE_KEY_CODE: number = 27;

    private readonly modal: HTMLElement;
    private timeSlider: TimeSlider;
    private dateSlider: DateSlider;

    public constructor() {
        this.modal = document.createElement("div");
        this.modal.classList.add(
            CLASS_NAMES.MODAL_BLOCK.NAME,
            CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED,
            CLASS_NAMES.OVERLAY_BLOCK,
        );
        this.modal.tabIndex = -1;
        this.modal.setAttribute("aria-hidden", "true");

        this.modal.appendChild(this.generateModalContent());
        this.handleModalCloseOnEsc();
    }

    public getLayout(): HTMLElement {
        return this.modal;
    }

    public open() {
        this.timeSlider.update();
        this.dateSlider.update();
        document.body.style.overflow = "hidden";
        this.modal.classList.add(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.OPENED);
        this.modal.classList.remove(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED);
    }

    public close() {
        document.body.style.overflow = "auto";
        this.modal.classList.add(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.CLOSED);
        this.modal.classList.remove(CLASS_NAMES.MODAL_BLOCK.MODIFIERS.OPENED);
    }

    private generateModalContent(): HTMLElement {
        const modalContent: HTMLElement = document.createElement("div");
        modalContent.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT);

        const dateTimePicker: DateTimePicker = this.generateDateTimePicker();

        modalContent.appendChild(this.generateServiceChooser());
        modalContent.appendChild(new TopControls(this.dateSlider, this.timeSlider).getLayout());
        modalContent.appendChild(dateTimePicker.getLayout());
        modalContent.appendChild(new BottomControls(this.timeSlider).getLayout());
        modalContent.appendChild(this.generateFooter(dateTimePicker));

        return modalContent;
    }

    private generateDateTimePicker(): DateTimePicker {
        // TODO Change to real API
        const api: IApi = new MockApi();
        const availability: IAvailability = api.retrieveAvailability();
        const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);
        const dateTimePickerState: DateTimePickerState = new DateTimePickerState(availabilityHandler);

        this.timeSlider = new TimeSlider(dateTimePickerState);
        this.dateSlider = new DateSlider(dateTimePickerState);

        return new DateTimePicker({
            dateSlider: this.dateSlider,
            dateTimePickerState,
            timeSlider: this.timeSlider,
        });
    }

    private generateServiceChooser(): HTMLElement {
        // TODO Make multiple?
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

    private generateFooter(dateTimePicker: DateTimePicker): HTMLElement {
        const footer: HTMLElement = document.createElement("footer");
        footer.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.FOOTER);
        const toNearestButton: HTMLButtonElement = document.createElement("button");
        toNearestButton.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.TO_NEAREST);
        toNearestButton.appendChild(document.createTextNode(DICTIONARY.NEAREST_AVAILABLE));
        toNearestButton.addEventListener("click", () => {
            dateTimePicker.pickNearest();
        });
        const checkInButton: HTMLButtonElement = document.createElement("button");
        checkInButton.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CHECK_IN);
        checkInButton.appendChild(document.createTextNode(DICTIONARY.CHECK_IN));
        footer.appendChild(toNearestButton);
        footer.appendChild(checkInButton);

        return footer;
    }

    private handleModalCloseOnEsc() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === Modal.ESCAPE_KEY_CODE) {
                event.preventDefault();
                this.close();
            }
        });
    }

}
