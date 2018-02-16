import IApi from "../../../../main/app/model/api/IApi";
import IAvailability from "../../../../main/app/model/api/IAvailability";
import MockApi from "../../../../main/app/model/api/MockApi";
import AvailabilityHandler from "../../../../main/app/model/AvailabilityHandler";
import Time from "../../../../main/app/model/Time";
import DateUtils from "../../../../main/app/model/utils/DateUtils";

test("getNearestAvailableTimestamp() method", () => {
    const api: IApi = new MockApi();
    const availability: IAvailability = api.retrieveAvailability();
    const handler: AvailabilityHandler = new AvailabilityHandler(availability);
    const nearest: { dateOfMonth: Date, time: Time } = handler.getNearestAvailableTimestamp();

    const tomorrow: number = DateUtils.getTomorrowWithoutTime();
    const expectedNearest: { dateOfMonth: Date, time: Time } = {
        dateOfMonth: new Date(tomorrow),
        time: new Time({hours: 15, minutes: 0}),
    };

    expect(nearest).toEqual(expectedNearest);
});

test("getDisabledTimes() method", () => {
    const api: IApi = new MockApi();
    const availability: IAvailability = api.retrieveAvailability();
    const handler: AvailabilityHandler = new AvailabilityHandler(availability);

    const today: number = DateUtils.getTodayWithoutTime();
    const tomorrow: number = DateUtils.getTomorrowWithoutTime();

    expect(handler.getDisabledTimes(today)).toEqual(handler.getCheckInTimes());
    expect(handler.getDisabledTimes(tomorrow)).toEqual([
        new Time({hours: 9, minutes: 0}),
        new Time({hours: 10, minutes: 0}),
        new Time({hours: 11, minutes: 0}),
        new Time({hours: 12, minutes: 0}),
        new Time({hours: 13, minutes: 0}),
        new Time({hours: 14, minutes: 0}),
        new Time({hours: 18, minutes: 0}),
    ]);
});

test("isDisabledDate() method", () => {
    const api: IApi = new MockApi();
    const availability: IAvailability = api.retrieveAvailability();
    const handler: AvailabilityHandler = new AvailabilityHandler(availability);

    expect(handler.isDisabledDate(DateUtils.getTodayWithoutTime())).toBeTruthy();
    expect(handler.isDisabledDate(DateUtils.getTomorrowWithoutTime())).toBeFalsy();
});

test("isDisabledTimestamp() method", () => {
    const api: IApi = new MockApi();
    const availability: IAvailability = api.retrieveAvailability();
    const handler: AvailabilityHandler = new AvailabilityHandler(availability);

    expect(handler.isDisabledTimestamp(DateUtils.getTomorrowWithoutTime() + 9 * 60 * 60 * 1000)).toBeTruthy();
    expect(handler.isDisabledTimestamp(DateUtils.getTomorrowWithoutTime() + 15 * 60 * 60 * 1000)).toBeFalsy();
});
