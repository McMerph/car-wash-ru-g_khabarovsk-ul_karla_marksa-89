// TODO Split in 3 files?
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
    NAVIGATION: {
        DISABLED: "picker__navigation_disabled",
        MAIN: "picker__navigation",
        TO_BOTTOM: "picker__navigation_to-bottom",
        TO_LEFT: "picker__navigation_to-left",
        TO_RIGHT: "picker__navigation_to-right",
        TO_TOP: "picker__navigation_to-top",
    },
    PICK_CONTROL: {
        DATE: "pick-control_date",
        DISABLED: "pick-control_disabled",
        MAIN: "pick-control",
        PAST: "pick-control_past",
        PICKED: "pick-control_picked",
        TIME: "pick-control_time",
        TODAY: "pick-control_today",
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

const SETTINGS = Object.freeze({
    SPACE_BETWEEN_MONTHS_SLIDES: 25,
    YEARS_OFFSET: 5,
});

const DICTIONARY = Object.freeze({
    BACK: "Назад",
    DATE_IS_NOT_IN_THIS_MONTH: "Данный день не из выбранного месяца",
    DAYS_NAMES: [
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб",
        "вс",
    ],
    MONTHS_NAMES: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ],
    NEXT: "Далее",
    TIME: "время",
});

export {
    CLASS_NAMES,
    SETTINGS,
    DICTIONARY,
};
