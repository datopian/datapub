"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ckan3JsSdk = require("ckan3-js-sdk");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ProgressBar = _interopRequireDefault(require("../ProgressBar"));

var _utils = require("../../utils");

var _Choose = _interopRequireDefault(require("../Choose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var Upload = /*#__PURE__*/function (_React$Component) {
  _inherits(Upload, _React$Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this;

    _classCallCheck(this, Upload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChangeHandler", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var _this$state, formattedSize, selectedFile, file, hash;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, formattedSize = _this$state.formattedSize, selectedFile = _this$state.selectedFile;

                if (!(event.target.files.length > 0)) {
                  _context.next = 9;
                  break;
                }

                selectedFile = event.target.files[0];
                formattedSize = (0, _utils.onFormatBytes)(selectedFile.size);
                file = new _ckan3JsSdk.FileAPI.HTML5File(selectedFile);
                _context.next = 7;
                return file.sha256();

              case 7:
                hash = _context.sent;

                _this.props.metadataHandler({
                  name: (0, _utils.onFormatName)(selectedFile.name),
                  path: selectedFile.name,
                  title: (0, _utils.onFormatTitle)(selectedFile.name),
                  format: (0, _utils.getFileExtension)(selectedFile.name),
                  bytes: selectedFile.size,
                  mediatype: selectedFile.type,
                  hash: "SHA256:".concat(hash)
                });

              case 9:
                _this.setState({
                  selectedFile: selectedFile,
                  loaded: 0,
                  success: false,
                  error: false,
                  formattedSize: formattedSize
                });

                _this.onClickHandler();

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "onUploadProgress", function (progressEvent) {
      _this.onTimeRemaining(progressEvent.loaded);

      _this.setState({
        loaded: progressEvent.loaded / progressEvent.total * 100
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeRemaining", function (progressLoaded) {
      var end = new Date().getTime();
      var duration = (end - _this.state.start) / 1000;
      var bps = progressLoaded / duration;
      var kbps = bps / 1024;
      var timeRemaining = (_this.state.fileSize - progressLoaded) / kbps;

      _this.setState({
        timeRemaining: timeRemaining / 1000
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var start, selectedFile, _this$props, scopes, config, authzUrl, authToken, api, organizationId, datasetId, file, uploader;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              start = new Date().getTime();
              selectedFile = _this.state.selectedFile;
              _this$props = _this.props, scopes = _this$props.scopes, config = _this$props.config, authzUrl = _this$props.authzUrl;
              authToken = config.authToken, api = config.api, organizationId = config.organizationId, datasetId = config.datasetId; // create an instance of a object

              file = new _ckan3JsSdk.FileAPI.HTML5File(selectedFile);
              uploader = new _ckan3JsSdk.Uploader("".concat(authToken), "".concat(organizationId), "".concat(datasetId), "".concat(api));

              _this.setState({
                fileSize: file.size(),
                start: start,
                loading: true
              }); // Get the JWT token from authz and upload file to the storage


              fetch("".concat(authzUrl), {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authToken
                },
                body: JSON.stringify(scopes)
              }).then(function (response) {
                return response.json();
              }).then(function (response) {
                return uploader.push(file, response.result.token, _this.onUploadProgress);
              }).then(function (response) {
                return _this.setState({
                  success: response.success,
                  loading: false
                });
              }).catch(function (error) {
                return _this.setState({
                  error: true,
                  loading: false
                });
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
      selectedFile: null,
      fileSize: 0,
      formattedSize: "0 KB",
      start: "",
      loaded: 0,
      success: false,
      error: false,
      loading: false,
      timeRemaining: 0
    };
    return _this;
  }

  _createClass(Upload, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          success = _this$state2.success,
          error = _this$state2.error,
          timeRemaining = _this$state2.timeRemaining,
          selectedFile = _this$state2.selectedFile,
          formattedSize = _this$state2.formattedSize,
          loading = _this$state2.loading;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-area"
      }, /*#__PURE__*/_react.default.createElement(_Choose.default, {
        onChangeHandler: this.onChangeHandler,
        onChangeUrl: function onChangeUrl(event) {
          return console.log("Get url:", event.target.value);
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-area__info"
      }, selectedFile && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("ul", {
        className: "upload-list"
      }, /*#__PURE__*/_react.default.createElement("li", {
        className: "list-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-list-item"
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-name"
      }, selectedFile.name), /*#__PURE__*/_react.default.createElement("p", {
        className: "upload-file-size"
      }, formattedSize)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
        progress: Math.round(this.state.loaded),
        size: 50,
        strokeWidth: 5,
        circleOneStroke: "#d9edfe",
        circleTwoStroke: "#7ea9e1",
        timeRemaining: timeRemaining
      }))))), /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-message"
      }, success && "File upload success"), /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-message"
      }, error && "Upload failed"))));
    }
  }]);

  return Upload;
}(_react.default.Component);
/**
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */


Upload.defaultProps = {
  config: {
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:9419",
    organizationId: "myorg",
    datasetId: "data-test-2"
  },
  scopes: {
    scopes: ["obj:myorg/data-test-2/*:read,write"]
  },
  authzUrl: "http://localhost:5000/api/action/authz_authorize"
};
Upload.propTypes = {
  config: _propTypes.default.object.isRequired,
  scopes: _propTypes.default.object.isRequired,
  authzUrl: _propTypes.default.string.isRequired
};
var _default = Upload;
exports.default = _default;