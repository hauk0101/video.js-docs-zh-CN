import document from 'global/document';
import window from 'global/window';
import * as Url from '../../../src/js/utils/url.js';
import proxyquireify from 'proxyquireify';
const proxyquire = proxyquireify(require);


describe('module url:', () => {
    // parseUrl tests
    describe('should parse the details of a url correctly:', () => {
        test('parsed relative url protocol ', () => { expect(Url.parseUrl('#').protocol).toEqual(window.location.protocol) });
        test('parsed relative url host ', () => { expect(Url.parseUrl('#').host).toEqual(window.location.host) });
        test('parsed example url protocol ', () => { expect(Url.parseUrl('http://example.com').protocol).toEqual('http:') });
        test('parsed example url hostname ', () => { expect(Url.parseUrl('http://example.com').hostname).toEqual('example.com') });
        test('parsed example url port ', () => { expect(Url.parseUrl('http://example.com:1234').port).toEqual('1234') });
    });


    describe('should strip port from hosts using http or https:', () => {
        const origDocCreate = document.createElement;

        // attempts to create elements will return an anchor tag that misbehaves like IE9
        document.createElement = function () {
            return {
                hostname: 'example.com',
                host: 'example.com:80',
                protocol: 'http:',
                port: '80',
                pathname: '/domain/relative/url',
                hash: ''
            };
        };

        const url = Url.parseUrl('/domain.relative/url');
        document.createElement = origDocCreate;
        test(':80 is not appended to the host', () => { expect(!(/.*:80$/).test(url.host)).toBeTruthy() });
    });

    // getAbsoluteURL tests
    describe('should get an absolute URL:', () => {
        test('get an absolute url protocol "http:"', () => { expect(Url.getAbsoluteURL('http://asdf.com') === 'http://asdf.com').toBeTruthy() });
        test('get an absolute url protocol "https:"', () => { expect(Url.getAbsoluteURL('https://asdf.com/index.html') === 'https://asdf.com/index.html').toBeTruthy() });
    });


    // getFileExtension tests
    describe('getFileExtension tests', function () {
        test('should get the file extension of the passed path:', function () {
            expect(Url.getFileExtension('/foo/bar/test.video.wgg')).toEqual('wgg');
            expect(Url.getFileExtension('test./video.mp4')).toEqual('mp4');
            expect(Url.getFileExtension('.bar/test.video.m4v')).toEqual('m4v');
            expect(Url.getFileExtension('foo/.bar/test.video.flv')).toEqual('flv');
            expect(Url.getFileExtension('foo/.bar/test.video.flv?foo=bar')).toEqual('flv');
            expect(Url.getFileExtension('http://www.test.com/video.mp4')).toEqual('mp4');
            expect(Url.getFileExtension('http://foo/bar/test.video.wgg')).toEqual('wgg');
        });

        test('should get the file extension of the passed path(edge cases):', function () {
            expect(Url.getFileExtension('http://...')).toEqual('');
            expect(Url.getFileExtension('foo/.bar/testvideo')).toEqual('');
            expect(Url.getFileExtension('')).toEqual('');
            expect(Url.getFileExtension(null)).toEqual('');
            expect(Url.getFileExtension(undefined)).toEqual('');
        });

        test('should get the file extension of the passed path(with capital letters):', function () {
            expect(Url.getFileExtension('test.video.MP4')).toEqual('mp4');
            expect(Url.getFileExtension('test.video.FLV')).toEqual('flv');
        });
    });

    // isCrossOrigin tests
    describe('isCrossOrigin can identify cross origin urls:', function () {

        describe('default location:', () => {
            const win = {
                location: {}
            };
            const Url_ = proxyquire('../../../src/js/utils/url.js', {
                'global/window': win
            });
            win.location.protocol = window.location.protocol;
            win.location.host = window.location.host;

            test('http://google.com from http://google.com is not cross origin', () => { expect(!Url_.isCrossOrigin(`http://${win.location.host}/example.vtt`)).toBeTruthy() });
            test('https://google.com from http://google.com is cross origin', () => { expect(Url_.isCrossOrigin(`https://${win.location.host}/example.vtt`)).toBeTruthy() });
            test('//google.com from http://google.com is not cross origin', () => { expect(!Url_.isCrossOrigin(`//${win.location.host}/example.vtt`)).toBeTruthy() });
            test('http://example.com from http://google.com is cross origin', () => { expect(Url_.isCrossOrigin('http://example.com/example.vtt')).toBeTruthy() });
            test('https://example.com from http://google.com is cross origin', () => { expect(Url_.isCrossOrigin('https://example.com/example.vtt')).toBeTruthy() });
            test('//example.com from http://google.com is cross origin', () => { expect(Url_.isCrossOrigin('//example.com/example.vtt')).toBeTruthy() });

            test('relative url is not cross origin', () => { expect(!Url_.isCrossOrigin('example.vtt')).toBeTruthy() });
        });


        describe('https google.com:', () => {
            const win = {
                location: {}
            };
            const Url_ = proxyquire('../../../src/js/utils/url.js', {
                'global/window': win
            });
            win.location.protocol = 'https:';
            win.location.host = 'google.com';
            test('http://google.com from https://google.com is cross origin', () => { expect(Url_.isCrossOrigin('http://google.com/example.vtt')).toBeTruthy() });
            test('http://example.com from https://google.com is cross origin', () => { expect(Url_.isCrossOrigin('http://example.com/example.vtt')).toBeTruthy() });
            test('https://example.com from https://google.com is cross origin', () => { expect(Url_.isCrossOrigin('https://example.com/example.vtt')).toBeTruthy() });
            test('//example.com from https://google.com is cross origin', () => { expect(Url_.isCrossOrigin('//example.com/example.vtt')).toBeTruthy() });
        });

    });
});









