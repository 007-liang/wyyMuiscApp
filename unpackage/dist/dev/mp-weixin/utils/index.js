"use strict";
require("./request.js");
const to_music_library = (id) => {
  wx.navigateTo({
    url: `/pages/music-library/music-library?id=${id}`
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
exports.get_song_ar = get_song_ar;
exports.to_music_library = to_music_library;
exports.transform_num_unit = transform_num_unit;
