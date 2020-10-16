"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResourceEditor = void 0;

var _react = _interopRequireDefault(require("react"));

var _ckanClient = require("ckanClient");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _frictionlessCkanMapperJs = _interopRequireDefault(require("frictionless-ckan-mapper-js"));

var _uuid = require("uuid");

var _Metadata = _interopRequireDefault(require("./components/Metadata"));

var _TableSchema = _interopRequireDefault(require("./components/TableSchema"));

var _Upload = _interopRequireDefault(require("./components/Upload"));

require("./App.css");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
      var resourceCopy = _this.state.resource;
      resourceCopy[name] = value;

      _this.setState({
        resource: resourceCopy
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmitMetadata", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$state, resource, client, isResourceCreate, datasetMetadata, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state = _this.state, resource = _this$state.resource, client = _this$state.client;
              _context.next = 3;
              return _this.createResource(resource);

            case 3:
              // Change state of dataset to active if draft atm
              // this relates to how CKAN v2 has a phased dataset creation. See e.g.
              // https://github.com/ckan/ckan/blob/master/ckan/controllers/package.py#L917
              // only need to do this test if in resource create mode if editing a
              // resource this is unnecessary
              // TODO: update this in future to check for edit mode
              isResourceCreate = true;

              if (!isResourceCreate) {
                _context.next = 13;
                break;
              }

              _context.next = 7;
              return client.action("package_show", {
                id: _this.state.datasetId
              });

            case 7:
              datasetMetadata = _context.sent;
              result = datasetMetadata.result;

              if (!(result.state == "draft")) {
                _context.next = 13;
                break;
              }

              result.state = "active";
              _context.next = 13;
              return client.action("package_update", result);

            case 13:
              return _context.abrupt("return", window.location.href = "/dataset/".concat(_this.state.datasetId));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "createResource", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resource) {
        var client, config, organizationId, datasetId, resourceId, ckanResource, data, bqTableName, ckanResourceCopy;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = _this.state.client;
                config = _this.props.config;
                organizationId = config.organizationId, datasetId = config.datasetId, resourceId = config.resourceId;
                ckanResource = _frictionlessCkanMapperJs.default.resourceFrictionlessToCkan(resource); //create a valid format from sample

                data = _objectSpread({}, ckanResource.sample); //delete sample because is an invalid format

                delete ckanResource.sample; //generate an unique id for bq_table_name property

                bqTableName = ckanResource.bq_table_name ? ckanResource.bq_table_name : (0, _uuid.v4)(); // create a copy from ckanResource to add package_id, name, url, sha256,size, lfs_prefix, url, url_type
                // without this properties ckan-blob-storage doesn't work properly

                ckanResourceCopy = _objectSpread(_objectSpread({}, ckanResource), {}, {
                  package_id: _this.state.datasetId,
                  name: resource.name || resource.title,
                  sha256: resource.hash,
                  size: resource.size,
                  lfs_prefix: "".concat(organizationId, "/").concat(datasetId),
                  url: resource.name,
                  url_type: "upload",
                  bq_table_name: (0, _utils.removeHyphen)(bqTableName),
                  sample: data
                }); //Check if the user is editing resource, call resource_update and redirect to the dataset page

                if (!resourceId) {
                  _context2.next = 13;
                  break;
                }

                ckanResourceCopy = _objectSpread(_objectSpread({}, ckanResourceCopy), {}, {
                  id: resourceId
                });
                _context2.next = 12;
                return client.action("resource_update", ckanResourceCopy);

              case 12:
                return _context2.abrupt("return", window.location.href = "/dataset/".concat(datasetId));

              case 13:
                _context2.next = 15;
                return client.action("resource_create", ckanResourceCopy).then(function (response) {
                  _this.onChangeResourceId(response.result.id);
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "deleteResource", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this$state2, resource, client, datasetId;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$state2 = _this.state, resource = _this$state2.resource, client = _this$state2.client, datasetId = _this$state2.datasetId;

              if (!window.confirm("Are you sure to delete this resource?")) {
                _context3.next = 5;
                break;
              }

              _context3.next = 4;
              return client.action("resource_delete", {
                id: resource.id
              });

            case 4:
              return _context3.abrupt("return", window.location.href = "/dataset/".concat(datasetId));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleUploadStatus", function (status) {
      var ui = _this.state.ui;

      var newUiState = _objectSpread(_objectSpread({}, ui), {}, {
        success: status.success,
        error: status.error,
        loading: status.loading
      });

      _this.setState({
        ui: newUiState
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeResourceId", function (resourceId) {
      _this.setState({
        resourceId: resourceId
      });
    });

    _this.state = {
      datasetId: _this.props.config.datasetId,
      resourceId: "",
      resource: _this.props.resource || {},
      ui: {
        fileOrLink: "",
        uploadComplete: undefined,
        success: false,
        error: false,
        loading: false
      },
      client: null,
      isResourceEdit: false
    };
    _this.metadataHandler = _this.metadataHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ResourceEditor, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var config, authToken, api, lfs, organizationId, datasetId, resourceId, client, resource, resourceSchema, resourceSample, resourceCopy, sampleCopy, property;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                config = this.props.config;
                authToken = config.authToken, api = config.api, lfs = config.lfs, organizationId = config.organizationId, datasetId = config.datasetId, resourceId = config.resourceId;
                client = new _ckanClient.Client("".concat(authToken), "".concat(organizationId), "".concat(datasetId), "".concat(api), "".concat(lfs)); //Check if the user is editing resource

                if (!resourceId) {
                  _context4.next = 17;
                  break;
                }

                _context4.next = 6;
                return client.action("resource_show", {
                  id: resourceId
                });

              case 6:
                resource = _context4.sent;
                _context4.next = 9;
                return client.action("resource_schema_show", {
                  id: resourceId
                });

              case 9:
                resourceSchema = _context4.sent;
                _context4.next = 12;
                return client.action("resource_sample_show", {
                  id: resourceId
                });

              case 12:
                resourceSample = _context4.sent;
                resourceCopy = resource.result;
                sampleCopy = [];

                try {
                  // push the values to an array
                  for (property in resourceSample.result) {
                    sampleCopy.push(resourceSample.result[property]);
                  } // push sample as an array to be able to render in tableschema component


                  resourceCopy.sample = sampleCopy;
                  resourceCopy.schema = resourceSchema.result;
                } catch (e) {
                  console.error(e); //generate empty values not to break the tableschema component

                  resourceCopy.schema = {
                    fields: []
                  };
                  resourceCopy.sample = [];
                }

                return _context4.abrupt("return", this.setState({
                  client: client,
                  resourceId: resourceId,
                  resource: resourceCopy,
                  isResourceEdit: true
                }));

              case 17:
                this.setState({
                  client: client
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "metadataHandler",
    value: function metadataHandler(resource) {
      this.setState({
        resource: resource
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state$ui = this.state.ui,
          loading = _this$state$ui.loading,
          success = _this$state$ui.success;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "App"
      }, /*#__PURE__*/_react.default.createElement("form", {
        className: "upload-wrapper",
        onSubmit: function onSubmit(event) {
          event.preventDefault();

          if (_this2.state.isResourceEdit) {
            return _this2.createResource(_this2.state.resource);
          }

          return _this2.handleSubmitMetadata();
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-header"
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "upload-header__title"
      }, "Resource Editor")), /*#__PURE__*/_react.default.createElement(_Upload.default, {
        client: this.state.client,
        resource: this.state.resource,
        metadataHandler: this.metadataHandler,
        datasetId: this.state.datasetId,
        handleUploadStatus: this.handleUploadStatus,
        onChangeResourceId: this.onChangeResourceId
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "upload-edit-area"
      }, /*#__PURE__*/_react.default.createElement(_Metadata.default, {
        metadata: this.state.resource,
        handleChange: this.handleChangeMetadata
      }), this.state.resource.schema && /*#__PURE__*/_react.default.createElement(_TableSchema.default, {
        schema: this.state.resource.schema,
        data: this.state.resource.sample || []
      }), !this.state.isResourceEdit ? /*#__PURE__*/_react.default.createElement("button", {
        disabled: !success,
        className: "btn"
      }, "Save and Publish") : /*#__PURE__*/_react.default.createElement("div", {
        className: "resource-edit-actions"
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "btn btn-delete",
        onClick: this.deleteResource
      }, "Delete"), /*#__PURE__*/_react.default.createElement("button", {
        className: "btn"
      }, "Update")))));
    }
  }]);

  return ResourceEditor;
}(_react.default.Component);
/**
 * If the parent component doesn't specify a `config` and scope prop, then
 * the default values will be used.
 * */


exports.ResourceEditor = ResourceEditor;
ResourceEditor.defaultProps = {
  config: {
    authToken: "be270cae-1c77-4853-b8c1-30b6cf5e9878",
    api: "http://localhost:5000",
    lfs: "http://localhost:5001",
    // Feel free to modify this
    organizationId: "myorg",
    datasetId: "data-test-2"
  }
};
ResourceEditor.propTypes = {
  config: _propTypes.default.object.isRequired
};
var _default = ResourceEditor;
exports.default = _default;