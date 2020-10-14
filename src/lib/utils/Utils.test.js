import React from "react";
import ReactDOM from "react-dom";
import { getFileExtension, onFormatTitle, onFormatName, onFormatBytes, removeHyphen } from './index'

describe("Utils", () => {
 
  it('format size in Bytes, KB, MB, GB', () => {

    expect(onFormatBytes(100)).toEqual('100 Bytes');
    expect(onFormatBytes(1000)).toEqual('1 KB');
    expect(onFormatBytes(1222222)).toEqual('1.2 MB');
    expect(onFormatBytes(1222222222)).toEqual('1.2 GB');
  });

  it('format title', () => {

    expect(onFormatTitle("sample-data.csv")).toEqual('sample data');
    expect(onFormatTitle("sample_data.csv")).toEqual('sample data');
    expect(onFormatTitle("sample-data_csv.csv")).toEqual('sample data csv');
    expect(onFormatTitle("sampleData.csv")).toEqual('sampleData');
  });

  it('get file extension', () => {

    expect(getFileExtension("sample.csv")).toEqual('csv');
    expect(getFileExtension("sample.html")).toEqual('html');
    expect(getFileExtension("sample.xls")).toEqual('xls');
    expect(getFileExtension("sampleData.doc")).toEqual('doc');
  });

  it('format name', () => {

    expect(onFormatName("sample.csv")).toEqual('sample');
    expect(onFormatName("sample_data.html")).toEqual('sample_data');
    expect(onFormatName("sample-data.xls")).toEqual('sample-data');
    expect(onFormatName("sample-Data.doc")).toEqual('sample-Data');
  });

  it('remove hyphen from uuid', () => {

    expect(removeHyphen("fd77e419-32ae-4025-8d14-890343b605a3")).toEqual('fd77e41932ae40258d14890343b605a3');
    expect(removeHyphen("9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d")).toEqual('9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d');
    expect(removeHyphen("should not broken without hyphen")).toEqual('should not broken without hyphen');
  });
});