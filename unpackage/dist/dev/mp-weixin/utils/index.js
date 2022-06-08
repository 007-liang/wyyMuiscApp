"use strict";
require("./request.js");
const to_music_library = (id) => {
  wx.navigateTo({
    url: `/pages/music-library/music-library?id=${id}`
  });
};
const to_search_page = () => {
  wx.navigateTo({
    url: "/pages/search/search"
  });
};
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
  if (isNaN(num)) {
    return;
  }
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
const get_song_ar = (song) => {
  return song.ar.reduce((names, item) => {
    names.push(item.name);
    return names;
  }, []);
};
const forEach = (list, cb) => {
  if (!Array.isArray(list))
    return;
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let result = cb.call(list, item, i);
    if (result)
      break;
  }
};
const parseAuthors = (authors) => {
  let result = ``;
  forEach(authors, (item) => result += `/${item.name}`);
  return result.slice(1);
};
const parseSongTime = (b, s, ms) => {
  let num = 0;
  let br = parseFloat(b);
  let sr = parseFloat(s);
  if (br) {
    num += br * 60;
  }
  if (sr) {
    num += sr;
  }
  return num + +ms / 1e3;
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
exports.get_song_ar = get_song_ar;
exports.numToDateFormat = numToDateFormat;
exports.parseAuthors = parseAuthors;
exports.parseLyricData = parseLyricData;
exports.to_music_library = to_music_library;
exports.to_search_page = to_search_page;
exports.transform_num_unit = transform_num_unit;
