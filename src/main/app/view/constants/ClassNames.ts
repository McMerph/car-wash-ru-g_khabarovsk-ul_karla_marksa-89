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
    DATE_TIME_PICKER_BLOCK: {
        ELEMENTS: {
            ASPECT_RATIO: "date-time-picker__aspect-ratio",
            LEFT: "date-time-picker__left",
            MONTH_CONTROLS: "date-time-picker__month-controls",
            RIGHT: "date-time-picker__right",
            ROW: {
                MODIFIERS: {
                    MAIN: "date-time-picker__row_main",
                },
                NAME: "date-time-picker__row",
            },
        },
        NAME: "date-time-picker",
    },
    ICON_BLOCK: "icon",
    MODAL_BLOCK: {
        ELEMENTS: {
            CLOSE: "modal__close",
            CONFIRM: "modal__confirm-date-time",
            CONTENT: {
                MODIFIERS: {
                    OPENED: "modal__content_opened",
                },
                NAME: "modal__content",
            },
            DATE_TIME_CONTROLS: "modal__second-screen-controls",
            FOOTER: {
                NAME: "modal__footer",
            },
            MAIN: "modal__main",
            NEAREST: "modal__nearest-date-time",
            REJECT: "modal__reject-date-time",
            TO_NEAREST: "modal__to-nearest",
            TO_SECOND_SCREEN: "modal__to-second-screen",
        },
        MODIFIERS: {
            CLOSED: "modal_closed",
            OPENED: "modal_opened",
            SECOND_SCREEN: "modal_second-screen",
        },
        NAME: "modal",
    },
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
