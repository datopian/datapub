"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeHyphen = exports.onFormatBytes = exports.onFormatName = exports.onFormatTitle = exports.getFileExtension = void 0;

var getFileExtension = function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};

exports.getFileExtension = getFileExtension;

var onFormatTitle = function onFormatTitle(name) {
  return name.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/-/g, " ");
};

exports.onFormatTitle = onFormatTitle;

var onFormatName = function onFormatName(name) {
  return name.replace(/\.[^/.]+$/, "");
};

exports.onFormatName = onFormatName;

var onFormatBytes = function onFormatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (bytes === 0) return "0 Bytes";
  var k = 1000;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.onFormatBytes = onFormatBytes;

var removeHyphen = function removeHyphen(id) {
  return id.replace(/-/g, "");
};

exports.removeHyphen = removeHyphen;