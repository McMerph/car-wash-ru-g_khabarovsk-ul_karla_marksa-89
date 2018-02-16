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
import DateTimePicker from "./view/components/date-time-picker/DateTimePicker";
import ModalHandler from "./view/components/modal/ModalHandler";

padStart.shim();

function start() {
    const mockApi: IApi = new MockApi();
    const availability: IAvailability = mockApi.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);

    const dateTimePickerParent: HTMLElement = (document.querySelector(".modal__content") as HTMLElement);
    const dateTimePicker: DateTimePicker = new DateTimePicker(availabilityHandler);
    dateTimePickerParent.insertBefore(dateTimePicker.getLayout(), dateTimePickerParent.childNodes.item(2));
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

    // TODO Delete?
    // openButton.click();
    // toNearestButton.click();
}

document.addEventListener("DOMContentLoaded", () => {
    start();
});
