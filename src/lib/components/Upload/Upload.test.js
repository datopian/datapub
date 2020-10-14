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
});
