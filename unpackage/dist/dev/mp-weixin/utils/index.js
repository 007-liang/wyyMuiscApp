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
const parseAuthors = (authors) => {
  let result = ``;
  authors && authors.forEach((item) => result += `/${item.name}`);
  return result.slice(1);
};
const parseSongTime = (branch, second, millisecond) => {
  let num = 0;
  let br = parseFloat(branch);
  let sc = parseFloat(second);
  if (br) {
    num += br * 60;
  }
  if (sc) {
    num += sc;
  }
  return num + +millisecond / 1e3;
};
const parseLyricData = (lyric, tlyric) => {
  var _a;
  const result = [];
  const timeReg = /^(\[(\d+):(\d+)\.(\d+)\])(.+)?$/;
  let index = 0, lastIndex = 0, tIndex = 0, tLastIndex = 0, data, chunk = "", time = 0, tText = "", text = "";
  while (lastIndex <= lyric.length) {
    lastIndex = lyric.indexOf("\n", lastIndex + 1);
    if (lastIndex === -1)
      break;
    chunk = lyric.slice(index, lastIndex).trim();
    data = timeReg.exec(chunk);
    time = parseSongTime(data[2], data[3], data[4]);
    text = ((_a = data[5]) == null ? void 0 : _a.trim()) || "";
    if (tlyric) {
      tIndex = tlyric.indexOf(data[1], tLastIndex);
      if (tIndex !== -1) {
        tLastIndex = tlyric.indexOf("\n", tIndex + 1);
        tText = tlyric.slice(tIndex + data[1].length, tLastIndex);
      }
    }
    result.push({
      time,
      text,
      tText
    });
    index = lastIndex;
  }
  return result;
};
const numToDateFormat = (num) => {
  let minute = Math.floor(num / 60);
  let second = Math.floor((num / 60 - minute) * 60);
  minute < 9 ? minute = "0" + minute : null;
  second < 9 ? second = "0" + second : null;
  return `${minute}:${second}`;
};
exports.forEach = forEach;
exports.numToDateFormat = numToDateFormat;
exports.parseAuthors = parseAuthors;
exports.parseLyricData = parseLyricData;
exports.transform_num_unit = transform_num_unit;
