import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Metadata from ".";

describe("<Metadata />", () => {
  const handleChange = jest.fn(2);
  const handleSubmit = jest.fn();
  const deleteResource = jest.fn();
  const updateResource = jest.fn();

  it("render Metadata without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Metadata
        metadata={{}}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deleteResource={deleteResource}
        updateResource={updateResource}
        uploadSuccess={false}
        isResourceEdit={false}
      />,
      div
    );
  });

  it("auto-populate input fields", () => {
    const wrapper = shallow(
      <Metadata
        metadata={{
          title: "sample",
          format: "csv",
          description: "Lorem ...",
          restricted: "private",
          encoding: "utf-8",
        }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        deleteResource={deleteResource}
        updateResource={updateResource}
        uploadSuccess={false}
        isResourceEdit={false}
      />
    );
    const inputTitle = wrapper.find("#title");
    const inputFormat = wrapper.find("#format");
    const inputDescription = wrapper.find("#description");
    const inputRestricted = wrapper.find("#restricted");
    const inputEncoding = wrapper.find("#encoding");

    expect(inputTitle.props().value).toEqual("sample");
    expect(inputFormat.props().value).toEqual("csv");
    expect(inputDescription.props().value).toEqual("Lorem ...");
    expect(inputRestricted.props().value).toEqual("private");
    expect(inputEncoding.props().value).toEqual("utf-8");
  });
});
