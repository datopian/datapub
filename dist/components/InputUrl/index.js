"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./InputUrl.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputUrl = function InputUrl(_ref) {
  var onChangeUrl = _ref.onChangeUrl;

  var handleKeyPress = function handleKeyPress(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "upload-area__url"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "upload-area__url__label",
    htmlFor: "input-url"
  }, "URL:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "upload-area__url__input",
    id: "input-url",
    type: "url",
    name: "input-url",
    onBlur: onChangeUrl,
    onKeyDown: function onKeyDown(event) {
      return handleKeyPress(event);
    },
    placeholder: "https://www.data.com/sample.csv"
  }));
};

InputUrl.propTypes = {
  onChangeUrl: _propTypes.default.func.isRequired
};
var _default = InputUrl;
exports.default = _default;