import document from 'global/document';
import window from 'global/window';
import * as Url from '../../../src/js/utils/url.js';

describe('should parse he details of a url correctly',function(){
    it('parsed relative url protocol',function(){
        expect(Url.parseUrl('#').protocol).toEqual(window.location.protocol);
    })
});