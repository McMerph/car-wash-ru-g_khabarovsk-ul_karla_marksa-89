import "eligrey-classlist-js-polyfill/classList.min.js";
import * as padStart from "string.prototype.padstart";
import "./view/StickyHoverFix";

import "./view/styles";

import IApi from "./model/api/IApi";
import IAvailability from "./model/api/IAvailability";
import MockApi from "./model/api/MockApi";
import AvailabilityHandler from "./model/AvailabilityHandler";
import Modal from "./view/components/Modal/index";

padStart.shim();

function start() {
    // TODO Change to real API
    const api: IApi = new MockApi();
    const availability: IAvailability = api.retrieveAvailability();
    const availabilityHandler: AvailabilityHandler = new AvailabilityHandler(availability);

    const modal: Modal = new Modal(availabilityHandler);
    document.body.appendChild(modal.getLayout());

    const openButton: HTMLButtonElement = (document.querySelector(".profile__actions .check-in") as HTMLButtonElement);
    openButton.addEventListener("click", () => {
        modal.open();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    start();
});
