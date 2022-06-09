"use strict";
require("../store/audio.js");
require("../store/playing-song.js");
require("../store/store-search.js");
require("../store/store-user-info.js");
require("../store/history-library.js");
require("../store/store-music-library.js");
var store_playingSongLibrary = require("../store/playing-song-library.js");
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
  const timeReg = /^(\[(\d+):(\d+)\.(\d+)\])+(.+)?$/;
  let index = 0, lastIndex = 0, tIndex = 0, tLastIndex = 0, data, chunk = "", time = 0, tText = "", text = "";
  while (lastIndex <= lyric.length) {
    lastIndex = lyric.indexOf("\n", lastIndex + 1);
    if (lastIndex === -1)
      break;
    chunk = lyric.slice(index, lastIndex).trim();
    data = timeReg.exec(chunk);
    index = lastIndex;
    if (data === null)
      continue;
    time = parseSongTime(data[2], data[3], data[4]);
    text = ((_a = data[5]) == null ? void 0 : _a.trim()) || "";
    if (!text)
      continue;
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
const setStateIndex = (index, maxIndex, isNext) => {
  if (isNext) {
    if (index === maxIndex) {
      store_playingSongLibrary.setIndex(0);
    } else {
      store_playingSongLibrary.setIndex(++index);
    }
  } else {
    if (index === 0) {
      store_playingSongLibrary.setIndex(maxIndex);
    } else {
      store_playingSongLibrary.setIndex(--index);
    }
  }
};
exports.forEach = forEach;
exports.get_song_ar = get_song_ar;
exports.numToDateFormat = numToDateFormat;
exports.parseAuthors = parseAuthors;
exports.parseLyricData = parseLyricData;
<<<<<<< HEAD
exports.setStateIndex = setStateIndex;
exports.to_music_library = to_music_library;
=======
>>>>>>> 1a0ac77e42b6c066ca79ac2e572eb36f2e909e1d
exports.transform_num_unit = transform_num_unit;
