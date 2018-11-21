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



 
export const parseUrl = function (url) {
    const props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];

    let a = document.createElement('a');

    a.href = url;

    const addToBody = (a.host === '' && a.protocol !== 'file:');
    let div;

    if (addToBody) {
        div = document.createElement('div');
        div.innerHTML = `<a href="${url}"></a>`;
        a = div.firstChild;

        div.setAttribute('style', 'display:none; position:absolute;');
        document.body.appendChild(div);
    }

    const details = {};

    for (let i = 0; i < props.length; i++) {
        details[props[i]] = a[props[i]];
    }

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

