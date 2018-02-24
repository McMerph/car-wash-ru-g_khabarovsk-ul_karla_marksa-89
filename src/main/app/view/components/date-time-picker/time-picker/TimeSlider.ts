import CLASS_NAMES from "../../../constants/class-names";
import SETTINGS from "../../../constants/settings";
import DateTimePickerState from "../DateTimePickerState";
import Slider from "../Slider";

export default class TimeSlider extends Slider {

    private readonly itemsCount: number;

    public constructor(dateTimePickerState: DateTimePickerState) {
        super({
            direction: "vertical",
            grabCursor: true,
            mousewheel: true,
            slidesPerView: SETTINGS.TIME_SLIDES_PER_VIEW,
            spaceBetween: 1,
        });
        this.itemsCount = dateTimePickerState.getCheckInTimesCount();
        this.handleNavigation();
    }

    protected generatePreviousControl(): HTMLElement {
        const previousControl = super.generatePreviousControl();
        previousControl.classList.add(
            CLASS_NAMES.NAVIGATION.DISABLED,
            CLASS_NAMES.NAVIGATION.TO_TOP,
        );

        return previousControl;
    }

    protected generateNextControl(): HTMLElement {
        const nextControl = super.generateNextControl();
        nextControl.classList.add(
            CLASS_NAMES.NAVIGATION.TO_BOTTOM,
        );

        return nextControl;
    }

    private handleNavigation(): void {
        this.getSlider().on("slideChange", () => {
            if (this.getSlider().activeIndex <= 0) {
                this.getNextControl().classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.getPreviousControl().classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
            } else if (this.isSliderInTheEnd()) {
                this.getPreviousControl().classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.getNextControl().classList.add(CLASS_NAMES.NAVIGATION.DISABLED);
            } else {
                this.getNextControl().classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
                this.getPreviousControl().classList.remove(CLASS_NAMES.NAVIGATION.DISABLED);
            }
        });
    }

    private isSliderInTheEnd(): boolean {
        return this.getSlider().activeIndex >= this.itemsCount - SETTINGS.TIME_SLIDES_PER_VIEW;
    }

}
