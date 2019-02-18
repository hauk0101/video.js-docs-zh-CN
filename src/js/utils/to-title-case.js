/**
 * @file to-title-case.js
 * @module to-title-case
 */

/**
 * 将字符串的第一个字母变为大写
 *
 * @param {string} string
 *        第一个字母需要被大写的字符串
 *
 * @return {string}
 *        返回一个第一个字母大写的字符串
 */
function toTitleCase(string){
    if(typeof string !== 'string'){
        return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default toTitleCase;

/**
 * 比较两个字符串在首字母大写后是否相等
 * 
 * @param {string} str1 
 *        需要比较的第一个字符串
 * 
 * @param {string} str2
 *        需要比较的第二个字符串
 * 
 * @return {boolean}
 *        返回结果，两个字符串在首字母大写后是否相等
 *  
 */
export function titleCaseEquals(str1,str2){
    return toTitleCase(str1) === toTitleCase(str2);
}