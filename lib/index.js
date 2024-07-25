"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUrlHash = parseUrlHash;
exports.getNeuroglancerViewerState = getNeuroglancerViewerState;
exports.getNeuroglancerColor = getNeuroglancerColor;
exports.closeSelectionTab = closeSelectionTab;
exports.getLayerManager = getLayerManager;
exports.getManagedLayer = getManagedLayer;
exports.getAnnotationLayer = getAnnotationLayer;
exports.getAnnotationSource = getAnnotationSource;
exports.addLayerSignalRemover = addLayerSignalRemover;
exports.unsubscribeLayersChangedSignals = unsubscribeLayersChangedSignals;
exports.configureLayersChangedSignals = configureLayersChangedSignals;
exports.configureAnnotationLayer = configureAnnotationLayer;
exports.configureAnnotationLayerChanged = configureAnnotationLayerChanged;
exports.getAnnotationSelectionHost = getAnnotationSelectionHost;
exports.getSelectedAnnotationId = getSelectedAnnotationId;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _annotation = require("neuroglancer/lib/layer/annotation");

var _frontend = require("neuroglancer/lib/segmentation_display_state/frontend");

var _segmentation = require("neuroglancer/lib/layer/segmentation");

var _color = require("neuroglancer/lib/util/color");

var _main_module = require("neuroglancer/lib/main_module");

var _uint = require("neuroglancer/lib/util/uint64");

var _json = require("neuroglancer/lib/util/json");

var _url_hash_binding = require("neuroglancer/lib/ui/url_hash_binding");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var viewersKeyed = {};
var viewerNoKey; // Adopted from neuroglancer/ui/url_hash_binding.ts

function parseUrlHash(url) {
  var state = null;
  var s = url.replace(/^[^#]+/, '');

  if (s === '' || s === '#' || s === '#!') {
    s = '#!{}';
  }

  if (s.startsWith('#!+')) {
    s = s.slice(3); // Firefox always %-encodes the URL even if it is not typed that way.

    s = decodeURIComponent(s);
    state = (0, _json.urlSafeParse)(s);
  } else if (s.startsWith('#!')) {
    s = s.slice(2);
    s = decodeURIComponent(s);
    state = (0, _json.urlSafeParse)(s);
  } else {
    throw new Error("URL hash is expected to be of the form \"#!{...}\" or \"#!+{...}\".");
  }

  return state;
}

function getNeuroglancerViewerState(key) {
  var v = key ? viewersKeyed[key] : viewerNoKey;
  return v ? v.state.toJSON() : {};
}

function getNeuroglancerColor(idStr, key) {
  try {
    var id = _uint.Uint64.parseString(idStr);

    var v = key ? viewersKeyed[key] : viewerNoKey;

    if (v) {
      // eslint-disable-next-line no-restricted-syntax
      var _iterator = _createForOfIteratorHelper(v.layerManager.managedLayers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var layer = _step.value;

          if (layer.layer instanceof _segmentation.SegmentationUserLayer) {
            var displayState = layer.layer.displayState;
            var colorVec = (0, _frontend.getObjectColor)(displayState, id); // To get the true color, undo how getObjectColor() indicates hovering.

            if (displayState.segmentSelectionState.isSelected(id)) {
              for (var i = 0; i < 3; i += 1) {
                colorVec[i] = (colorVec[i] - 0.5) / 0.5;
              }
            }

            var colorStr = (0, _color.serializeColor)(colorVec);
            return colorStr;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  } catch (_unused) {// suppress eslint no-empty
  }

  return '';
}

function closeSelectionTab(key) {
  var v = key ? viewersKeyed[key] : viewerNoKey;

  if (v && v.closeSelectionTab) {
    v.closeSelectionTab();
  }
}

function getLayerManager(key) {
  var v = key ? viewersKeyed[key] : viewerNoKey;

  if (v) {
    return v.layerManager;
  }

  return undefined;
}

function getManagedLayer(key, name) {
  var layerManager = getLayerManager(key);

  if (layerManager) {
    return layerManager.managedLayers.filter(function (layer) {
      return layer.name === name;
    })[0];
  }

  return undefined;
}

function getAnnotationLayer(key, name) {
  var layer = getManagedLayer(key, name);

  if (layer && layer.layer instanceof _annotation.AnnotationUserLayer) {
    return layer.layer;
  }

  return undefined;
}

function getAnnotationSource(key, name) {
  var layer = getAnnotationLayer(key, name);
  /* eslint-disable-next-line no-underscore-dangle */

  if (layer && layer.dataSources && layer.dataSources[0].loadState_) {
    /* eslint-disable-next-line no-underscore-dangle */
    var dataSource = layer.dataSources[0].loadState_.dataSource;

    if (dataSource) {
      return dataSource.subsources[0].subsource.annotation;
    }
  }

  return undefined;
}

function addLayerSignalRemover(key, name, remover) {
  var layerManager = getLayerManager(key);

  if (layerManager && name && remover) {
    if (!layerManager.customSignalHandlerRemovers) {
      layerManager.customSignalHandlerRemovers = {};
    }

    if (!layerManager.customSignalHandlerRemovers[name]) {
      layerManager.customSignalHandlerRemovers[name] = [];
    }

    layerManager.customSignalHandlerRemovers[name].push(remover);
  }
}

function unsubscribeLayersChangedSignals(layerManager, signalKey) {
  if (layerManager) {
    if (layerManager.customSignalHandlerRemovers) {
      if (layerManager.customSignalHandlerRemovers[signalKey]) {
        layerManager.customSignalHandlerRemovers[signalKey].forEach(function (remover) {
          remover();
        });
        delete layerManager.customSignalHandlerRemovers[signalKey];
      }
    }
  }
}

function configureLayersChangedSignals(key, layerConfig) {
  var layerManager = getLayerManager(key);

  if (layerManager) {
    var layerName = layerConfig.layerName;
    unsubscribeLayersChangedSignals(layerManager, layerName);

    if (layerConfig.process) {
      var recordRemover = function recordRemover(remover) {
        return addLayerSignalRemover(undefined, layerName, remover);
      };

      recordRemover(layerManager.layersChanged.add(function () {
        var layer = getManagedLayer(undefined, layerName);

        if (layer) {
          layerConfig.process(layer);
        }
      }));
      var layer = getManagedLayer(undefined, layerName);

      if (layer) {
        layerConfig.process(layer);
      }

      return function () {
        if (layerConfig.cancel) {
          layerConfig.cancel();
        }

        unsubscribeLayersChangedSignals(layerManager, layerName);
      };
    }
  }

  return layerConfig.cancel;
}

function configureAnnotationSource(source, props, recordRemover) {
  if (source && !source.signalReady) {
    if (props.onAnnotationAdded) {
      recordRemover(source.childAdded.add(function (annotation) {
        props.onAnnotationAdded(annotation);
      }));
    }

    if (props.onAnnotationDeleted) {
      recordRemover(source.childDeleted.add(function (id) {
        props.onAnnotationDeleted(id);
      }));
    }

    if (props.onAnnotationUpdated) {
      recordRemover(source.childUpdated.add(function (annotation) {
        props.onAnnotationUpdated(annotation);
      }));
    }

    if (props.onAnnotationChanged && source.referencesChanged) {
      recordRemover(source.referencesChanged.add(props.onAnnotationChanged));
    }

    source.signalReady = true;
    recordRemover(function () {
      source.signalReady = false;
    });
  }
}

function getLoadedDataSource(layer) {
  /* eslint-disable-next-line no-underscore-dangle */
  if (layer.dataSources && layer.dataSources.length > 0 && layer.dataSources[0].loadState_ && layer.dataSources[0].loadState_.dataSource) {
    /* eslint-disable-next-line no-underscore-dangle */
    return layer.dataSources[0].loadState_.dataSource;
  }
}

function getAnnotationSourceFromLayer(layer) {
  var dataSource = getLoadedDataSource(layer);

  if (dataSource) {
    return dataSource.subsources[0].subsource.annotation;
  }
}

function configureAnnotationSourceChange(annotationLayer, props, recordRemover) {
  var configure = function configure() {
    var source = getAnnotationSourceFromLayer(annotationLayer);

    if (source) {
      configureAnnotationSource(source, props, recordRemover);
    }
  };

  var sourceChanged = annotationLayer.dataSourcesChanged;

  if (sourceChanged && !sourceChanged.signalReady) {
    recordRemover(sourceChanged.add(configure));
    sourceChanged.signalReady = true;
    recordRemover(function () {
      sourceChanged.signalReady = false;
    });
    configure();
  }
}

function configureAnnotationLayer(layer, props, recordRemover) {
  if (layer) {
    layer.expectingExternalTable = true;

    if (layer.selectedAnnotation && !layer.selectedAnnotation.changed.signalReady) {
      if (props.onAnnotationSelectionChanged) {
        recordRemover(layer.selectedAnnotation.changed.add(function () {
          props.onAnnotationSelectionChanged(layer.selectedAnnotation.value);
        }));
        recordRemover(function () {
          layer.selectedAnnotation.changed.signalReady = false;
        });
        layer.selectedAnnotation.changed.signalReady = true;
      }
    }

    configureAnnotationSourceChange(layer, props, recordRemover);
  }
}

function configureAnnotationLayerChanged(layer, props, recordRemover) {
  if (!layer.layerChanged.signalReady) {
    var remover = layer.layerChanged.add(function () {
      configureAnnotationLayer(layer.layer, props, recordRemover);
    });
    layer.layerChanged.signalReady = true;
    recordRemover(remover);
    recordRemover(function () {
      layer.layerChanged.signalReady = false;
    });
    configureAnnotationLayer(layer.layer, props, recordRemover);
  }
}

function getAnnotationSelectionHost(key) {
  var viewer = key ? viewersKeyed[key] : viewerNoKey;

  if (viewer) {
    if (viewer.selectionDetailsState) {
      return 'viewer';
    }

    return 'layer';
  }

  return null;
}

function getSelectedAnnotationId(key, layerName) {
  var viewer = key ? viewersKeyed[key] : viewerNoKey;

  if (viewer) {
    if (viewer.selectionDetailsState) {
      // New neurolgancer version
      // v.selectionDetailsState.value.layers[0].layer.managedLayer.name
      if (viewer.selectionDetailsState.value) {
        var layers = viewer.selectionDetailsState.value.layers;

        if (layers) {
          var layer = layers.find(function (_layer) {
            return _layer.layer.managedLayer.name === layerName;
          });

          if (layer && layer.state) {
            return layer.state.annotationId;
          }
        }
      }
    } else {
      var _layer2 = getAnnotationLayer(undefined, layerName);

      if (_layer2 && _layer2.selectedAnnotation && _layer2.selectedAnnotation.value) {
        return _layer2.selectedAnnotation.value.id;
      }
    }
  }

  return null;
}

var Neuroglancer = /*#__PURE__*/function (_React$Component) {
  _inherits(Neuroglancer, _React$Component);

  var _super = _createSuper(Neuroglancer);

  function Neuroglancer(props) {
    var _this;

    _classCallCheck(this, Neuroglancer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateEventBindings", function (eventBindingsToUpdate) {
      var root = _this.viewer.inputEventBindings;

      var traverse = function traverse(current) {
        var replace = function replace(eaMap, event0, event1) {
          var action = eaMap.get(event0);

          if (action) {
            eaMap["delete"](event0);

            if (event1) {
              eaMap.set(event1, action);
            }
          }
        };

        var eventActionMap = current.bindings;
        eventBindingsToUpdate.forEach(function (oldNewBinding) {
          var eventOldBase = Array.isArray(oldNewBinding) ? oldNewBinding[0] : oldNewBinding;
          var eventOldA = "at:".concat(eventOldBase);
          var eventNewA = oldNewBinding[1] ? "at:".concat(oldNewBinding[1]) : undefined;
          replace(eventActionMap, eventOldA, eventNewA);
          var eventOldB = "bubble:".concat(eventOldBase);
          var eventNewB = oldNewBinding[1] ? "bubble:".concat(oldNewBinding[1]) : undefined;
          replace(eventActionMap, eventOldB, eventNewB);
        });
        current.parents.forEach(function (parent) {
          traverse(parent);
        });
      };

      traverse(root.global);
      traverse(root.perspectiveView);
      traverse(root.sliceView);
    });

    _defineProperty(_assertThisInitialized(_this), "selectionDetailsStateChanged", function () {
      if (_this.viewer) {
        var onSelectionDetailsStateChanged = _this.props.onSelectionDetailsStateChanged;

        if (onSelectionDetailsStateChanged) {
          onSelectionDetailsStateChanged();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "layersChanged", function () {
      if (_this.handlerRemovers) {
        // If change handlers have been added already, call the function to remove each one,
        // so there won't be duplicates when new handlers are added below.
        _this.handlerRemovers.forEach(function (remover) {
          return remover();
        });
      }

      if (_this.viewer) {
        var _this$props = _this.props,
            onSelectedChanged = _this$props.onSelectedChanged,
            onVisibleChanged = _this$props.onVisibleChanged;

        if (onSelectedChanged || onVisibleChanged) {
          _this.handlerRemovers = []; // eslint-disable-next-line no-restricted-syntax

          var _iterator2 = _createForOfIteratorHelper(_this.viewer.layerManager.managedLayers),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var layer = _step2.value;

              if (layer.layer instanceof _segmentation.SegmentationUserLayer) {
                var segmentSelectionState = layer.layer.displayState.segmentSelectionState;
                var visibleSegments = layer.layer.displayState.segmentationGroupState.value.visibleSegments;

                if (segmentSelectionState && onSelectedChanged) {
                  // Bind the layer so it will be an argument to the handler when called.
                  var selectedChanged = _this.selectedChanged.bind(undefined, layer);

                  var remover = segmentSelectionState.changed.add(selectedChanged);

                  _this.handlerRemovers.push(remover);

                  layer.registerDisposer(remover);
                }

                if (visibleSegments && onVisibleChanged) {
                  var visibleChanged = _this.visibleChanged.bind(undefined, layer);

                  var _remover = visibleSegments.changed.add(visibleChanged);

                  _this.handlerRemovers.push(_remover);

                  layer.registerDisposer(_remover);
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectedChanged", function (layer) {
      if (_this.viewer) {
        var onSelectedChanged = _this.props.onSelectedChanged;

        if (onSelectedChanged) {
          var segmentSelectionState = layer.layer.displayState.segmentSelectionState;

          if (segmentSelectionState) {
            var segment = segmentSelectionState.hasSelectedSegment ? segmentSelectionState.selectedSegment : null;
            onSelectedChanged(segment, layer);
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "visibleChanged", function (layer) {
      if (_this.viewer) {
        var onVisibleChanged = _this.props.onVisibleChanged;

        if (onVisibleChanged) {
          var visibleSegments = layer.layer.displayState.segmentationGroupState.value.visibleSegments;

          if (visibleSegments) {
            onVisibleChanged(visibleSegments, layer);
          }
        }
      }
    });

    _this.ngContainer = /*#__PURE__*/_react["default"].createRef();
    _this.viewer = null;
    return _this;
  }

  _createClass(Neuroglancer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          perspectiveZoom = _this$props2.perspectiveZoom,
          viewerState = _this$props2.viewerState,
          brainMapsClientId = _this$props2.brainMapsClientId,
          eventBindingsToUpdate = _this$props2.eventBindingsToUpdate,
          onViewerStateChanged = _this$props2.onViewerStateChanged,
          callbacks = _this$props2.callbacks,
          ngServer = _this$props2.ngServer,
          key = _this$props2.key;
      this.viewer = (0, _main_module.setupDefaultViewer)({
        brainMapsClientId: brainMapsClientId,
        target: this.ngContainer.current,
        bundleRoot: "/"
      });
      this.setCallbacks(callbacks);

      if (eventBindingsToUpdate) {
        this.updateEventBindings(eventBindingsToUpdate);
      }

      this.viewer.expectingExternalUI = true;

      if (ngServer) {
        this.viewer.makeUrlFromState = function (state) {
          var newState = _objectSpread({}, state);

          if (state.layers) {
            // Do not include clio annotation layers
            newState.layers = state.layers.filter(function (layer) {
              if (layer.source) {
                var sourceUrl = layer.source.url || layer.source;

                if (typeof sourceUrl === 'string') {
                  return !sourceUrl.startsWith('clio://');
                }
              }

              return true;
            });
          }

          return "".concat(ngServer, "/#!").concat((0, _url_hash_binding.encodeFragment)(JSON.stringify(newState)));
        };
      }

      if (this.viewer.selectionDetailsState) {
        this.viewer.selectionDetailsState.changed.add(this.selectionDetailsStateChanged);
      }

      this.viewer.layerManager.layersChanged.add(this.layersChanged);

      if (viewerState) {
        var newViewerState = viewerState;

        if (newViewerState.projectionScale === null) {
          delete newViewerState.projectionScale;
        }

        if (newViewerState.crossSectionScale === null) {
          delete newViewerState.crossSectionScale;
        }

        if (newViewerState.projectionOrientation === null) {
          delete newViewerState.projectionOrientation;
        }

        if (newViewerState.crossSectionOrientation === null) {
          delete newViewerState.crossSectionOrientation;
        }

        this.viewer.state.restoreState(newViewerState);
      } else {
        this.viewer.state.restoreState({
          layers: {
            grayscale: {
              type: "image",
              source: "dvid://https://flyem.dvid.io/ab6e610d4fe140aba0e030645a1d7229/grayscalejpeg"
            },
            segmentation: {
              type: "segmentation",
              source: "dvid://https://flyem.dvid.io/d925633ed0974da78e2bb5cf38d01f4d/segmentation"
            }
          },
          perspectiveZoom: perspectiveZoom,
          navigation: {
            zoomFactor: 8
          }
        });
      }

      this.viewer.state.changed.add(function () {
        if (onViewerStateChanged) {
          try {
            if (_this2.viewer.state.viewer.position) {
              onViewerStateChanged(_this2.viewer.state.toJSON());
            }
          } catch (error) {
            console.debug(error);
          }
        }
      }); // Make the Neuroglancer viewer accessible from getNeuroglancerViewerState().
      // That function can be used to synchronize an external Redux store with any
      // state changes made internally by the viewer.

      if (key) {
        viewersKeyed[key] = this.viewer;
      } else {
        viewerNoKey = this.viewer;
      } // TODO: This is purely for debugging and we need to remove it.


      window.viewer = this.viewer;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      // The restoreState() call clears the "selected" (hovered on) segment, which is needed
      // by Neuroglancer's code to toggle segment visibilty on a mouse click.  To free the user
      // from having to move the mouse before clicking, save the selected segment and restore
      // it after restoreState().
      var selectedSegments = {}; // eslint-disable-next-line no-restricted-syntax

      var _iterator3 = _createForOfIteratorHelper(this.viewer.layerManager.managedLayers),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var layer = _step3.value;

          if (layer.layer instanceof _segmentation.SegmentationUserLayer) {
            var segmentSelectionState = layer.layer.displayState.segmentSelectionState;
            selectedSegments[layer.name] = segmentSelectionState.selectedSegment;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var viewerState = this.props.viewerState;

      if (viewerState) {
        var newViewerState = _objectSpread({}, viewerState);

        var restoreStates = [function () {
          _this3.viewer.state.restoreState(newViewerState);
        }];

        if (viewerState.projectionScale === null) {
          delete newViewerState.projectionScale;
          restoreStates.push(function () {
            _this3.viewer.projectionScale.reset();
          });
        }

        if (viewerState.crossSectionScale === null) {
          delete newViewerState.crossSectionScale;
        }

        restoreStates.forEach(function (restore) {
          return restore();
        });
      } // eslint-disable-next-line no-restricted-syntax


      var _iterator4 = _createForOfIteratorHelper(this.viewer.layerManager.managedLayers),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _layer3 = _step4.value;

          if (_layer3.layer instanceof _segmentation.SegmentationUserLayer) {
            var _segmentSelectionState = _layer3.layer.displayState.segmentSelectionState;

            _segmentSelectionState.set(selectedSegments[_layer3.name]);
          }
        } // For some reason setting position to an empty array doesn't reset
        // the position in the viewer. This should handle those cases by looking
        // for the empty position array and calling the position reset function if
        // found.

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if ('position' in viewerState) {
        if (Array.isArray(viewerState.position)) {
          if (viewerState.position.length === 0) {
            this.viewer.position.reset();
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var key = this.props.key;

      if (key) {
        delete viewersKeyed[key];
      } else {
        viewerNoKey = undefined;
      }
    }
    /* setCallbacks allows us to set a callback on a neuroglancer event
     * each callback created should be in the format:
     * [
     *   {
     *     name: 'unique-name',
     *     event: 'the neuroglancer event to target, eg: click0, keyt',
     *     function: (slice) => { slice.whatever }
     *   },
     *   {...}
     * ]
     *
     */

  }, {
    key: "setCallbacks",
    value: function setCallbacks(callbacks) {
      var _this4 = this;

      callbacks.forEach(function (callback) {
        _this4.viewer.bindCallback(callback.name, callback["function"]);

        _this4.viewer.inputEventBindings.sliceView.set(callback.event, callback.name);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var perspectiveZoom = this.props.perspectiveZoom;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "neuroglancer-container",
        ref: this.ngContainer
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Neuroglancer here with zoom ", perspectiveZoom));
    }
  }]);

  return Neuroglancer;
}(_react["default"].Component);

exports["default"] = Neuroglancer;
Neuroglancer.propTypes = {
  perspectiveZoom: _propTypes["default"].number,
  viewerState: _propTypes["default"].object,
  brainMapsClientId: _propTypes["default"].string,
  key: _propTypes["default"].string,

  /**
   * An array of event bindings to change in Neuroglancer.  The array format is as follows:
   * [[old-event1, new-event1], [old-event2], old-event3]
   * Here, `old-event1`'s will be unbound and its action will be re-bound to `new-event1`.
   * The bindings for `old-event2` and `old-event3` will be removed.
   * Neuroglancer has its own syntax for event descriptors, and here are some examples:
   * 'keya', 'shift+keyb' 'control+keyc', 'digit4', 'space', 'arrowleft', 'comma', 'period',
   * 'minus', 'equal', 'bracketleft'.
   */
  eventBindingsToUpdate: _propTypes["default"].array,

  /**
   * A function of the form `(segment, layer) => {}`, called each time there is a change to
   * the segment the user has "selected" (i.e., hovered over) in Neuroglancer.
   * The `segment` argument will be a Neuroglancer `Uint64` with the ID of the now-selected
   * segment, or `null` if no segment is now selected.
   * The `layer` argument will be a Neuroglaner `ManagedUserLayer`, whose `layer` property
   * will be a Neuroglancer `SegmentationUserLayer`.
   */
  onSelectedChanged: _propTypes["default"].func,

  /**
   * A function of the form `(segments, layer) => {}`, called each time there is a change to
   * the segments the user has designated as "visible" (i.e., double-clicked on) in Neuroglancer.
   * The `segments` argument will be a Neuroglancer `Uint64Set` whose elements are `Uint64`
   * instances for the IDs of the now-visible segments.
   * The `layer` argument will be a Neuroglaner `ManagedUserLayer`, whose `layer` property
   * will be a Neuroglancer `SegmentationUserLayer`.
   */
  onVisibleChanged: _propTypes["default"].func,

  /**
   * A function of the form `() => {}` to respond to selection changes in the viewer.
   */
  onSelectionDetailsStateChanged: _propTypes["default"].func,
  callbacks: _propTypes["default"].arrayOf(_propTypes["default"].object),
  ngServer: _propTypes["default"].string
};
Neuroglancer.defaultProps = {
  perspectiveZoom: 20,
  eventBindingsToUpdate: null,
  brainMapsClientId: null,
  viewerState: null,
  onSelectedChanged: null,
  onVisibleChanged: null,
  onSelectionDetailsStateChanged: null,
  key: null,
  callbacks: [],
  ngServer: null
};