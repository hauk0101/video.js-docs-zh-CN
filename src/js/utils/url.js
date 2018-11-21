/**
 * @file url.js
 * @module url
 */

import document from 'global/document';
import window from 'global/window';

/**
 * @typedef {Object} url:URLObject
 * 
 * @property {string} protocol
 *           url 中已经被解析的协议
 *           
 * @property {string} hostname 
 *           url 中已被解析的主机名
 * 
 * @property {string} port
 *           url 中已被解析的端口号
 * 
 * @property {string} pathname
 *           url 中已被解析的路径
 * 
 * @property {string} search
 *           url 中已被解析的从问号 (?) 开始的 URL（查询部分）
 * 
 * @property {string} hash
 *           url 中已被解析的从井号 (#) 开始的 URL（锚）
 * 
 * 
 * @property {string} host
 *           url 中已被解析的主机名和当前 URL 的端口号
 * 
 */



/**
 * 通过 elements 元素来解析一个 url ，并将其转为一个 URLObject 对象
 *
 * @function 
 * @param {String} url 
 *        需要被解析的 url 
 * 
 * @return {url:URLObject} 
 *         一个包含 url 详细属性的对象
 * 
 */
export const parseUrl = function (url) {
    const props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];

    // add the url to an anchor and let the browser parse the URL
    let a = document.createElement('a');

    a.href = url;

    // IE8 (and 9?) Fix
    // ie8 doesn't parse the URL correctly until the anchor is actually
    // added to the body, and an innerHTML is needed to trigger the parsing
    const addToBody = (a.host === '' && a.protocol !== 'file:');
    let div;

    if (addToBody) {
        div = document.createElement('div');
        div.innerHTML = `<a href="${url}"></a>`;
        a = div.firstChild;
        // prevent the div from affecting layout
        div.setAttribute('style', 'display:none; position:absolute;');
        document.body.appendChild(div);
    }

    // Copy the specific URL properties to a new object
    // This is also needed for IE8 because the anchor loses its
    // properties when it's removed from the dom
    const details = {};

    for (let i = 0; i < props.length; i++) {
        details[props[i]] = a[props[i]];
    }

    // IE9 adds the port to the host property unlike everyone else. If 
    // a port identifier is added for standart ports, strip it.
    if (details.protocol === 'http:') {
        details.host = details.host.replace(/:80$/, '');
    }

    if (details.protocol === 'https:') {
        details.host = details.host.replace(/:443$/, '');
    }

    if (!details.protocol) {
        details.protocol = window.location.protocol;
    }

    if (addToBody) {
        document.body.removeChild(div);
    }

    return details;
}

/**
 * 根据相对路径获得一个绝对地址，主要用于告诉 Flash 播放器一个正确的 URL
 * 
 * @function
 * @param {string} url 
 *        将 url 变为绝对地址 
 * 
 * @returns {string}
 *          绝对地址
 * 
 * @see http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 */
export const getAbsoluteURL = function (url) {
    // Check if absolute URL
    if (!url.match(/^https?:\/\//)) {
        // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
        const div = document.createElement('div');
        div.innerHTML = `<a href="${url}">x</a>`;
        url = div.firstChild.href;
    }

    return url;
}



/**
 * 通过传入的文件路径返回文件拓展名
 * 如果传入的文件路径无效，则返回一个空的字符串
 * 
 * @function
 * @param {string} path
 *        文件路径名，类似于 "/path/to/file.mp4"
 * 
 * @returns {string}
 *           文件拓展名将会返回一个小写的字符串，
 *           或者无法找到对应的拓展名时，会返回一个空字符串
 */
export const getFileExtension = function (path) {
    if (typeof path === "string") {
        const splitPathRe = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i;
        const pathParts = splitPathRe.exec(path);

        if (pathParts) {
            return pathParts.pop().toLowerCase();
        }
    }
    return '';
}

/**
 * 返回传递的请求是否是跨域请求
 * 
 * @function
 * @param {string} url 
 *        需要检测的请求
 * 
 * @return {boolean}
 *         是否为跨域请求
 */
export const isCrossOrigin = function (url) {
    const winLoc = window.location;
    const urlInfo = parseUrl(url);

    // IE8 protocol relative urls will return ':' for protocol
    const srcProtocol = urlInfo.protocol === ':' ? winLoc.protocol : urlInfo.protocol;


    // Check if url is for another domain/origin
    // IE8 doesn't know location.origin, so we won't rely on it here
    const crossOrigin = (srcProtocol + urlInfo.host) !== (winLoc.protocol + winLoc.host);
    return crossOrigin;
}

