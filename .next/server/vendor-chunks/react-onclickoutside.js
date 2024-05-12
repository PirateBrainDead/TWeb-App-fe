"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-onclickoutside";
exports.ids = ["vendor-chunks/react-onclickoutside"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   IGNORE_CLASS_NAME: () => (/* binding */ IGNORE_CLASS_NAME),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-dom.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _inheritsLoose(subClass, superClass) {\n  subClass.prototype = Object.create(superClass.prototype);\n  subClass.prototype.constructor = subClass;\n\n  _setPrototypeOf(subClass, superClass);\n}\n\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nfunction _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}/**\n * Check whether some DOM node is our Component's node.\n */\nfunction isNodeFound(current, componentNode, ignoreClass) {\n  if (current === componentNode) {\n    return true;\n  } // SVG <use/> elements do not technically reside in the rendered DOM, so\n  // they do not have classList directly, but they offer a link to their\n  // corresponding element, which can have classList. This extra check is for\n  // that case.\n  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement\n  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17\n\n\n  if (current.correspondingElement) {\n    return current.correspondingElement.classList.contains(ignoreClass);\n  }\n\n  return current.classList.contains(ignoreClass);\n}\n/**\n * Try to find our node in a hierarchy of nodes, returning the document\n * node as highest node if our node is not found in the path up.\n */\n\nfunction findHighest(current, componentNode, ignoreClass) {\n  if (current === componentNode) {\n    return true;\n  } // If source=local then this event came from 'somewhere'\n  // inside and should be ignored. We could handle this with\n  // a layered approach, too, but that requires going back to\n  // thinking in terms of Dom node nesting, running counter\n  // to React's 'you shouldn't care about the DOM' philosophy.\n  // Also cover shadowRoot node by checking current.host\n\n\n  while (current.parentNode || current.host) {\n    // Only check normal node without shadowRoot\n    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {\n      return true;\n    }\n\n    current = current.parentNode || current.host;\n  }\n\n  return current;\n}\n/**\n * Check if the browser scrollbar was clicked\n */\n\nfunction clickedScrollbar(evt) {\n  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;\n}// ideally will get replaced with external dep\n// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in\nvar testPassiveEventSupport = function testPassiveEventSupport() {\n  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {\n    return;\n  }\n\n  var passive = false;\n  var options = Object.defineProperty({}, 'passive', {\n    get: function get() {\n      passive = true;\n    }\n  });\n\n  var noop = function noop() {};\n\n  window.addEventListener('testPassiveEventSupport', noop, options);\n  window.removeEventListener('testPassiveEventSupport', noop, options);\n  return passive;\n};function autoInc(seed) {\n  if (seed === void 0) {\n    seed = 0;\n  }\n\n  return function () {\n    return ++seed;\n  };\n}\n\nvar uid = autoInc();var passiveEventSupport;\nvar handlersMap = {};\nvar enabledInstances = {};\nvar touchEvents = ['touchstart', 'touchmove'];\nvar IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';\n/**\n * Options for addEventHandler and removeEventHandler\n */\n\nfunction getEventHandlerOptions(instance, eventName) {\n  var handlerOptions = {};\n  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;\n\n  if (isTouchEvent && passiveEventSupport) {\n    handlerOptions.passive = !instance.props.preventDefault;\n  }\n\n  return handlerOptions;\n}\n/**\n * This function generates the HOC function that you'll use\n * in order to impart onOutsideClick listening to an\n * arbitrary component. It gets called at the end of the\n * bootstrapping code to yield an instance of the\n * onClickOutsideHOC function defined inside setupHOC().\n */\n\n\nfunction onClickOutsideHOC(WrappedComponent, config) {\n  var _class, _temp;\n\n  var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';\n  return _temp = _class = /*#__PURE__*/function (_Component) {\n    _inheritsLoose(onClickOutside, _Component);\n\n    function onClickOutside(props) {\n      var _this;\n\n      _this = _Component.call(this, props) || this;\n\n      _this.__outsideClickHandler = function (event) {\n        if (typeof _this.__clickOutsideHandlerProp === 'function') {\n          _this.__clickOutsideHandlerProp(event);\n\n          return;\n        }\n\n        var instance = _this.getInstance();\n\n        if (typeof instance.props.handleClickOutside === 'function') {\n          instance.props.handleClickOutside(event);\n          return;\n        }\n\n        if (typeof instance.handleClickOutside === 'function') {\n          instance.handleClickOutside(event);\n          return;\n        }\n\n        throw new Error(\"WrappedComponent: \" + componentName + \" lacks a handleClickOutside(event) function for processing outside click events.\");\n      };\n\n      _this.__getComponentNode = function () {\n        var instance = _this.getInstance();\n\n        if (config && typeof config.setClickOutsideRef === 'function') {\n          return config.setClickOutsideRef()(instance);\n        }\n\n        if (typeof instance.setClickOutsideRef === 'function') {\n          return instance.setClickOutsideRef();\n        }\n\n        return (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.findDOMNode)(instance);\n      };\n\n      _this.enableOnClickOutside = function () {\n        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {\n          return;\n        }\n\n        if (typeof passiveEventSupport === 'undefined') {\n          passiveEventSupport = testPassiveEventSupport();\n        }\n\n        enabledInstances[_this._uid] = true;\n        var events = _this.props.eventTypes;\n\n        if (!events.forEach) {\n          events = [events];\n        }\n\n        handlersMap[_this._uid] = function (event) {\n          if (_this.componentNode === null) return;\n\n          if (_this.props.preventDefault) {\n            event.preventDefault();\n          }\n\n          if (_this.props.stopPropagation) {\n            event.stopPropagation();\n          }\n\n          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;\n          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;\n\n          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {\n            return;\n          }\n\n          _this.__outsideClickHandler(event);\n        };\n\n        events.forEach(function (eventName) {\n          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));\n        });\n      };\n\n      _this.disableOnClickOutside = function () {\n        delete enabledInstances[_this._uid];\n        var fn = handlersMap[_this._uid];\n\n        if (fn && typeof document !== 'undefined') {\n          var events = _this.props.eventTypes;\n\n          if (!events.forEach) {\n            events = [events];\n          }\n\n          events.forEach(function (eventName) {\n            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));\n          });\n          delete handlersMap[_this._uid];\n        }\n      };\n\n      _this.getRef = function (ref) {\n        return _this.instanceRef = ref;\n      };\n\n      _this._uid = uid();\n      return _this;\n    }\n    /**\n     * Access the WrappedComponent's instance.\n     */\n\n\n    var _proto = onClickOutside.prototype;\n\n    _proto.getInstance = function getInstance() {\n      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {\n        return this;\n      }\n\n      var ref = this.instanceRef;\n      return ref.getInstance ? ref.getInstance() : ref;\n    };\n\n    /**\n     * Add click listeners to the current document,\n     * linked to this component's state.\n     */\n    _proto.componentDidMount = function componentDidMount() {\n      // If we are in an environment without a DOM such\n      // as shallow rendering or snapshots then we exit\n      // early to prevent any unhandled errors being thrown.\n      if (typeof document === 'undefined' || !document.createElement) {\n        return;\n      }\n\n      var instance = this.getInstance();\n\n      if (config && typeof config.handleClickOutside === 'function') {\n        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);\n\n        if (typeof this.__clickOutsideHandlerProp !== 'function') {\n          throw new Error(\"WrappedComponent: \" + componentName + \" lacks a function for processing outside click events specified by the handleClickOutside config option.\");\n        }\n      }\n\n      this.componentNode = this.__getComponentNode(); // return early so we dont initiate onClickOutside\n\n      if (this.props.disableOnClickOutside) return;\n      this.enableOnClickOutside();\n    };\n\n    _proto.componentDidUpdate = function componentDidUpdate() {\n      this.componentNode = this.__getComponentNode();\n    }\n    /**\n     * Remove all document's event listeners for this component\n     */\n    ;\n\n    _proto.componentWillUnmount = function componentWillUnmount() {\n      this.disableOnClickOutside();\n    }\n    /**\n     * Can be called to explicitly enable event listening\n     * for clicks and touches outside of this element.\n     */\n    ;\n\n    /**\n     * Pass-through render\n     */\n    _proto.render = function render() {\n      // eslint-disable-next-line no-unused-vars\n      var _this$props = this.props;\n          _this$props.excludeScrollbar;\n          var props = _objectWithoutPropertiesLoose(_this$props, [\"excludeScrollbar\"]);\n\n      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {\n        props.ref = this.getRef;\n      } else {\n        props.wrappedRef = this.getRef;\n      }\n\n      props.disableOnClickOutside = this.disableOnClickOutside;\n      props.enableOnClickOutside = this.enableOnClickOutside;\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WrappedComponent, props);\n    };\n\n    return onClickOutside;\n  }(react__WEBPACK_IMPORTED_MODULE_0__.Component), _class.displayName = \"OnClickOutside(\" + componentName + \")\", _class.defaultProps = {\n    eventTypes: ['mousedown', 'touchstart'],\n    excludeScrollbar: config && config.excludeScrollbar || false,\n    outsideClickIgnoreClass: IGNORE_CLASS_NAME,\n    preventDefault: false,\n    stopPropagation: false\n  }, _class.getClass = function () {\n    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;\n  }, _temp;\n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (onClickOutsideHOC);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3Qtb25jbGlja291dHNpZGUvZGlzdC9yZWFjdC1vbmNsaWNrb3V0c2lkZS5lcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBZ0Y7QUFDaEY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsdUJBQXVCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLHNEQUFXO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsb0RBQWE7QUFDMUI7O0FBRUE7QUFDQSxHQUFHLENBQUMsNENBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILENBQUMsaUVBQWUsaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFzay1tYW5hZ2VtZW50LXdlYi8uL25vZGVfbW9kdWxlcy9yZWFjdC1vbmNsaWNrb3V0c2lkZS9kaXN0L3JlYWN0LW9uY2xpY2tvdXRzaWRlLmVzLmpzP2NhMjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjcmVhdGVFbGVtZW50LENvbXBvbmVudH1mcm9tJ3JlYWN0JztpbXBvcnQge2ZpbmRET01Ob2RlfWZyb20ncmVhY3QtZG9tJztmdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG5cbiAgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge307XG4gIHZhciB0YXJnZXQgPSB7fTtcbiAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIga2V5LCBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpXTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufS8qKlxuICogQ2hlY2sgd2hldGhlciBzb21lIERPTSBub2RlIGlzIG91ciBDb21wb25lbnQncyBub2RlLlxuICovXG5mdW5jdGlvbiBpc05vZGVGb3VuZChjdXJyZW50LCBjb21wb25lbnROb2RlLCBpZ25vcmVDbGFzcykge1xuICBpZiAoY3VycmVudCA9PT0gY29tcG9uZW50Tm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIFNWRyA8dXNlLz4gZWxlbWVudHMgZG8gbm90IHRlY2huaWNhbGx5IHJlc2lkZSBpbiB0aGUgcmVuZGVyZWQgRE9NLCBzb1xuICAvLyB0aGV5IGRvIG5vdCBoYXZlIGNsYXNzTGlzdCBkaXJlY3RseSwgYnV0IHRoZXkgb2ZmZXIgYSBsaW5rIHRvIHRoZWlyXG4gIC8vIGNvcnJlc3BvbmRpbmcgZWxlbWVudCwgd2hpY2ggY2FuIGhhdmUgY2xhc3NMaXN0LiBUaGlzIGV4dHJhIGNoZWNrIGlzIGZvclxuICAvLyB0aGF0IGNhc2UuXG4gIC8vIFNlZTogaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvc3RydWN0Lmh0bWwjSW50ZXJmYWNlU1ZHVXNlRWxlbWVudFxuICAvLyBEaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vUG9tYXgvcmVhY3Qtb25jbGlja291dHNpZGUvcHVsbC8xN1xuXG5cbiAgaWYgKGN1cnJlbnQuY29ycmVzcG9uZGluZ0VsZW1lbnQpIHtcbiAgICByZXR1cm4gY3VycmVudC5jb3JyZXNwb25kaW5nRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoaWdub3JlQ2xhc3MpO1xuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGlnbm9yZUNsYXNzKTtcbn1cbi8qKlxuICogVHJ5IHRvIGZpbmQgb3VyIG5vZGUgaW4gYSBoaWVyYXJjaHkgb2Ygbm9kZXMsIHJldHVybmluZyB0aGUgZG9jdW1lbnRcbiAqIG5vZGUgYXMgaGlnaGVzdCBub2RlIGlmIG91ciBub2RlIGlzIG5vdCBmb3VuZCBpbiB0aGUgcGF0aCB1cC5cbiAqL1xuXG5mdW5jdGlvbiBmaW5kSGlnaGVzdChjdXJyZW50LCBjb21wb25lbnROb2RlLCBpZ25vcmVDbGFzcykge1xuICBpZiAoY3VycmVudCA9PT0gY29tcG9uZW50Tm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIElmIHNvdXJjZT1sb2NhbCB0aGVuIHRoaXMgZXZlbnQgY2FtZSBmcm9tICdzb21ld2hlcmUnXG4gIC8vIGluc2lkZSBhbmQgc2hvdWxkIGJlIGlnbm9yZWQuIFdlIGNvdWxkIGhhbmRsZSB0aGlzIHdpdGhcbiAgLy8gYSBsYXllcmVkIGFwcHJvYWNoLCB0b28sIGJ1dCB0aGF0IHJlcXVpcmVzIGdvaW5nIGJhY2sgdG9cbiAgLy8gdGhpbmtpbmcgaW4gdGVybXMgb2YgRG9tIG5vZGUgbmVzdGluZywgcnVubmluZyBjb3VudGVyXG4gIC8vIHRvIFJlYWN0J3MgJ3lvdSBzaG91bGRuJ3QgY2FyZSBhYm91dCB0aGUgRE9NJyBwaGlsb3NvcGh5LlxuICAvLyBBbHNvIGNvdmVyIHNoYWRvd1Jvb3Qgbm9kZSBieSBjaGVja2luZyBjdXJyZW50Lmhvc3RcblxuXG4gIHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUgfHwgY3VycmVudC5ob3N0KSB7XG4gICAgLy8gT25seSBjaGVjayBub3JtYWwgbm9kZSB3aXRob3V0IHNoYWRvd1Jvb3RcbiAgICBpZiAoY3VycmVudC5wYXJlbnROb2RlICYmIGlzTm9kZUZvdW5kKGN1cnJlbnQsIGNvbXBvbmVudE5vZGUsIGlnbm9yZUNsYXNzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZSB8fCBjdXJyZW50Lmhvc3Q7XG4gIH1cblxuICByZXR1cm4gY3VycmVudDtcbn1cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc2Nyb2xsYmFyIHdhcyBjbGlja2VkXG4gKi9cblxuZnVuY3Rpb24gY2xpY2tlZFNjcm9sbGJhcihldnQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8PSBldnQuY2xpZW50WCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDw9IGV2dC5jbGllbnRZO1xufS8vIGlkZWFsbHkgd2lsbCBnZXQgcmVwbGFjZWQgd2l0aCBleHRlcm5hbCBkZXBcbi8vIHdoZW4gcmFmcmV4L2RldGVjdC1wYXNzaXZlLWV2ZW50cyM0IGFuZCByYWZyZXgvZGV0ZWN0LXBhc3NpdmUtZXZlbnRzIzUgZ2V0IG1lcmdlZCBpblxudmFyIHRlc3RQYXNzaXZlRXZlbnRTdXBwb3J0ID0gZnVuY3Rpb24gdGVzdFBhc3NpdmVFdmVudFN1cHBvcnQoKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFzc2l2ZSA9IGZhbHNlO1xuICB2YXIgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBwYXNzaXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZUV2ZW50U3VwcG9ydCcsIG5vb3AsIG9wdGlvbnMpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmVFdmVudFN1cHBvcnQnLCBub29wLCBvcHRpb25zKTtcbiAgcmV0dXJuIHBhc3NpdmU7XG59O2Z1bmN0aW9uIGF1dG9JbmMoc2VlZCkge1xuICBpZiAoc2VlZCA9PT0gdm9pZCAwKSB7XG4gICAgc2VlZCA9IDA7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiArK3NlZWQ7XG4gIH07XG59XG5cbnZhciB1aWQgPSBhdXRvSW5jKCk7dmFyIHBhc3NpdmVFdmVudFN1cHBvcnQ7XG52YXIgaGFuZGxlcnNNYXAgPSB7fTtcbnZhciBlbmFibGVkSW5zdGFuY2VzID0ge307XG52YXIgdG91Y2hFdmVudHMgPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJ107XG52YXIgSUdOT1JFX0NMQVNTX05BTUUgPSAnaWdub3JlLXJlYWN0LW9uY2xpY2tvdXRzaWRlJztcbi8qKlxuICogT3B0aW9ucyBmb3IgYWRkRXZlbnRIYW5kbGVyIGFuZCByZW1vdmVFdmVudEhhbmRsZXJcbiAqL1xuXG5mdW5jdGlvbiBnZXRFdmVudEhhbmRsZXJPcHRpb25zKGluc3RhbmNlLCBldmVudE5hbWUpIHtcbiAgdmFyIGhhbmRsZXJPcHRpb25zID0ge307XG4gIHZhciBpc1RvdWNoRXZlbnQgPSB0b3VjaEV2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgIT09IC0xO1xuXG4gIGlmIChpc1RvdWNoRXZlbnQgJiYgcGFzc2l2ZUV2ZW50U3VwcG9ydCkge1xuICAgIGhhbmRsZXJPcHRpb25zLnBhc3NpdmUgPSAhaW5zdGFuY2UucHJvcHMucHJldmVudERlZmF1bHQ7XG4gIH1cblxuICByZXR1cm4gaGFuZGxlck9wdGlvbnM7XG59XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHRoZSBIT0MgZnVuY3Rpb24gdGhhdCB5b3UnbGwgdXNlXG4gKiBpbiBvcmRlciB0byBpbXBhcnQgb25PdXRzaWRlQ2xpY2sgbGlzdGVuaW5nIHRvIGFuXG4gKiBhcmJpdHJhcnkgY29tcG9uZW50LiBJdCBnZXRzIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoZVxuICogYm9vdHN0cmFwcGluZyBjb2RlIHRvIHlpZWxkIGFuIGluc3RhbmNlIG9mIHRoZVxuICogb25DbGlja091dHNpZGVIT0MgZnVuY3Rpb24gZGVmaW5lZCBpbnNpZGUgc2V0dXBIT0MoKS5cbiAqL1xuXG5cbmZ1bmN0aW9uIG9uQ2xpY2tPdXRzaWRlSE9DKFdyYXBwZWRDb21wb25lbnQsIGNvbmZpZykge1xuICB2YXIgX2NsYXNzLCBfdGVtcDtcblxuICB2YXIgY29tcG9uZW50TmFtZSA9IFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgV3JhcHBlZENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuICByZXR1cm4gX3RlbXAgPSBfY2xhc3MgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShvbkNsaWNrT3V0c2lkZSwgX0NvbXBvbmVudCk7XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrT3V0c2lkZShwcm9wcykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfdGhpcyA9IF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcblxuICAgICAgX3RoaXMuX19vdXRzaWRlQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgX3RoaXMuX19jbGlja091dHNpZGVIYW5kbGVyUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIF90aGlzLl9fY2xpY2tPdXRzaWRlSGFuZGxlclByb3AoZXZlbnQpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluc3RhbmNlID0gX3RoaXMuZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgICBpZiAodHlwZW9mIGluc3RhbmNlLnByb3BzLmhhbmRsZUNsaWNrT3V0c2lkZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGluc3RhbmNlLnByb3BzLmhhbmRsZUNsaWNrT3V0c2lkZShldmVudCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5oYW5kbGVDbGlja091dHNpZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpbnN0YW5jZS5oYW5kbGVDbGlja091dHNpZGUoZXZlbnQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyYXBwZWRDb21wb25lbnQ6IFwiICsgY29tcG9uZW50TmFtZSArIFwiIGxhY2tzIGEgaGFuZGxlQ2xpY2tPdXRzaWRlKGV2ZW50KSBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZyBvdXRzaWRlIGNsaWNrIGV2ZW50cy5cIik7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fX2dldENvbXBvbmVudE5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IF90aGlzLmdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgaWYgKGNvbmZpZyAmJiB0eXBlb2YgY29uZmlnLnNldENsaWNrT3V0c2lkZVJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBjb25maWcuc2V0Q2xpY2tPdXRzaWRlUmVmKCkoaW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5zZXRDbGlja091dHNpZGVSZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2Uuc2V0Q2xpY2tPdXRzaWRlUmVmKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmluZERPTU5vZGUoaW5zdGFuY2UpO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuZW5hYmxlT25DbGlja091dHNpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IGVuYWJsZWRJbnN0YW5jZXNbX3RoaXMuX3VpZF0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHBhc3NpdmVFdmVudFN1cHBvcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcGFzc2l2ZUV2ZW50U3VwcG9ydCA9IHRlc3RQYXNzaXZlRXZlbnRTdXBwb3J0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbmFibGVkSW5zdGFuY2VzW190aGlzLl91aWRdID0gdHJ1ZTtcbiAgICAgICAgdmFyIGV2ZW50cyA9IF90aGlzLnByb3BzLmV2ZW50VHlwZXM7XG5cbiAgICAgICAgaWYgKCFldmVudHMuZm9yRWFjaCkge1xuICAgICAgICAgIGV2ZW50cyA9IFtldmVudHNdO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlcnNNYXBbX3RoaXMuX3VpZF0gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoX3RoaXMuY29tcG9uZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgICAgaWYgKF90aGlzLnByb3BzLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5leGNsdWRlU2Nyb2xsYmFyICYmIGNsaWNrZWRTY3JvbGxiYXIoZXZlbnQpKSByZXR1cm47XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBldmVudC5jb21wb3NlZCAmJiBldmVudC5jb21wb3NlZFBhdGggJiYgZXZlbnQuY29tcG9zZWRQYXRoKCkuc2hpZnQoKSB8fCBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICBpZiAoZmluZEhpZ2hlc3QoY3VycmVudCwgX3RoaXMuY29tcG9uZW50Tm9kZSwgX3RoaXMucHJvcHMub3V0c2lkZUNsaWNrSWdub3JlQ2xhc3MpICE9PSBkb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzLl9fb3V0c2lkZUNsaWNrSGFuZGxlcihldmVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyc01hcFtfdGhpcy5fdWlkXSwgZ2V0RXZlbnRIYW5kbGVyT3B0aW9ucyhfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgZXZlbnROYW1lKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgX3RoaXMuZGlzYWJsZU9uQ2xpY2tPdXRzaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGUgZW5hYmxlZEluc3RhbmNlc1tfdGhpcy5fdWlkXTtcbiAgICAgICAgdmFyIGZuID0gaGFuZGxlcnNNYXBbX3RoaXMuX3VpZF07XG5cbiAgICAgICAgaWYgKGZuICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB2YXIgZXZlbnRzID0gX3RoaXMucHJvcHMuZXZlbnRUeXBlcztcblxuICAgICAgICAgIGlmICghZXZlbnRzLmZvckVhY2gpIHtcbiAgICAgICAgICAgIGV2ZW50cyA9IFtldmVudHNdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4sIGdldEV2ZW50SGFuZGxlck9wdGlvbnMoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIGV2ZW50TmFtZSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc01hcFtfdGhpcy5fdWlkXTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3RoaXMuZ2V0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgICAgICByZXR1cm4gX3RoaXMuaW5zdGFuY2VSZWYgPSByZWY7XG4gICAgICB9O1xuXG4gICAgICBfdGhpcy5fdWlkID0gdWlkKCk7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjY2VzcyB0aGUgV3JhcHBlZENvbXBvbmVudCdzIGluc3RhbmNlLlxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvID0gb25DbGlja091dHNpZGUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLmdldEluc3RhbmNlID0gZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKSB7XG4gICAgICBpZiAoV3JhcHBlZENvbXBvbmVudC5wcm90b3R5cGUgJiYgIVdyYXBwZWRDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWYgPSB0aGlzLmluc3RhbmNlUmVmO1xuICAgICAgcmV0dXJuIHJlZi5nZXRJbnN0YW5jZSA/IHJlZi5nZXRJbnN0YW5jZSgpIDogcmVmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgY2xpY2sgbGlzdGVuZXJzIHRvIHRoZSBjdXJyZW50IGRvY3VtZW50LFxuICAgICAqIGxpbmtlZCB0byB0aGlzIGNvbXBvbmVudCdzIHN0YXRlLlxuICAgICAqL1xuICAgIF9wcm90by5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgLy8gSWYgd2UgYXJlIGluIGFuIGVudmlyb25tZW50IHdpdGhvdXQgYSBET00gc3VjaFxuICAgICAgLy8gYXMgc2hhbGxvdyByZW5kZXJpbmcgb3Igc25hcHNob3RzIHRoZW4gd2UgZXhpdFxuICAgICAgLy8gZWFybHkgdG8gcHJldmVudCBhbnkgdW5oYW5kbGVkIGVycm9ycyBiZWluZyB0aHJvd24uXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKTtcblxuICAgICAgaWYgKGNvbmZpZyAmJiB0eXBlb2YgY29uZmlnLmhhbmRsZUNsaWNrT3V0c2lkZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9fY2xpY2tPdXRzaWRlSGFuZGxlclByb3AgPSBjb25maWcuaGFuZGxlQ2xpY2tPdXRzaWRlKGluc3RhbmNlKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX19jbGlja091dHNpZGVIYW5kbGVyUHJvcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyYXBwZWRDb21wb25lbnQ6IFwiICsgY29tcG9uZW50TmFtZSArIFwiIGxhY2tzIGEgZnVuY3Rpb24gZm9yIHByb2Nlc3Npbmcgb3V0c2lkZSBjbGljayBldmVudHMgc3BlY2lmaWVkIGJ5IHRoZSBoYW5kbGVDbGlja091dHNpZGUgY29uZmlnIG9wdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jb21wb25lbnROb2RlID0gdGhpcy5fX2dldENvbXBvbmVudE5vZGUoKTsgLy8gcmV0dXJuIGVhcmx5IHNvIHdlIGRvbnQgaW5pdGlhdGUgb25DbGlja091dHNpZGVcblxuICAgICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZU9uQ2xpY2tPdXRzaWRlKSByZXR1cm47XG4gICAgICB0aGlzLmVuYWJsZU9uQ2xpY2tPdXRzaWRlKCk7XG4gICAgfTtcblxuICAgIF9wcm90by5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudE5vZGUgPSB0aGlzLl9fZ2V0Q29tcG9uZW50Tm9kZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGRvY3VtZW50J3MgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIDtcblxuICAgIF9wcm90by5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5kaXNhYmxlT25DbGlja091dHNpZGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FuIGJlIGNhbGxlZCB0byBleHBsaWNpdGx5IGVuYWJsZSBldmVudCBsaXN0ZW5pbmdcbiAgICAgKiBmb3IgY2xpY2tzIGFuZCB0b3VjaGVzIG91dHNpZGUgb2YgdGhpcyBlbGVtZW50LlxuICAgICAqL1xuICAgIDtcblxuICAgIC8qKlxuICAgICAqIFBhc3MtdGhyb3VnaCByZW5kZXJcbiAgICAgKi9cbiAgICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICB2YXIgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgICAgIF90aGlzJHByb3BzLmV4Y2x1ZGVTY3JvbGxiYXI7XG4gICAgICAgICAgdmFyIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3RoaXMkcHJvcHMsIFtcImV4Y2x1ZGVTY3JvbGxiYXJcIl0pO1xuXG4gICAgICBpZiAoV3JhcHBlZENvbXBvbmVudC5wcm90b3R5cGUgJiYgV3JhcHBlZENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCkge1xuICAgICAgICBwcm9wcy5yZWYgPSB0aGlzLmdldFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BzLndyYXBwZWRSZWYgPSB0aGlzLmdldFJlZjtcbiAgICAgIH1cblxuICAgICAgcHJvcHMuZGlzYWJsZU9uQ2xpY2tPdXRzaWRlID0gdGhpcy5kaXNhYmxlT25DbGlja091dHNpZGU7XG4gICAgICBwcm9wcy5lbmFibGVPbkNsaWNrT3V0c2lkZSA9IHRoaXMuZW5hYmxlT25DbGlja091dHNpZGU7XG4gICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCBwcm9wcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBvbkNsaWNrT3V0c2lkZTtcbiAgfShDb21wb25lbnQpLCBfY2xhc3MuZGlzcGxheU5hbWUgPSBcIk9uQ2xpY2tPdXRzaWRlKFwiICsgY29tcG9uZW50TmFtZSArIFwiKVwiLCBfY2xhc3MuZGVmYXVsdFByb3BzID0ge1xuICAgIGV2ZW50VHlwZXM6IFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXSxcbiAgICBleGNsdWRlU2Nyb2xsYmFyOiBjb25maWcgJiYgY29uZmlnLmV4Y2x1ZGVTY3JvbGxiYXIgfHwgZmFsc2UsXG4gICAgb3V0c2lkZUNsaWNrSWdub3JlQ2xhc3M6IElHTk9SRV9DTEFTU19OQU1FLFxuICAgIHByZXZlbnREZWZhdWx0OiBmYWxzZSxcbiAgICBzdG9wUHJvcGFnYXRpb246IGZhbHNlXG4gIH0sIF9jbGFzcy5nZXRDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gV3JhcHBlZENvbXBvbmVudC5nZXRDbGFzcyA/IFdyYXBwZWRDb21wb25lbnQuZ2V0Q2xhc3MoKSA6IFdyYXBwZWRDb21wb25lbnQ7XG4gIH0sIF90ZW1wO1xufWV4cG9ydCBkZWZhdWx0IG9uQ2xpY2tPdXRzaWRlSE9DO2V4cG9ydHtJR05PUkVfQ0xBU1NfTkFNRX07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js\n");

/***/ })

};
;