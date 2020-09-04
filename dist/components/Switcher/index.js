"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Switcher.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switcher = function Switcher(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      return props.switcher('metadata');
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-number ".concat(props.metadataOrSchema === 'metadata' ? "switch-number-selected" : "switch-number-disabled")
  }, "1"), /*#__PURE__*/_react.default.createElement("p", {
    className: "switch-description \"switch-description-active\"}"
  }, "Edit Metadata")), /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      return props.switcher('schema');
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "switch-number ".concat(props.metadataOrSchema === 'schema' ? "switch-number-selected" : "switch-number-disabled")
  }, "2"), /*#__PURE__*/_react.default.createElement("p", {
    className: "switch-description \"switch-description-active\"}"
  }, "Edit Schema")), /*#__PURE__*/_react.default.createElement("div", {
    className: "divider-line"
  }));
};

Switcher.propTypes = {
  metadataOrSchema: _propTypes.default.string.isRequired
};
var _default = Switcher;
exports.default = _default;