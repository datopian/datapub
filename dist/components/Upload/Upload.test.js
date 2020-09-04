"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("<Upload />", function () {
  it("render Upload without crashing", function () {
    var div = document.createElement("div");

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_.default, null), div);
  });
  it.skip('can select a file', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_.default, null));
    var input = wrapper.find('input');
    input.simulate('change', {
      target: {
        files: ['sample.csv']
      }
    });
    expect(wrapper.state().selectedFile).toEqual('sample.csv');
  });
});