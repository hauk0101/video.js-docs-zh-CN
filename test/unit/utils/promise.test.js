
import window from 'global/window';
import * as promise from '../../../src/js/utils/promise';

describe('module utils/promise:',()=>{
    describe('can correctly identify a native Promise (if supported)',()=>{
        if(window.Promise){
           test('a native Promise was recognized',()=>{
                expect(promise.isPromise(new window.Promise((resolve)=>resolve()))).toBeTruthy();
           });
        }
    });

    describe('can identify a Promise-like object',()=>{
        test('an object without a `then` method is not Promise-like',()=>{
            expect(promise.isPromise({})).toBeFalsy();
        });
        test('an object with a `then` method is Promise-like',()=>{
            expect(promise.isPromise({then:()=>{}})).toBeTruthy();
        });
    });


});

