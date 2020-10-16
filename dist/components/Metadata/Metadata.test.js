"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<Metadata />", function () {
  var handleChange = jest.fn(2);
  var handleSubmit = jest.fn();
  var deleteResource = jest.fn();
  var updateResource = jest.fn();
  it("render Metadata without crashing", function () {
    var div = document.createElement("div");

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_.default, {
      metadata: {},
      handleChange: handleChange,
      handleSubmit: handleSubmit,
      deleteResource: deleteResource,
      updateResource: updateResource,
      uploadSuccess: false,
      isResourceEdit: false
    }), div);
  });
  it("auto-populate input fields", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      metadata: {
        title: "sample",
        format: "csv",
        description: "Lorem ...",
        restricted: "private",
        encoding: "utf-8"
      },
      handleChange: handleChange,
      handleSubmit: handleSubmit,
      deleteResource: deleteResource,
      updateResource: updateResource,
      uploadSuccess: false,
      isResourceEdit: false
    }));
    var inputTitle = wrapper.find("#title");
    var inputFormat = wrapper.find("#format");
    var inputDescription = wrapper.find("#description");
    var inputRestricted = wrapper.find("#restricted");
    var inputEncoding = wrapper.find("#encoding");
    expect(inputTitle.props().value).toEqual("sample");
    expect(inputFormat.props().value).toEqual("csv");
    expect(inputDescription.props().value).toEqual("Lorem ...");
    expect(inputRestricted.props().value).toEqual("private");
    expect(inputEncoding.props().value).toEqual("utf-8");
  });
});