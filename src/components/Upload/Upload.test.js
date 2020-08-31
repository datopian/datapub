import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Upload from ".";

describe("<Upload />", () => {
  it("render Upload without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Upload />, div);
  });

  it.skip('can select a file', () => {
    const wrapper = shallow(<Upload />)
    const input = wrapper.find('input');
    
    input.simulate('change', {
      target: {
         files: [
           'sample.csv'
         ]   
      }
    });

    expect(wrapper.state().selectedFile).toEqual('sample.csv');
  });

  it('format size in Bytes, KB, MB, GB', () => {
    const wrapper = shallow(<Upload />)

    expect(wrapper.instance().onFormatBytes(100)).toEqual('100 Bytes');
    expect(wrapper.instance().onFormatBytes(1000)).toEqual('1 KB');
    expect(wrapper.instance().onFormatBytes(1222222)).toEqual('1.2 MB');
    expect(wrapper.instance().onFormatBytes(1222222222)).toEqual('1.2 GB');
  });

  it('format title', () => {
    const wrapper = shallow(<Upload />)

    expect(wrapper.instance().onFormatTitle("sample-data.csv")).toEqual('sample data');
    expect(wrapper.instance().onFormatTitle("sample_data.csv")).toEqual('sample data');
    expect(wrapper.instance().onFormatTitle("sample-data_csv.csv")).toEqual('sample data csv');
    expect(wrapper.instance().onFormatTitle("sampleData.csv")).toEqual('sampleData');
  });

  it('get file extension', () => {
    const wrapper = shallow(<Upload />)

    expect(wrapper.instance().getFileExtension("sample.csv")).toEqual('csv');
    expect(wrapper.instance().getFileExtension("sample.html")).toEqual('html');
    expect(wrapper.instance().getFileExtension("sample.xls")).toEqual('xls');
    expect(wrapper.instance().getFileExtension("sampleData.doc")).toEqual('doc');
  });

  it('format name', () => {
    const wrapper = shallow(<Upload />)

    expect(wrapper.instance().onFormatName("sample.csv")).toEqual('sample');
    expect(wrapper.instance().onFormatName("sample_data.html")).toEqual('sample_data');
    expect(wrapper.instance().onFormatName("sample-data.xls")).toEqual('sample-data');
    expect(wrapper.instance().onFormatName("sample-Data.doc")).toEqual('sample-Data');
  });
});
