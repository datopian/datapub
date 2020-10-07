import React from "react";
import { shallow } from "enzyme";

import InputUrl from ".";

describe("<InputUrl />", () => {
  const onChangeUrl = jest.fn(() => "https://www.datopian.com");

  it("render InputUrl without crashing", () => {
    const wrapper = shallow(<InputUrl onChangeUrl={onChangeUrl} />);
    expect(wrapper.contains("URL:")).toEqual(true);
  });

  it("can edit url", () => {
    const wrapper = shallow(<InputUrl onChangeUrl={onChangeUrl} />);
    const input = wrapper.find("input");

    input.simulate("blur", {
      target: {
        value: "https://www.datopian.com",
      },
    });

    expect(onChangeUrl).toHaveBeenCalled();
  });
});