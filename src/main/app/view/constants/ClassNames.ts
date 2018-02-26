// TODO Move to component's index.ts files?
const CLASS_NAMES = Object.freeze({
    ASCETIC_CHOOSER_BLOCK: "ascetic-chooser",
    CHECK_IN_BLOCK: "check-in",
    DATE_PICKER_BLOCK: {
        ELEMENTS: {
            CELL: {
                MODIFIERS: {
                    DATE: "date-picker__cell_date",
                    DAY: "date-picker__cell_day",
                },
                NAME: "date-picker__cell",
            },
            DATES: "date-picker__dates",
            MONTH: "date-picker__month",
            MONTH_HEADER: "date-picker__month-header",
            WEEK: "date-picker__week",
        },
        NAME: "date-picker",
    },
    ICON_BLOCK: "icon",
    MODAL_BLOCK: {
        ELEMENTS: {
            CLOSE: "modal__close",
            CONTENT: "modal__content",
            FOOTER: "modal__footer",
            LEFT: "modal__left",
            MAIN: "modal__main",
            PICKER: {
                MODIFIERS: {
                    MAIN: "modal__picker_main",
                },
                NAME: "modal__picker",
            },
            RIGHT: "modal__right",
            TO_NEAREST: "modal__to-nearest",
        },
        MODIFIERS: {
            CLOSED: "modal_closed",
            OPENED: "modal_opened",
        },
        NAME: "modal",
    },
    MONTH_CONTROLS_BLOCK: "month-controls",
    NAVIGATION_BLOCK: {
        MODIFIERS: {
            DISABLED: "navigation_disabled",
            TO_BOTTOM: "navigation_to-bottom",
            TO_LEFT: "navigation_to-left",
            TO_RIGHT: "navigation_to-right",
            TO_TOP: "navigation_to-top",
        },
        NAME: "navigation",
    },
    OVERLAY_BLOCK: "overlay",
    PICK_CONTROL_BLOCK: {
        MODIFIERS: {
            DATE: "pick-control_date",
            DISABLED: "pick-control_disabled",
            PAST: "pick-control_past",
            PICKED: "pick-control_picked",
            TIME: "pick-control_time",
            TODAY: "pick-control_today",
        },
        NAME: "pick-control",
    },
    SERVICE_CHOOSER_BLOCK: {
        ELEMENTS: {
            SELECT: "service-chooser__select",
        },
        NAME: "service-chooser",
    },
    SWIPER: {
        CONTAINER: "swiper-container",
        SLIDE: "swiper-slide",
        WRAPPER: "swiper-wrapper",
    },
    TIME_PICKER_BLOCK: {
        ELEMENTS: {
            CAPTION: "time-picker__caption",
        },
        NAME: "time-picker",
    },
});

export default CLASS_NAMES;
