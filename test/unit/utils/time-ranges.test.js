import { createTimeRanges, createTimeRange } from '../../../src/js/utils/time-ranges';

describe('module time-ranges:', () => {
    describe('should export the deprecated createTimeRange function:', () => {
        test('createTimeRange is an alias to createTimeRanges', () => {
            expect(createTimeRange).toEqual(createTimeRanges);
        });
    });

    describe('should create a fake single timerange', () => {
        const tr = createTimeRanges(0, 10);
        test('length should be 1', () => { expect(tr.length).toEqual(1) });
        test('works if start is called with valid index', () => { expect(tr.start(0)).toEqual(0) });
        test('works if end is called with with valid index', () => { expect(tr.end(0)).toEqual(10) });
        test('fails if start is called with an invalid index', () => { expect(() => tr.start(1)).toThrow(/Failed to execute 'start'/) });
        test('fails if end is called with with an invalid index', () => { expect(() => tr.end(1)).toThrow(/Failed to execute 'end'/) });
    });

    describe('should create a fake multiple timerange', () => {
        const tr = createTimeRanges([
            [0, 10],
            [11, 20]
        ]);
        test('length should equal 2', () => { expect(tr.length).toEqual(2) });
        test('works if start is called with valid index', () => { expect(tr.start(1)).toEqual(11) });
        test('works if end is called with with valid index', () => { expect(tr.end(1)).toEqual(20) });
        test('fails if start is called with an invalid index', () => { expect(() => tr.start(-1)).toThrow(/Failed to execute 'start'/) });
        test('fails if end is called with with an invalid index', () => { expect(() => tr.end(-1)).toThrow(/Failed to execute 'end'/) });
    });

    describe('should throw without being given an index', () => {
        const tr = createTimeRanges([
            [0, 10],
            [11, 20]
        ]);
        test('start throws if no index is given', () => { expect(() => tr.start()).toThrow(/Failed to execute 'start'/) });
        test('end throws if no index is given', () => { expect(() => tr.end()).toThrow(/Failed to execute 'end'/) });
    });
});