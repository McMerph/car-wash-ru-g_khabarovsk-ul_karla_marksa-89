// tslint:disable-next-line:max-line-length
import WeeksProducer from "../../../../../../../main/app/view/components/date-time-picker/date-picker/date-of-month-picker/WeeksProducer";

test("getWeeks() method", () => {
    const february2027WeeksProducer: WeeksProducer = new WeeksProducer(new Date(2027, 1));
    const november2017WeeksProducer: WeeksProducer = new WeeksProducer(new Date(2017, 10));
    const april2018WeeksProducer: WeeksProducer = new WeeksProducer(new Date(2018, 3));

    expect(february2027WeeksProducer.getWeeks()).toEqual([
        {startDate: 1, startDay: 1, endDay: 7},
        {startDate: 8, startDay: 1, endDay: 7},
        {startDate: 15, startDay: 1, endDay: 7},
        {startDate: 22, startDay: 1, endDay: 7},
    ]);

    expect(november2017WeeksProducer.getWeeks()).toEqual([
        {startDate: 1, startDay: 3, endDay: 7},
        {startDate: 6, startDay: 1, endDay: 7},
        {startDate: 13, startDay: 1, endDay: 7},
        {startDate: 20, startDay: 1, endDay: 7},
        {startDate: 27, startDay: 1, endDay: 4},
    ]);

    expect(april2018WeeksProducer.getWeeks()).toEqual([
        {startDate: 1, startDay: 7, endDay: 7},
        {startDate: 2, startDay: 1, endDay: 7},
        {startDate: 9, startDay: 1, endDay: 7},
        {startDate: 16, startDay: 1, endDay: 7},
        {startDate: 23, startDay: 1, endDay: 7},
        {startDate: 30, startDay: 1, endDay: 1},
    ]);
});
