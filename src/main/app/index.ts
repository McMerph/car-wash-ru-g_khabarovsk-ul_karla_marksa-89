import "eligrey-classlist-js-polyfill/classList.min.js";
import * as padStart from "string.prototype.padstart";
import "./view/StickyHoverFix";

import "./view/styles";

import IApi from "./model/api/IApi";
import IAvailability from "./model/api/IAvailability";
import MockApi from "./model/api/MockApi";
import AvailabilityHandler from "./model/AvailabilityHandler";
import Modal from "./view/components/Modal/index";

import { HorizontalSlider } from "touch-slider";
import "touch-slider/dist/index.css";

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

    const getNextIndex: () => number = counter();
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("horizontal-test");
    document.body.appendChild(sliderContainer);
    const slider: HorizontalSlider = new HorizontalSlider(sliderContainer, {
        slidesPerView: 2,
        spaceBetween: 10,
    });
    slider.appendSlide(getDiv("red", getNextIndex));
    slider.appendSlide(getDiv("green", getNextIndex));
    slider.appendSlide(getDiv("blue", getNextIndex));
    slider.appendSlide(getDiv("red", getNextIndex));
    slider.appendSlide(getDiv("green", getNextIndex));
    slider.appendSlide(getDiv("blue", getNextIndex));
});

const counter: () => () => number = () => {
    let index = 0;
    return () => index++;
};

const getDiv: (className: string, getNextIndex: () => number) => HTMLElement = (className, getNextIndex) => {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("dummy", className);
    div.textContent = getNextIndex().toString();

    return div;
};
