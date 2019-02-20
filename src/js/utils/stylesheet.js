/**
 * @file stylesheet.js
 * @module stylesheet
 */


import document from 'global/document';


/**
 * 创建一个<style>元素，并为其指定类名称
 * 
 * @param {string} className 
 *          为 <style> 元素指定的类名
 * 
 * @return {Element}
 *           返回一个创建的 DOM 对象    
 */
export const createStyleElement = function(className) {
    const style = document.createElement('style');
  
    style.className = className;
  
    return style;
  };

/**
 * 为 DOM 元素添加文本内容
 * 
 * @param {Element} el 
 *         需要添加文本内容的 DOM 元素
 * 
 * @param {string} content
 *         需要添加的文本 
 */
export const setTextContent = function(el, content) {
    if (el.styleSheet) {
      el.styleSheet.cssText = content;
    } else {
      el.textContent = content;
    }
  };