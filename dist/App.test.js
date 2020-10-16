"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<App />", function () {
  it("should render in add a resource", function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_App.default, null));
    expect(wrapper.find(".btn")).toHaveLength(1);
    expect(wrapper.find(".btn-delete")).toHaveLength(0);
  });
});