import document from 'global/document';
import window from 'global/window';
import * as Url from '../../../src/js/utils/url.js';
import { isSymbol } from 'util';

describe('should parse the details of a url correctly:',function(){
    it('parsed relative url protocol',function(){
        expect(Url.parseUrl('#').protocol).toEqual(window.location.protocol);
    });
    it('parsed relative url host',function(){
        expect(Url.parseUrl('#').host).toEqual(window.location.host);
    });
    it('parsed example url protocol',function(){
        expect(Url.parseUrl('http://example.com').protocol).toEqual('http:');
    });
    it('parsed example url hostname',function(){
        expect(Url.parseUrl('http://example.com').hostname).toEqual('example.com');
    });
    it('parsed example url port',function(){
        expect(Url.parseUrl('http://example.com:1234').port).toEqual('1234');
    });
});

describe('should strip port from hosts using http or https:',function(){
    const origDocCreate = document.createElement;

    document.createElement = function(){
        return {
            hostname:'example.com',
            host:'example.com:80',
            protocol:'http:',
            port:'80',
            pathname:'/domain/relative/url',
            hash:''
        };
    };

    const url = Url.parseUrl('/domain/relative/url');
    document.createElement = origDocCreate;
    it(':80 is not appended to the host',function(){
        expect(url.host).toBeTruthy(!(/.*:80$/));
    });
});

describe('should get an absolute URL:',function(){
    
})

