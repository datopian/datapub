"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Utils", function () {
  it('format size in Bytes, KB, MB, GB', function () {
    expect((0, _index.onFormatBytes)(100)).toEqual('100 Bytes');
    expect((0, _index.onFormatBytes)(1000)).toEqual('1 KB');
    expect((0, _index.onFormatBytes)(1222222)).toEqual('1.2 MB');
    expect((0, _index.onFormatBytes)(1222222222)).toEqual('1.2 GB');
  });
  it('format title', function () {
    expect((0, _index.onFormatTitle)("sample-data.csv")).toEqual('sample data');
    expect((0, _index.onFormatTitle)("sample_data.csv")).toEqual('sample data');
    expect((0, _index.onFormatTitle)("sample-data_csv.csv")).toEqual('sample data csv');
    expect((0, _index.onFormatTitle)("sampleData.csv")).toEqual('sampleData');
  });
  it('get file extension', function () {
    expect((0, _index.getFileExtension)("sample.csv")).toEqual('csv');
    expect((0, _index.getFileExtension)("sample.html")).toEqual('html');
    expect((0, _index.getFileExtension)("sample.xls")).toEqual('xls');
    expect((0, _index.getFileExtension)("sampleData.doc")).toEqual('doc');
  });
  it('format name', function () {
    expect((0, _index.onFormatName)("sample.csv")).toEqual('sample');
    expect((0, _index.onFormatName)("sample_data.html")).toEqual('sample_data');
    expect((0, _index.onFormatName)("sample-data.xls")).toEqual('sample-data');
    expect((0, _index.onFormatName)("sample-Data.doc")).toEqual('sample-Data');
  });
  it('remove hyphen from uuid', function () {
    expect((0, _index.removeHyphen)("fd77e419-32ae-4025-8d14-890343b605a3")).toEqual('fd77e41932ae40258d14890343b605a3');
    expect((0, _index.removeHyphen)("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d")).toEqual('9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d');
    expect((0, _index.removeHyphen)("should not broken without hyphen")).toEqual('should not broken without hyphen');
  });
});