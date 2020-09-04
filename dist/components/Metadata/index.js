"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Metadata.css");

var _encode = _interopRequireDefault(require("../../db/encode.json"));

var _resource_formats = _interopRequireDefault(require("../../db/resource_formats.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metadata = function Metadata(_ref) {
  var metadata = _ref.metadata,
      handleChange = _ref.handleChange,
      handleSubmit = _ref.handleSubmit,
      uploadSuccess = _ref.uploadSuccess;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h3", {
    className: "metadata-name"
  }, metadata.path), /*#__PURE__*/_react.default.createElement("form", {
    className: "metadata-form",
    onSubmit: function onSubmit(event) {
      return handleSubmit(event, 0);
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "title"
  }, "Title:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "title",
    id: "title",
    value: metadata.title,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "description"
  }, "Description:"), /*#__PURE__*/_react.default.createElement("input", {
    className: "metadata-input__input",
    type: "text",
    name: "description",
    id: "description",
    value: metadata.description,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "encoding"
  }, "Encoding:"), /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    name: "encoding",
    id: "encoding",
    value: metadata.encoding || "",
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "",
    disabled: true
  }, "Encode"), _encode.default.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: "format-".concat(item.value),
      value: item.value
    }, item.label);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "metadata-input"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "metadata-label",
    htmlFor: "format"
  }, "Format:"), /*#__PURE__*/_react.default.createElement("select", {
    className: "metadata-input__input",
    value: metadata.format || "",
    onChange: handleChange
  }, _resource_formats.default.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: "format-".concat(item[0]),
      value: item[0].toLowerCase()
    }, item[0]);
  }))), /*#__PURE__*/_react.default.createElement("button", {
    disabled: !uploadSuccess,
    className: "metadata-btn"
  }, "Save Metadata")));
};

Metadata.propTypes = {
  metadata: _propTypes.default.object.isRequired,
  handleChange: _propTypes.default.func.isRequired,
  handleSubmit: _propTypes.default.func.isRequired,
  uploadSuccess: _propTypes.default.bool.isRequired
};
var _default = Metadata;
exports.default = _default;