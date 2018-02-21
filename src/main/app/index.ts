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
import DateSlider from "./view/components/date-time-picker/date-picker/DateSlider";
import DateTimePicker from "./view/components/date-time-picker/DateTimePicker";
import DateTimePickerState from "./view/components/date-time-picker/DateTimePickerState";
import TimeSlider from "./view/components/date-time-picker/time-picker/TimeSlider";
import ModalHandler from "./view/components/modal/ModalHandler";

padStart.shim();

function start() {
    const mockApi: IApi = new MockApi();
    const availability: IAvailability = mockApi.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);
    const timeSliderItemsCount: number = availabilityHandler.getCheckInTimes().length;
    const month: Date = availabilityHandler.getNearestAvailableTimestamp().dateOfMonth;
    const dateTimePickerState: DateTimePickerState = new DateTimePickerState(month);

    const timeSlider: TimeSlider = new TimeSlider(timeSliderItemsCount);
    const dateSlider: DateSlider = new DateSlider(dateTimePickerState);
    const dateTimePicker: DateTimePicker = new DateTimePicker(availabilityHandler, timeSlider, dateSlider, dateTimePickerState);

    const topControls: TopControls = new TopControls(dateSlider, timeSlider);
    const bottomControls = new BottomControls(timeSlider);

    const dateTimePickerParent: HTMLElement = (document.querySelector(".modal__content") as HTMLElement);
    dateTimePickerParent.insertBefore(topControls.getLayout(), dateTimePickerParent.childNodes.item(3));
    dateTimePickerParent.insertBefore(dateTimePicker.getLayout(), dateTimePickerParent.childNodes.item(4));
    dateTimePickerParent.insertBefore(bottomControls.getLayout(), dateTimePickerParent.childNodes.item(5));

    timeSlider.update();
    dateSlider.update();

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
