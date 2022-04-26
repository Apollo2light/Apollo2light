/* 
    版权所有：www.51zxw.net
*/

// function show_info(){
//     if(flag) return "这是51zxw的前端构建工具课程grunt";
// }
// show_info(true);
// console.log("执行完毕")

import maxmin from 'maxmin';

const max = 'function smoothRangeRandom(min,max){var num=Math.floor(Math.random()*(max-min+1)+min);return this.prev=num===this.prev?++num:num};';

const min = '(function(b,c){var a=Math.floor(Math.random()*(c-b+1)+b);return this.a=a===this.a?++a:a})()';

console.log(maxmin(max, min, false));