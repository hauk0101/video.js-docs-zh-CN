import toTitleCase, { titleCaseEquals } from '../../../src/js/utils/to-title-case';

describe('module to-title-case:', () => {
    test('should make a string start with an uppercase letter', () => {
        const foo = toTitleCase('bar');
        expect(foo === 'Bar').toBeTruthy();
    });

    describe('titleCaseEquals compares whether the TitleCase of two strings is equal:', () => {
        test('foo equals foo', () => { expect(titleCaseEquals('foo', 'foo')).toBeTruthy() });
        test('foo equals Foo',()=>{expect(titleCaseEquals('foo','Foo')).toBeTruthy()});
        test('Foo equals foo',()=>{expect(titleCaseEquals('Foo','foo')).toBeTruthy()});
        test('Foo equals Foo',()=>{expect(titleCaseEquals('Foo','Foo')).toBeTruthy()});

        test('fooBar equals fooBar',()=>{expect(titleCaseEquals('fooBar','fooBar')).toBeTruthy()});
        test('fooBAR does not equal fooBar',()=>{expect(titleCaseEquals('fooBAR','fooBar')).toBeFalsy()});
        test('foobar does not equal fooBar',()=>{expect(titleCaseEquals('foobar','fooBar')).toBeFalsy()});
        test('fooBar does not equal fooBAR',()=>{expect(titleCaseEquals('fooBar','FOOBAR')).toBeFalsy()});
    });
});