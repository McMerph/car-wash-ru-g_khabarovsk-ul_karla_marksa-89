import DateUtils from '../../../../model/utils/DateUtils';
import ButtonsPickerLayout from '../../ButtonsPickerLayout';
import ButtonsUtils from '../../utils/ButtonsUtils';
import DateOfMonthPicker from './DateOfMonthPicker';
import Week from './Week';
import WeeksProducer from './WeeksProducer';

export default class DateOfMonthPickerLayout extends ButtonsPickerLayout<Date> {

    private static readonly PAST_CLASS: string = 'past';
    private static readonly TODAY_CLASS: string = 'today';

    private month: Date;

    public constructor(picker: DateOfMonthPicker, month: Date) {
        super(picker);
        this.month = month;
    }

    public getLayout(): HTMLElement {
        const layout: HTMLDivElement = document.createElement('div');
        layout.classList.add('month');

        layout.appendChild(this.getMonthHeader());
        const weeks: Week[] = new WeeksProducer(this.month).getWeeks();
        weeks.forEach((week) => layout.appendChild(this.getWeekLayout(week)));

        return layout;
    }

    protected produceButton(picker: DateOfMonthPicker, date: Date): HTMLButtonElement {
        const button: HTMLButtonElement = super.produceButton(picker, date);
        if (this.picker.isDisabled(date)) {
            ButtonsUtils.disableButtons(button);
        }
        if (DateUtils.isPast(date)) {
            button.classList.add(DateOfMonthPickerLayout.PAST_CLASS);
        }
        if (DateUtils.equalsDateOfMonth(date, new Date())) {
            button.classList.add(DateOfMonthPickerLayout.TODAY_CLASS);
        }

        return button;
    }

    private getMonthHeader(): HTMLElement {
        const header: HTMLElement = document.createElement('header');
        ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].forEach((dayName) =>
            header.appendChild(document.createElement('div'))
                .appendChild(document.createTextNode(dayName))
        );

        return header;
    }

    private getWeekLayout(week: Week): HTMLElement {
        const weekLayout: HTMLDivElement = document.createElement('div');
        weekLayout.classList.add('week');
        for (let i = 1; i <= 7; i++) {
            weekLayout.appendChild(this.getDayLayout(week, i));
        }

        return weekLayout;
    }

    private getDayLayout(week: Week, day: number): HTMLDivElement {
        const dayLayout: HTMLDivElement = document.createElement('div');
        const isDayExists: boolean = (week.startDay <= day) && (week.endDay >= day);
        if (isDayExists) {
            dayLayout.appendChild(this.buttons[week.startDate - week.startDay + day - 1]);
        } else {
            dayLayout.setAttribute('aria-label', 'Данный день не из выбранного месяца');
        }

        return dayLayout;
    }

}
