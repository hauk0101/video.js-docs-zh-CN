/**
 * @file time-ranges.js
 * @module file-ranges
 */


/**
 * 检查是否有任何时间范围超过了最大的索引值
 * 
 * @private
 * @param {string} fnName
 *          用于记录的函数名称
 * 
 * @param {number} index
 *          要检查的索引值 
 * @param {number} maxIndex 
 *          最大可能的索引值
 * 
 * @throws {Error} 如果提供的时间范围值超过了最大的索引值，则抛出此异常
 * 
 */
function rangeCheck(fnName, index, maxIndex) {
    if (typeof index !== 'number' || index < 0 || index > maxIndex) {
        throw new Error(`Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${maxIndex}).`);
    }
}

/**
 * 获取 TimeRange 对象开头或结尾的指定索引的时间
 * 
 * @param {string} fnName 
 *          用于记录的函数名称
 * 
 * @param {string} valueIndex 
 *          该属性值被应该被用来获取时间，该值应为 "start" 或者 "end"
 * 
 * @param {Array} ranges 
 *          一个包含时间范围的数组
 * 
 * @param {Array} [rangeIndex=0]
 *           开始搜索的索引
 * 
 * @return {number}
 *           指定索引处的偏移时间
 * 
 * @deprecated 开始搜索的索引值必须被设置为一个值，将来抛出一个错误
 * @throws     {Error} 如果开始搜索的索引值超出了搜索范围的长度
 */
function getRange(fnName, valueIndex, ranges, rangeIndex) {
    rangeCheck(fnName, rangeIndex, ranges.length - 1);
    return ranges[rangeIndex][valueIndex];
}

/**
 * 给定时间范围，创建时间范围对象
 * 
 * @private
 * @param {Array} [ranges]
 *          一个包含时间范围的数组 
 */
function createTimeRangedObj(ranges) {
    if (ranges === undefined || ranges.length === 0) {
        return {
            length: 0,
            start() {
                throw new Error('This TimeRanges object is empty');
            },
            end() {
                throw new Error('This TimeRanges object is empty');
            }
        }
    }
    return {
        length: ranges.length,
        start: getRange.bind(null, 'start', 0, ranges),
        end: getRange.bind(null, 'end', 1, ranges)
    };
}

/**
 * 创建一个 “TimeRange” 对象，仿造自
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/TimeRanges|HTML5 TimeRanges instance}
 * 
 * @param {number|Array[]} start 
 *          单个范围（数字）的或范围数组的开始（每个数组包含两个数字的数组）
 * 
 * @param {number} end 
 *          单一范围的结束。 不能与`start`参数的数组形式一起使用。
 */
export function createTimeRanges(start, end) {
    if (Array.isArray(start)) {
        return createTimeRangedObj(start);
    }
    else if (start === undefined || end === undefined) {
        return createTimeRangedObj();
    }
    else {
        return createTimeRangedObj([[start, end]]);
    }
}

export { createTimeRanges as createTimeRange };