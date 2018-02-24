const CLASS_NAMES = Object.freeze({
    CHOOSER: "picker__chooser",
    CONTROLS: {
        BOTTOM: "pickers-bottom-controls",
        TOP: "pickers-top-controls",
    },
    DATE_PICKER: {
        CELL: {
            DATE: "date-picker__cell_date",
            DAY: "date-picker__cell_day",
            MAIN: "date-picker__cell",
        },
        CONTROLS: "date-picker__controls",
        DATES: "date-picker__dates",
        MAIN: "date-picker",
        MONTH: "date-picker__month",
        MONTH_HEADER: "date-picker__month-header",
        WEEK: "date-picker__week",
    },
    DATE_TIME_PICKER: "date-time-picker",
    ICON: "icon",
    MODAL: {
        CHECK_IN: "modal__check-in",
        CLOSED: "modal_closed",
        CONTENT: "modal__content",
        FOOTER: "modal__footer",
        MAIN: "modal",
        OPENED: "modal_opened",
        TO_NEAREST: "modal__to-nearest",
    },
    NAVIGATION: {
        DISABLED: "picker__navigation_disabled",
        MAIN: "picker__navigation",
        TO_BOTTOM: "picker__navigation_to-bottom",
        TO_LEFT: "picker__navigation_to-left",
        TO_RIGHT: "picker__navigation_to-right",
        TO_TOP: "picker__navigation_to-top",
    },
    OVERLAY: "overlay",
    PICK_CONTROL: {
        DATE: "pick-control_date",
        DISABLED: "pick-control_disabled",
        MAIN: "pick-control",
        PAST: "pick-control_past",
        PICKED: "pick-control_picked",
        TIME: "pick-control_time",
        TODAY: "pick-control_today",
    },
    SERVICE_CHOOSER: {
        MAIN: "service-chooser",
        SELECT: "service-chooser__select",
    },
    SWIPER: {
        CONTAINER: "swiper-container",
        SLIDE: "swiper-slide",
        WRAPPER: "swiper-wrapper",
    },
    TIME_PICKER: {
        CAPTION: "time-picker__caption",
        MAIN: "time-picker",
    },
});

export default CLASS_NAMES;
