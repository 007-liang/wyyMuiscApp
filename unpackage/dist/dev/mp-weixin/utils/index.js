"use strict";
require("./request.js");
let num_unit = [
  "",
  "",
  "",
  "",
  "",
  "\u4E07",
  "\u4E07",
  "\u4E07",
  "\u4E07",
  "\u4EBF",
  "\u4EBF",
  "\u4EBF",
  "\u4EBF"
];
const transform_num_unit = (num) => {
  let str = num.toString();
  let index = str.length > 4 ? str.length % 4 : str.length;
  let result = [];
  if (index === 0 && str.length >= 4) {
    index = 4;
  }
  let unit = num_unit[str.length];
  result.push(str.slice(0, index));
  if (unit === "\u4E07") {
    let float_num = parseInt(str.slice(index, index + 1));
    if (float_num > 0) {
      result.push(float_num);
    }
  }
  return result.join(".") + unit;
};
const forEach = (list, cb) => {
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let result = cb.call(list, item, i);
    if (result)
      break;
  }
};
exports.forEach = forEach;
exports.transform_num_unit = transform_num_unit;
