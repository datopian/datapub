"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTable = require("react-table");

var _types = _interopRequireDefault(require("../../db/types.json"));

require("./TableSchema.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TableSchema = function TableSchema(props) {
  var _useState = (0, _react.useState)(props.schema.fields),
      _useState2 = _slicedToArray(_useState, 2),
      schema = _useState2[0],
      setSchema = _useState2[1]; // eslint-disable-next-line react-hooks/exhaustive-deps


  var data = _react.default.useMemo(function () {
    return _toConsumableArray(props.data);
  }, []);

  var columnsSchema = props.schema.fields.map(function (item) {
    return {
      Header: item.name,
      accessor: item.name
    };
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  var columns = _react.default.useMemo(function () {
    return _toConsumableArray(columnsSchema);
  }, []);

  var _useTable = (0, _reactTable.useTable)({
    columns: columns,
    data: data
  }),
      getTableProps = _useTable.getTableProps,
      getTableBodyProps = _useTable.getTableBodyProps,
      headerGroups = _useTable.headerGroups,
      rows = _useTable.rows,
      prepareRow = _useTable.prepareRow;

  var handleChange = function handleChange(event, key, index) {
    var newObj = _toConsumableArray(schema);

    newObj[index][key] = event.target.value;
    setSchema(newObj);
  };

  var renderEditSchemaField = function renderEditSchemaField(key) {
    if (key === "type") {
      return schema.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement("td", {
          key: "schema-type-field-".concat(key, "-").concat(index)
        }, /*#__PURE__*/_react.default.createElement("select", {
          className: "table-tbody-select",
          value: item[key] || "",
          onChange: function onChange(event) {
            return handleChange(event, key, index);
          }
        }, _types.default.type.map(function (item, index) {
          return /*#__PURE__*/_react.default.createElement("option", {
            key: "schema-type-field-option-".concat(item, "-").concat(index),
            value: item
          }, item);
        })));
      });
    }

    return schema.map(function (item, index) {
      return /*#__PURE__*/_react.default.createElement("td", {
        key: "schema-field-".concat(key, "-").concat(index)
      }, /*#__PURE__*/_react.default.createElement("input", {
        className: "table-tbody-input",
        type: "text",
        value: item[key],
        onChange: function onChange(event) {
          return handleChange(event, key, index);
        }
      }));
    });
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-schema-help"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table-schema-help_row"
  }, "Title"), /*#__PURE__*/_react.default.createElement("div", {
    className: "table-schema-help_row"
  }, "Description"), /*#__PURE__*/_react.default.createElement("div", {
    className: "table-schema-help_row"
  }, "Type"), /*#__PURE__*/_react.default.createElement("div", {
    className: "table-schema-help_row"
  }, "Format"), /*#__PURE__*/_react.default.createElement("button", {
    className: "table-btn-save",
    disabled: !props.uploadSuccess,
    onClick: function onClick() {
      return props.handleSubmitSchema(schema, 1);
    }
  }, "Save")), /*#__PURE__*/_react.default.createElement("div", {
    className: "table"
  }, /*#__PURE__*/_react.default.createElement("table", getTableProps(), /*#__PURE__*/_react.default.createElement("thead", null, headerGroups.map(function (headerGroup) {
    return /*#__PURE__*/_react.default.createElement("tr", _extends({
      className: "table-thead-tr"
    }, headerGroup.getHeaderGroupProps()), headerGroup.headers.map(function (column) {
      return /*#__PURE__*/_react.default.createElement("th", _extends({
        className: "table-thead-th"
      }, column.getHeaderProps()), column.render("Header"));
    }));
  })), /*#__PURE__*/_react.default.createElement("tbody", getTableBodyProps(), /*#__PURE__*/_react.default.createElement("tr", {
    className: "table-tbody-tr-help"
  }, renderEditSchemaField("title")), /*#__PURE__*/_react.default.createElement("tr", {
    className: "table-tbody-tr-help"
  }, renderEditSchemaField("description")), /*#__PURE__*/_react.default.createElement("tr", null, renderEditSchemaField("type")), /*#__PURE__*/_react.default.createElement("tr", null, renderEditSchemaField("format")), rows.map(function (row) {
    prepareRow(row);
    return /*#__PURE__*/_react.default.createElement("tr", row.getRowProps(), row.cells.map(function (cell) {
      return /*#__PURE__*/_react.default.createElement("td", _extends({}, cell.getCellProps(), {
        className: "table-tbody-td"
      }), cell.render("Cell"));
    }));
  }))))));
};

TableSchema.propTypes = {
  schema: _propTypes.default.object.isRequired,
  data: _propTypes.default.array.isRequired
};
var _default = TableSchema;
exports.default = _default;