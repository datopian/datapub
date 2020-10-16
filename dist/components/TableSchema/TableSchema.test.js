"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<TableSchema />", function () {
  var onChange = jest.fn(function () {
    return "https://www.datopian.com";
  });
  it("render TableSchema without crashing", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, {
      data: [],
      schema: {
        fields: []
      }
    }));
    expect(wrapper.contains("Title")).toEqual(true);
    expect(wrapper.contains("Description")).toEqual(true);
    expect(wrapper.contains("Type")).toEqual(true);
    expect(wrapper.contains("Format")).toEqual(true);
  });
});