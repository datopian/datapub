import React from "react";
import { shallow } from "enzyme";

import TableSchema from ".";

describe("<TableSchema />", () => {
  const onChange = jest.fn(() => "https://www.datopian.com");

  it("render TableSchema without crashing", () => {
    const wrapper = shallow(<TableSchema data={[]} schema={{fields: []}} />);

    
    expect(wrapper.contains("Title")).toEqual(true);
    expect(wrapper.contains("Description")).toEqual(true);
    expect(wrapper.contains("Type")).toEqual(true);
    expect(wrapper.contains("Format")).toEqual(true);
  });

});