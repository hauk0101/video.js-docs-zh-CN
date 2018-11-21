import document from 'global/document';
import window from 'global/window';
import * as Url from '../../../src/js/utils/url.js';
// import proxyquire from 'inject-loader';


// parseUrl tests
describe('should parse the details of a url correctly:',function(){
    it('parsed empty url ',function(){
        expect(Url.parseUrl('').host).toEqual(window.location.host);
    })
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
            expect(!(/.*:80$/).test(url.host)).toBeTruthy();
        });
    });
});


// getAbsoluteURL tests
describe('should get an absolute URL:',function(){
    it('get an absolute url protocol "http:"',function(){
        expect(Url.getAbsoluteURL('http://asdf.com') === 'http://asdf.com').toBeTruthy();
    });
    it('get an absolute url protocol "https:"',function(){
        expect(Url.getAbsoluteURL('https://asdf.com/index.html')==='https://asdf.com/index.html').toBeTruthy();
    });
  
});


// getFileExtension tests
describe('getFileExtension tests',function(){
    it('should get the file extension of the passed path:',function(){
        expect(Url.getFileExtension('/foo/bar/test.video.wgg')).toEqual('wgg');
        expect(Url.getFileExtension('test./video.mp4')).toEqual('mp4');
        expect(Url.getFileExtension('.bar/test.video.m4v')).toEqual('m4v');
        expect(Url.getFileExtension('foo/.bar/test.video.flv')).toEqual('flv');
        expect(Url.getFileExtension('foo/.bar/test.video.flv?foo=bar')).toEqual('flv');
        expect(Url.getFileExtension('http://www.test.com/video.mp4')).toEqual('mp4');
        expect(Url.getFileExtension('http://foo/bar/test.video.wgg')).toEqual('wgg');
    });

    it('should get the file extension of the passed path(edge cases):',function(){
        expect(Url.getFileExtension('http://...')).toEqual('');
        expect(Url.getFileExtension('foo/.bar/testvideo')).toEqual('');
        expect(Url.getFileExtension('')).toEqual('');
        expect(Url.getFileExtension(null)).toEqual('');
        expect(Url.getFileExtension(undefined)).toEqual('');
    });

    it('should get the file extension of the passed path(with capital letters):',function(){
        expect(Url.getFileExtension('test.video.MP4')).toEqual('mp4');
        expect(Url.getFileExtension('test.video.FLV')).toEqual('flv');
    });
});


// isCrossOrigin tests
describe('isCrossOrigin tests',function(){

    it('isCrossOrigin can identify cross origin urls:',function(){
        const win = {
            location:{}
        };
        const Url_ = Url;
        win.location.protocol = window.location.protocol;
        win.location.host = window.location.host;

        //TODO webpack 中还未找到能像在 browserify 中使用 proxyquire 包的方法，当前阶段可以尝试 inject-loader，但是会报错，还未解决
        expect(!Url_.isCrossOrigin(`http://${win.location.host}/example.vtt`)).toBeTruthy('http://google.com from http://google.com is not cross origin');
        expect(Url_.isCrossOrigin(`https://${win.location.host}/example.vtt`)).toBeTruthy('https://google.com from http://google.com is cross origin');
        expect(!Url_.isCrossOrigin(`//${win.location.host}/example.vtt`)).toBeTruthy('//google.com from http://google.com is not cross origin');
        expect(Url_.isCrossOrigin('http://example.com/example.vtt')).toBeTruthy('http://example.com from http://google.com is cross origin');
        expect(Url_.isCrossOrigin('https://example.com/example.vtt')).toBeTruthy('https://example.com from http://google.com is cross origin');
        expect(Url_.isCrossOrigin('//example.com/example.vtt')).toBeTruthy('//example.com from http://google.com is cross origin');
        expect(!Url_.isCrossOrigin('example.vtt')).toBeTruthy('relative url is not cross origin');

        win.location.protocol = 'https:';
        win.location.host = 'google.com';

        expect(Url_.isCrossOrigin('http://google.com/example.vtt')).toBeTruthy('http://google.com from https://google.com is cross origin');
        expect(Url_.isCrossOrigin('http://example.com/example.vtt')).toBeTruthy('http://example.com from https://google.com is cross origin');
        expect(Url_.isCrossOrigin('https://example.com/example.vtt')).toBeTruthy('https://example.com from https://google.com is cross origin');
        expect(Url_.isCrossOrigin('//example.com/example.vtt')).toBeTruthy('//example.com from https://google.com is cross origin');
    });
})

