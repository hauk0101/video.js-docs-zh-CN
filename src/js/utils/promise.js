
/**
 * 返回对象是否为“Promise”（即具有 then 方法）。
 * 
 * @param {Object} value 
 *          一个可能为“Promise”的对象
 * 
 * @return {Boolean}
 *          返回对象是否为“Promise”的结果
 */
export function isPromise(value) {
    return value !== undefined && value !== null && typeof value.then === 'function';
}

/**
 * 静默一个看起来像“Promise”对象
 * 
 * 这对于避免无害但可能令人困惑的“未捕获的播放承诺”拒绝错误消息非常有用。（Promise.prototype.catch方法是.then(null, rejection)的别名）
 * 
 * @param {Object} value 
 *          一个可能为“Promise”的对象
 */
export function silencePromise(value) {
    if (isPromise(value)) {
        value.then(null, (e) => { });
    }
}

