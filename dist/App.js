"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResourceEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _Metadata = _interopRequireDefault(require("./components/Metadata"));

var _TableSchema = _interopRequireDefault(require("./components/TableSchema"));

var _Switcher = _interopRequireDefault(require("./components/Switcher"));

require("./App.css");

var _Upload = _interopRequireDefault(require("./components/Upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResourceEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(ResourceEditor, _React$Component);

  var _super = _createSuper(ResourceEditor);

  function ResourceEditor(props) {
    var _this;

    _classCallCheck(this, ResourceEditor);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChangeMetadata", function (event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      var resource = _this.state.resource;

      _this.setState({
        resource: _objectSpread(_objectSpread({}, resource), {}, _defineProperty({}, name, value))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitMetadata", function (event, index) {
      event.preventDefault();
      console.log("Metadata state: ", _this.state.resource);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitSchema", function (schema, index) {
      console.log("Schema state: ", schema);
    });

    _defineProperty(_assertThisInitialized(_this), "switcher", function (name) {
      var ui = _objectSpread({}, _this.state.ui);

      ui.metadataOrSchema = name;

      _this.setState({
        ui: ui
      });
    });

    _this.state = {
      datasetId: _this.props.datasetId,
      resource: _this.props.resource || {},
      ui: {
        fileOrLink: '',
        uploadComplete: undefined,
        success: false,
        error: false,
        loading: false,
        metadataOrSchema: 'metadata'
      }
    };
    _this.metadataHandler = _this.metadataHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResourceEditor, [{
    key: "metadataHandler",
    value: function metadataHandler(resource) {
      this.setState({
        resource: resource
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$ui = this.state.ui,
          loading = _this$state$ui.loading,
          success = _this$state$ui.success,
          metadataOrSchema = _this$state$ui.metadataOrSchema;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "App"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-wrapper"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-header__title"
      }, "Resource Editor")), /*#__PURE__*/_react.default.createElement(_Upload.default, {
        resource: this.state.resource,
        metadataHandler: this.metadataHandler
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-switcher"
      }, /*#__PURE__*/_react.default.createElement(_Switcher.default, {
        metadataOrSchema: metadataOrSchema,
        switcher: this.switcher
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-edit-area"
      }, metadataOrSchema === 'metadata' && /*#__PURE__*/_react.default.createElement(_Metadata.default, {
        loading: loading,
        uploadSuccess: success,
        metadata: this.state.resource,
        handleSubmit: this.handleSubmitMetadata,
        handleChange: this.handleChangeMetadata
      }), metadataOrSchema === 'schema' && /*#__PURE__*/_react.default.createElement(_TableSchema.default, _extends({
        uploadSuccess: success
      }, Mock, {
        handleSubmitSchema: this.handleSubmitSchema
      })))));
    }
  }]);

  return ResourceEditor;
}(_react.default.Component);

exports.ResourceEditor = ResourceEditor;
var Mock = {
  schema: {
    fields: [{
      title: "",
      name: "name",
      type: "string",
      description: "",
      format: ""
    }, {
      title: "",
      name: "age",
      type: "integer",
      description: "",
      format: ""
    }, {
      title: "",
      name: "address",
      type: "string",
      description: "",
      format: ""
    }]
  },
  data: [{
    name: "Eathan Pritchard",
    age: 25,
    address: "1201 Tompkins Dr Madison"
  }, {
    name: "Zidan Berg",
    age: 22,
    address: "1309 Tompkins Dr Madison"
  }, {
    name: "Raisa Kinney",
    age: 32,
    address: "1497 Tompkins Dr Madison"
  }, {
    name: "Cara Woodley",
    age: 30,
    address: "1197  Buckeye Rd  Madison"
  }, {
    name: "Komal Robbins",
    age: 42,
    address: "1192  Buckeye Rd  Madison"
  }, {
    name: "Deacon Childs",
    age: 28,
    address: "1027 Tompkins Dr Madison"
  }, {
    name: "Ayse Shaw",
    age: 21,
    address: "1233 Buckeye Rd Madison"
  }]
};
var _default = ResourceEditor;
exports.default = _default;