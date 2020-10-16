"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<InputFile />", function () {
  var onChangeHandler = jest.fn(function () {
    return "sample";
  });
  it("render InputFile without crashing", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      onChangeHandler: onChangeHandler
    }));
    expect(wrapper.contains("Drag and drop your files")).toEqual(true);
  });
  it("can select a file", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      onChangeHandler: onChangeHandler
    }));
    var input = wrapper.find("input");
    input.simulate("change", {
      target: {
        files: ["sample.csv"]
      }
    });
    expect(onChangeHandler).toHaveBeenCalled();
  });
});