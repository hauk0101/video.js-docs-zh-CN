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
 *           
 * @property {string} hostname 
 * 
 * @property {string} port
 * 
 * @property {string} pathname
 * 
 * @property {string} search
 * 
 * @property {string} hash
 * 
 * @property {string} host
 * 
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

