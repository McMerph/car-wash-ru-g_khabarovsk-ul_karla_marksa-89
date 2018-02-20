import "eligrey-classlist-js-polyfill/classList.min.js";
import * as padStart from "string.prototype.padstart";
import "./StickyHoverFix.js";

import "normalize.css/normalize.css";
import "swiper/dist/css/swiper.min.css";
import "./view/components/footer/index.pcss";
import "./view/components/header/index.pcss";
import "./view/components/info/index.pcss";
import "./view/components/modal/index.pcss";
import "./view/components/profile/index.pcss";
import "./view/components/select-service/index.pcss";
import "./view/fonts.css";
import "./view/index.pcss";

import IApi from "./model/api/IApi";
import IAvailability from "./model/api/IAvailability";
import MockApi from "./model/api/MockApi";
import AvailabilityHandler from "./model/AvailabilityHandler";
import BottomControls from "./view/components/date-time-picker/controls/BottomControls";
import TopControls from "./view/components/date-time-picker/controls/TopControls";
import DatePicker from "./view/components/date-time-picker/date-picker/DatePicker";
import DateTimePicker from "./view/components/date-time-picker/DateTimePicker";
import TimePicker from "./view/components/date-time-picker/time-picker/TimePicker";
import ModalHandler from "./view/components/modal/ModalHandler";

padStart.shim();

function start() {
    const mockApi: IApi = new MockApi();
    const availability: IAvailability = mockApi.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);
    const dateTimePicker: DateTimePicker = new DateTimePicker(availabilityHandler);

    const datePicker: DatePicker = dateTimePicker.getDatePicker();
    const dateSlider: any = dateTimePicker.getDateSlider();
    const timePicker: TimePicker = dateTimePicker.getTimePicker();
    const timeSlider: any = dateTimePicker.getTimeSlider();
    const topControls: TopControls = new TopControls(datePicker, dateSlider, timeSlider);
    datePicker.setTopControls(topControls);

    const bottomControls = new BottomControls(timeSlider);
    timePicker.setNextTimeControl(bottomControls.getNextTimeControl());
    timePicker.setPreviousTimeControl(topControls.getPreviousTimeControl());

    const dateTimePickerParent: HTMLElement = (document.querySelector(".modal__content") as HTMLElement);
    dateTimePickerParent.insertBefore(topControls.getLayout(), dateTimePickerParent.childNodes.item(3));
    dateTimePickerParent.insertBefore(dateTimePicker.getLayout(), dateTimePickerParent.childNodes.item(4));
    dateTimePickerParent.insertBefore(bottomControls.getLayout(), dateTimePickerParent.childNodes.item(5));

    dateTimePicker.updateSliders();
    // Fix for ie
    dateTimePicker.updateSliders();

    const modalHandler: ModalHandler = new ModalHandler();

    const openButton: HTMLButtonElement = (document.querySelector(".profile__check-in") as HTMLButtonElement);
    openButton.addEventListener("click", () => {
        modalHandler.open();
    });

    // const closeButton: HTMLButtonElement = (document.querySelector('dialog .close-button') as HTMLButtonElement);
    // closeButton.addEventListener('click', (event) => {
    //     dialog.close();
    // });

    const toNearestButton: HTMLButtonElement = (document.querySelector(".modal__to-nearest") as HTMLButtonElement);
    toNearestButton.addEventListener("click", () => {
        dateTimePicker.pickNearest();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    start();
});
