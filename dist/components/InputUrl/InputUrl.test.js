"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<InputUrl />", function () {
  var onChangeUrl = jest.fn(function () {
    return "https://www.datopian.com";
  });
  it("render InputUrl without crashing", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      onChangeUrl: onChangeUrl
    }));
    expect(wrapper.contains("URL:")).toEqual(true);
  });
  it("can edit url", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      onChangeUrl: onChangeUrl
    }));
    var input = wrapper.find("input");
    input.simulate("blur", {
      target: {
        value: "https://www.datopian.com"
      }
    });
    expect(onChangeUrl).toHaveBeenCalled();
  });
});