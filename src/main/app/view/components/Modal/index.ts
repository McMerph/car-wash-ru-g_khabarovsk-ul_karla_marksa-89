import IApi from "../../../model/api/IApi";
import IAvailability from "../../../model/api/IAvailability";
import MockApi from "../../../model/api/MockApi";
import AvailabilityHandler from "../../../model/AvailabilityHandler";
import CLASS_NAMES from "../../constants/ClassNames";
import DICTIONARY from "../../constants/Dictionary";
import DateSlider from "../DatePicker/DateSlider";
import BottomControls from "../DateTimePicker/controls/BottomControls";
import TopControls from "../DateTimePicker/controls/TopControls";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import DateTimePickerState from "../DateTimePickerState";
import ILayout from "../ILayout";
import ServiceChooser from "../ServiceChooser";
import TimeSlider from "../TimePicker/TimeSlider";

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
        const dateTimePicker: DateTimePicker = this.generateDateTimePicker();
        const modalContent: HTMLElement = document.createElement("div");
        modalContent.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CONTENT);
        modalContent.appendChild(this.generateModalCloseButton());
        modalContent.appendChild(this.generateModalMain(dateTimePicker));
        modalContent.appendChild(this.generateFooter(dateTimePicker));

        return modalContent;
    }

    private generateModalCloseButton(): HTMLButtonElement {
        const modalClose: HTMLButtonElement = document.createElement("button");
        modalClose.classList.add(
            CLASS_NAMES.MODAL_BLOCK.ELEMENTS.CLOSE,
            CLASS_NAMES.ICON_BLOCK,
        );
        modalClose.addEventListener("click", () => {
            this.close();
        });
        return modalClose;
    }

    private generateModalMain(dateTimePicker: DateTimePicker): HTMLElement {
        const modalMain: HTMLElement = document.createElement("div");
        modalMain.classList.add(CLASS_NAMES.MODAL_BLOCK.ELEMENTS.MAIN);
        modalMain.appendChild(new ServiceChooser().getLayout());
        modalMain.appendChild(new TopControls(this.dateSlider, this.timeSlider).getLayout());
        modalMain.appendChild(dateTimePicker.getLayout());
        modalMain.appendChild(new BottomControls(this.timeSlider).getLayout());

        return modalMain;
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
        checkInButton.classList.add(CLASS_NAMES.CHECK_IN_BLOCK);
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
