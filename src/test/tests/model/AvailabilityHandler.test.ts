import Api from '../../../main/app/model/api/Api';
import Availability from '../../../main/app/model/api/Availability';
import MockApi from '../../../main/app/model/api/MockApi';
import AvailabilityHandler from '../../../main/app/model/AvailabilityHandler';
import Time from '../../../main/app/model/Time';
import DateUtils from '../../../main/app/model/utils/DateUtils';

const api: Api = new MockApi();
const availability: Availability = api.retrieveAvailability();
const handler: AvailabilityHandler = new AvailabilityHandler(availability);

test('getNoServiceDates() method', () => {
    const noServiceDates: Date[] = handler.getNoServiceDates();

    expect(noServiceDates.length).toBe(1);
    expect(DateUtils.equalsDateOfMonth(noServiceDates[0], new Date())).toBeTruthy();
});

// TODO Fix
// test('getNearestServiceTimestamp() method', () => {
//     const nearest: Date = handler.getNearestAvailableTimestamp();
//     const expectedNearest = DateUtils.getCurrentDateOfMonth();
//     expectedNearest.setDate(expectedNearest.getDate() + 1);
//     expectedNearest.setHours(11);
//     expectedNearest.setMinutes(0);
//
//     expect(nearest.valueOf()).toBe(expectedNearest.valueOf());
// });

test('getDisabledTimeStamps() method', () => {
    const noService: Map<number, Time[]> = handler.getDisabledTimeStamps();

    const expectedNoService: Map<number, Time[]> = new Map<number, Time[]>();
    const today: Date = DateUtils.getCurrentDateOfMonth();
    const tomorrow: Date = DateUtils.getCurrentDateOfMonth();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expectedNoService.set(today.valueOf(), MockApi.getCheckInTimes().map((apiTime) => new Time(apiTime)));
    expectedNoService.set(tomorrow.valueOf(), [
        new Time({hours: 9, minutes: 0}),
        new Time({hours: 10, minutes: 0}),
        new Time({hours: 18, minutes: 0})
    ]);

    expect(noService).toEqual(expectedNoService);
});
