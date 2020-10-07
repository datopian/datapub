import React from "react";
import { shallow } from "enzyme";

import InputFile from ".";

describe("<InputFile />", () => {
  const onChangeHandler = jest.fn(() => "sample");

  it("render InputFile without crashing", () => {
    const wrapper = shallow(<InputFile onChangeHandler={onChangeHandler} />);
    expect(wrapper.contains("Drag and drop your files")).toEqual(true);
  });

  it("can select a file", () => {
    const wrapper = shallow(<InputFile onChangeHandler={onChangeHandler} />);
    const input = wrapper.find("input");

    input.simulate("change", {
      target: {
        files: ["sample.csv"],
      },
    });

    expect(onChangeHandler).toHaveBeenCalled();
  });
});
