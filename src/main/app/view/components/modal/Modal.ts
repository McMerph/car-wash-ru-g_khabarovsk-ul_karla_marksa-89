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

import "./index.pcss";

// TODO Implement ILayout interface?
export default class Modal {

    private static readonly ESCAPE_KEY_CODE: number = 27;

    private readonly modal: HTMLElement;
    private timeSlider: TimeSlider;
    private dateSlider: DateSlider;

    public constructor() {
        // TODO Change to real API
        const api: IApi = new MockApi();
        const availability: IAvailability = api.retrieveAvailability();
        const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);
        const dateTimePickerState: DateTimePickerState = new DateTimePickerState(availabilityHandler);

        this.timeSlider = new TimeSlider(dateTimePickerState);
        this.dateSlider = new DateSlider(dateTimePickerState);
        const dateTimePicker: DateTimePicker = new DateTimePicker(this.timeSlider, this.dateSlider, dateTimePickerState);

        // TODO Delete after test
        (window as any).dateTimePicker = dateTimePicker;

        const topControls: TopControls = new TopControls(this.dateSlider, this.timeSlider);
        const bottomControls: BottomControls = new BottomControls(this.timeSlider);

        this.modal = document.createElement("div");
        this.modal.classList.add(
            CLASS_NAMES.MODAL.MAIN,
            CLASS_NAMES.MODAL.CLOSED,
            CLASS_NAMES.OVERLAY,
        );
        this.modal.tabIndex = -1;
        this.modal.setAttribute("aria-hidden", "true");

        const modalContent = document.createElement("div");
        modalContent.classList.add(CLASS_NAMES.MODAL.CONTENT);

        // TODO Make multiple?
        const selectService: HTMLSelectElement = document.createElement("select");
        selectService.classList.add(CLASS_NAMES.SELECT_SERVICE);
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

        const footer: HTMLElement = document.createElement("footer");
        footer.classList.add(CLASS_NAMES.MODAL.FOOTER);
        const toNearestButton: HTMLButtonElement = document.createElement("button");
        toNearestButton.classList.add(CLASS_NAMES.MODAL.TO_NEAREST);
        toNearestButton.appendChild(document.createTextNode(DICTIONARY.NEAREST_AVAILABLE));
        toNearestButton.addEventListener("click", () => {
            dateTimePicker.pickNearest();
        });
        const checkInButton: HTMLButtonElement = document.createElement("button");
        checkInButton.classList.add(CLASS_NAMES.MODAL.CHECK_IN);
        checkInButton.appendChild(document.createTextNode(DICTIONARY.CHECK_IN));
        footer.appendChild(toNearestButton);
        footer.appendChild(checkInButton);

        modalContent.appendChild(selectService);
        modalContent.appendChild(topControls.getLayout());
        modalContent.appendChild(dateTimePicker.getLayout());
        modalContent.appendChild(bottomControls.getLayout());
        modalContent.appendChild(footer);

        this.modal.appendChild(modalContent);

        document.body.appendChild(this.modal);

        this.handleModalCloseOnEsc();
    }

    public open() {
        this.timeSlider.update();
        this.dateSlider.update();
        document.body.style.overflow = "hidden";
        this.modal.classList.add(CLASS_NAMES.MODAL.OPENED);
        this.modal.classList.remove(CLASS_NAMES.MODAL.CLOSED);
    }

    public close() {
        document.body.style.overflow = "auto";
        this.modal.classList.add(CLASS_NAMES.MODAL.CLOSED);
        this.modal.classList.remove(CLASS_NAMES.MODAL.OPENED);
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
