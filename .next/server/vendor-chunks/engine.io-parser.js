"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/engine.io-parser";
exports.ids = ["vendor-chunks/engine.io-parser"];
exports.modules = {

/***/ "(ssr)/./node_modules/engine.io-parser/build/esm/commons.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ERROR_PACKET: () => (/* binding */ ERROR_PACKET),\n/* harmony export */   PACKET_TYPES: () => (/* binding */ PACKET_TYPES),\n/* harmony export */   PACKET_TYPES_REVERSE: () => (/* binding */ PACKET_TYPES_REVERSE)\n/* harmony export */ });\nconst PACKET_TYPES = Object.create(null); // no Map = no polyfill\nPACKET_TYPES[\"open\"] = \"0\";\nPACKET_TYPES[\"close\"] = \"1\";\nPACKET_TYPES[\"ping\"] = \"2\";\nPACKET_TYPES[\"pong\"] = \"3\";\nPACKET_TYPES[\"message\"] = \"4\";\nPACKET_TYPES[\"upgrade\"] = \"5\";\nPACKET_TYPES[\"noop\"] = \"6\";\nconst PACKET_TYPES_REVERSE = Object.create(null);\nObject.keys(PACKET_TYPES).forEach((key) => {\n    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;\n});\nconst ERROR_PACKET = { type: \"error\", data: \"parser error\" };\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29tbW9ucy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsdUJBQXVCO0FBQ3FDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFzay1tYW5hZ2VtZW50LXdlYi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb21tb25zLmpzPzhhZDQiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUEFDS0VUX1RZUEVTID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gbm8gTWFwID0gbm8gcG9seWZpbGxcblBBQ0tFVF9UWVBFU1tcIm9wZW5cIl0gPSBcIjBcIjtcblBBQ0tFVF9UWVBFU1tcImNsb3NlXCJdID0gXCIxXCI7XG5QQUNLRVRfVFlQRVNbXCJwaW5nXCJdID0gXCIyXCI7XG5QQUNLRVRfVFlQRVNbXCJwb25nXCJdID0gXCIzXCI7XG5QQUNLRVRfVFlQRVNbXCJtZXNzYWdlXCJdID0gXCI0XCI7XG5QQUNLRVRfVFlQRVNbXCJ1cGdyYWRlXCJdID0gXCI1XCI7XG5QQUNLRVRfVFlQRVNbXCJub29wXCJdID0gXCI2XCI7XG5jb25zdCBQQUNLRVRfVFlQRVNfUkVWRVJTRSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5PYmplY3Qua2V5cyhQQUNLRVRfVFlQRVMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuY29uc3QgRVJST1JfUEFDS0VUID0geyB0eXBlOiBcImVycm9yXCIsIGRhdGE6IFwicGFyc2VyIGVycm9yXCIgfTtcbmV4cG9ydCB7IFBBQ0tFVF9UWVBFUywgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIEVSUk9SX1BBQ0tFVCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/engine.io-parser/build/esm/commons.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/engine.io-parser/build/esm/decodePacket.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/decodePacket.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decodePacket: () => (/* binding */ decodePacket)\n/* harmony export */ });\n/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ \"(ssr)/./node_modules/engine.io-parser/build/esm/commons.js\");\n\nconst decodePacket = (encodedPacket, binaryType) => {\n    if (typeof encodedPacket !== \"string\") {\n        return {\n            type: \"message\",\n            data: mapBinary(encodedPacket, binaryType),\n        };\n    }\n    const type = encodedPacket.charAt(0);\n    if (type === \"b\") {\n        const buffer = Buffer.from(encodedPacket.substring(1), \"base64\");\n        return {\n            type: \"message\",\n            data: mapBinary(buffer, binaryType),\n        };\n    }\n    if (!_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type]) {\n        return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;\n    }\n    return encodedPacket.length > 1\n        ? {\n            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],\n            data: encodedPacket.substring(1),\n        }\n        : {\n            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],\n        };\n};\nconst mapBinary = (data, binaryType) => {\n    switch (binaryType) {\n        case \"arraybuffer\":\n            if (data instanceof ArrayBuffer) {\n                // from WebSocket & binaryType \"arraybuffer\"\n                return data;\n            }\n            else if (Buffer.isBuffer(data)) {\n                // from HTTP long-polling\n                return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);\n            }\n            else {\n                // from WebTransport (Uint8Array)\n                return data.buffer;\n            }\n        case \"nodebuffer\":\n        default:\n            if (Buffer.isBuffer(data)) {\n                // from HTTP long-polling or WebSocket & binaryType \"nodebuffer\" (default)\n                return data;\n            }\n            else {\n                // from WebTransport (Uint8Array)\n                return Buffer.from(data);\n            }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZGVjb2RlUGFja2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW1FO0FBQzVEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsNkRBQW9CO0FBQzdCLGVBQWUscURBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZEQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNkRBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrLW1hbmFnZW1lbnQtd2ViLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2RlY29kZVBhY2tldC5qcz9iZDM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVSUk9SX1BBQ0tFVCwgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuZXhwb3J0IGNvbnN0IGRlY29kZVBhY2tldCA9IChlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGVkUGFja2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgXCJiYXNlNjRcIik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShidWZmZXIsIGJpbmFyeVR5cGUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoIVBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdKSB7XG4gICAgICAgIHJldHVybiBFUlJPUl9QQUNLRVQ7XG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVkUGFja2V0Lmxlbmd0aCA+IDFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICB0eXBlOiBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXSxcbiAgICAgICAgICAgIGRhdGE6IGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpLFxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV0sXG4gICAgICAgIH07XG59O1xuY29uc3QgbWFwQmluYXJ5ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBzd2l0Y2ggKGJpbmFyeVR5cGUpIHtcbiAgICAgICAgY2FzZSBcImFycmF5YnVmZmVyXCI6XG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBXZWJTb2NrZXQgJiBiaW5hcnlUeXBlIFwiYXJyYXlidWZmZXJcIlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBIVFRQIGxvbmctcG9sbGluZ1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlci5zbGljZShkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFdlYlRyYW5zcG9ydCAoVWludDhBcnJheSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJub2RlYnVmZmVyXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBIVFRQIGxvbmctcG9sbGluZyBvciBXZWJTb2NrZXQgJiBiaW5hcnlUeXBlIFwibm9kZWJ1ZmZlclwiIChkZWZhdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBXZWJUcmFuc3BvcnQgKFVpbnQ4QXJyYXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/engine.io-parser/build/esm/decodePacket.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/engine.io-parser/build/esm/encodePacket.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/encodePacket.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   encodePacket: () => (/* binding */ encodePacket),\n/* harmony export */   encodePacketToBinary: () => (/* binding */ encodePacketToBinary)\n/* harmony export */ });\n/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ \"(ssr)/./node_modules/engine.io-parser/build/esm/commons.js\");\n\nconst encodePacket = ({ type, data }, supportsBinary, callback) => {\n    if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {\n        return callback(supportsBinary ? data : \"b\" + toBuffer(data, true).toString(\"base64\"));\n    }\n    // plain string\n    return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || \"\"));\n};\nconst toBuffer = (data, forceBufferConversion) => {\n    if (Buffer.isBuffer(data) ||\n        (data instanceof Uint8Array && !forceBufferConversion)) {\n        return data;\n    }\n    else if (data instanceof ArrayBuffer) {\n        return Buffer.from(data);\n    }\n    else {\n        return Buffer.from(data.buffer, data.byteOffset, data.byteLength);\n    }\n};\nlet TEXT_ENCODER;\nfunction encodePacketToBinary(packet, callback) {\n    if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {\n        return callback(toBuffer(packet.data, false));\n    }\n    encodePacket(packet, true, (encoded) => {\n        if (!TEXT_ENCODER) {\n            // lazily created for compatibility with Node.js 10\n            TEXT_ENCODER = new TextEncoder();\n        }\n        callback(TEXT_ENCODER.encode(encoded));\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZW5jb2RlUGFja2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE0QztBQUNyQyx3QkFBd0IsWUFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrLW1hbmFnZW1lbnQtd2ViLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2VuY29kZVBhY2tldC5qcz9kZTYzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmV4cG9ydCBjb25zdCBlbmNvZGVQYWNrZXQgPSAoeyB0eXBlLCBkYXRhIH0sIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhzdXBwb3J0c0JpbmFyeSA/IGRhdGEgOiBcImJcIiArIHRvQnVmZmVyKGRhdGEsIHRydWUpLnRvU3RyaW5nKFwiYmFzZTY0XCIpKTtcbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCB0b0J1ZmZlciA9IChkYXRhLCBmb3JjZUJ1ZmZlckNvbnZlcnNpb24pID0+IHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICAgIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSAmJiAhZm9yY2VCdWZmZXJDb252ZXJzaW9uKSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShkYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpO1xuICAgIH1cbn07XG5sZXQgVEVYVF9FTkNPREVSO1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVBhY2tldFRvQmluYXJ5KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgICBpZiAocGFja2V0LmRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcocGFja2V0LmRhdGEpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0b0J1ZmZlcihwYWNrZXQuZGF0YSwgZmFsc2UpKTtcbiAgICB9XG4gICAgZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgKGVuY29kZWQpID0+IHtcbiAgICAgICAgaWYgKCFURVhUX0VOQ09ERVIpIHtcbiAgICAgICAgICAgIC8vIGxhemlseSBjcmVhdGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggTm9kZS5qcyAxMFxuICAgICAgICAgICAgVEVYVF9FTkNPREVSID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soVEVYVF9FTkNPREVSLmVuY29kZShlbmNvZGVkKSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/engine.io-parser/build/esm/encodePacket.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/engine.io-parser/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPacketDecoderStream: () => (/* binding */ createPacketDecoderStream),\n/* harmony export */   createPacketEncoderStream: () => (/* binding */ createPacketEncoderStream),\n/* harmony export */   decodePacket: () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket),\n/* harmony export */   decodePayload: () => (/* binding */ decodePayload),\n/* harmony export */   encodePacket: () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket),\n/* harmony export */   encodePayload: () => (/* binding */ encodePayload),\n/* harmony export */   protocol: () => (/* binding */ protocol)\n/* harmony export */ });\n/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encodePacket.js */ \"(ssr)/./node_modules/engine.io-parser/build/esm/encodePacket.js\");\n/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decodePacket.js */ \"(ssr)/./node_modules/engine.io-parser/build/esm/decodePacket.js\");\n/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commons.js */ \"(ssr)/./node_modules/engine.io-parser/build/esm/commons.js\");\n\n\n\nconst SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text\nconst encodePayload = (packets, callback) => {\n    // some packets may be added to the array while encoding, so the initial length must be saved\n    const length = packets.length;\n    const encodedPackets = new Array(length);\n    let count = 0;\n    packets.forEach((packet, i) => {\n        // force base64 encoding for binary packets\n        (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket)(packet, false, (encodedPacket) => {\n            encodedPackets[i] = encodedPacket;\n            if (++count === length) {\n                callback(encodedPackets.join(SEPARATOR));\n            }\n        });\n    });\n};\nconst decodePayload = (encodedPayload, binaryType) => {\n    const encodedPackets = encodedPayload.split(SEPARATOR);\n    const packets = [];\n    for (let i = 0; i < encodedPackets.length; i++) {\n        const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(encodedPackets[i], binaryType);\n        packets.push(decodedPacket);\n        if (decodedPacket.type === \"error\") {\n            break;\n        }\n    }\n    return packets;\n};\nfunction createPacketEncoderStream() {\n    // @ts-expect-error\n    return new TransformStream({\n        transform(packet, controller) {\n            (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacketToBinary)(packet, (encodedPacket) => {\n                const payloadLength = encodedPacket.length;\n                let header;\n                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length\n                if (payloadLength < 126) {\n                    header = new Uint8Array(1);\n                    new DataView(header.buffer).setUint8(0, payloadLength);\n                }\n                else if (payloadLength < 65536) {\n                    header = new Uint8Array(3);\n                    const view = new DataView(header.buffer);\n                    view.setUint8(0, 126);\n                    view.setUint16(1, payloadLength);\n                }\n                else {\n                    header = new Uint8Array(9);\n                    const view = new DataView(header.buffer);\n                    view.setUint8(0, 127);\n                    view.setBigUint64(1, BigInt(payloadLength));\n                }\n                // first bit indicates whether the payload is plain text (0) or binary (1)\n                if (packet.data && typeof packet.data !== \"string\") {\n                    header[0] |= 0x80;\n                }\n                controller.enqueue(header);\n                controller.enqueue(encodedPacket);\n            });\n        },\n    });\n}\nlet TEXT_DECODER;\nfunction totalLength(chunks) {\n    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);\n}\nfunction concatChunks(chunks, size) {\n    if (chunks[0].length === size) {\n        return chunks.shift();\n    }\n    const buffer = new Uint8Array(size);\n    let j = 0;\n    for (let i = 0; i < size; i++) {\n        buffer[i] = chunks[0][j++];\n        if (j === chunks[0].length) {\n            chunks.shift();\n            j = 0;\n        }\n    }\n    if (chunks.length && j < chunks[0].length) {\n        chunks[0] = chunks[0].slice(j);\n    }\n    return buffer;\n}\nfunction createPacketDecoderStream(maxPayload, binaryType) {\n    if (!TEXT_DECODER) {\n        TEXT_DECODER = new TextDecoder();\n    }\n    const chunks = [];\n    let state = 0 /* READ_HEADER */;\n    let expectedLength = -1;\n    let isBinary = false;\n    // @ts-expect-error\n    return new TransformStream({\n        transform(chunk, controller) {\n            chunks.push(chunk);\n            while (true) {\n                if (state === 0 /* READ_HEADER */) {\n                    if (totalLength(chunks) < 1) {\n                        break;\n                    }\n                    const header = concatChunks(chunks, 1);\n                    isBinary = (header[0] & 0x80) === 0x80;\n                    expectedLength = header[0] & 0x7f;\n                    if (expectedLength < 126) {\n                        state = 3 /* READ_PAYLOAD */;\n                    }\n                    else if (expectedLength === 126) {\n                        state = 1 /* READ_EXTENDED_LENGTH_16 */;\n                    }\n                    else {\n                        state = 2 /* READ_EXTENDED_LENGTH_64 */;\n                    }\n                }\n                else if (state === 1 /* READ_EXTENDED_LENGTH_16 */) {\n                    if (totalLength(chunks) < 2) {\n                        break;\n                    }\n                    const headerArray = concatChunks(chunks, 2);\n                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);\n                    state = 3 /* READ_PAYLOAD */;\n                }\n                else if (state === 2 /* READ_EXTENDED_LENGTH_64 */) {\n                    if (totalLength(chunks) < 8) {\n                        break;\n                    }\n                    const headerArray = concatChunks(chunks, 8);\n                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);\n                    const n = view.getUint32(0);\n                    if (n > Math.pow(2, 53 - 32) - 1) {\n                        // the maximum safe integer in JavaScript is 2^53 - 1\n                        controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);\n                        break;\n                    }\n                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);\n                    state = 3 /* READ_PAYLOAD */;\n                }\n                else {\n                    if (totalLength(chunks) < expectedLength) {\n                        break;\n                    }\n                    const data = concatChunks(chunks, expectedLength);\n                    controller.enqueue((0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));\n                    state = 0 /* READ_HEADER */;\n                }\n                if (expectedLength === 0 || expectedLength > maxPayload) {\n                    controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);\n                    break;\n                }\n            }\n        },\n    });\n}\nconst protocol = 4;\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUN0QjtBQUNKO0FBQzdDLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQVk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJCQUEyQjtBQUMvQyw4QkFBOEIsOERBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0VBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFEQUFZO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDhEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxREFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ087QUFDOEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXNrLW1hbmFnZW1lbnQtd2ViLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2luZGV4LmpzP2EzM2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW5jb2RlUGFja2V0LCBlbmNvZGVQYWNrZXRUb0JpbmFyeSB9IGZyb20gXCIuL2VuY29kZVBhY2tldC5qc1wiO1xuaW1wb3J0IHsgZGVjb2RlUGFja2V0IH0gZnJvbSBcIi4vZGVjb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgeyBFUlJPUl9QQUNLRVQsIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgKGVuY29kZWRQYWNrZXQpID0+IHtcbiAgICAgICAgICAgIGVuY29kZWRQYWNrZXRzW2ldID0gZW5jb2RlZFBhY2tldDtcbiAgICAgICAgICAgIGlmICgrK2NvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlbmNvZGVkUGFja2V0cy5qb2luKFNFUEFSQVRPUikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5jb25zdCBkZWNvZGVQYXlsb2FkID0gKGVuY29kZWRQYXlsb2FkLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBlbmNvZGVkUGF5bG9hZC5zcGxpdChTRVBBUkFUT1IpO1xuICAgIGNvbnN0IHBhY2tldHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWRQYWNrZXQgPSBkZWNvZGVQYWNrZXQoZW5jb2RlZFBhY2tldHNbaV0sIGJpbmFyeVR5cGUpO1xuICAgICAgICBwYWNrZXRzLnB1c2goZGVjb2RlZFBhY2tldCk7XG4gICAgICAgIGlmIChkZWNvZGVkUGFja2V0LnR5cGUgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhY2tldHM7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhY2tldEVuY29kZXJTdHJlYW0oKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgdHJhbnNmb3JtKHBhY2tldCwgY29udHJvbGxlcikge1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCAoZW5jb2RlZFBhY2tldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRMZW5ndGggPSBlbmNvZGVkUGFja2V0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyO1xuICAgICAgICAgICAgICAgIC8vIGluc3BpcmVkIGJ5IHRoZSBXZWJTb2NrZXQgZm9ybWF0OiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0c19BUEkvV3JpdGluZ19XZWJTb2NrZXRfc2VydmVycyNkZWNvZGluZ19wYXlsb2FkX2xlbmd0aFxuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkTGVuZ3RoIDwgMTI2KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGF0YVZpZXcoaGVhZGVyLmJ1ZmZlcikuc2V0VWludDgoMCwgcGF5bG9hZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBheWxvYWRMZW5ndGggPCA2NTUzNikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSBuZXcgVWludDhBcnJheSgzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgwLCAxMjYpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQxNigxLCBwYXlsb2FkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0QmlnVWludDY0KDEsIEJpZ0ludChwYXlsb2FkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IGJpdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBwbGFpbiB0ZXh0ICgwKSBvciBiaW5hcnkgKDEpXG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHR5cGVvZiBwYWNrZXQuZGF0YSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJbMF0gfD0gMHg4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGhlYWRlcik7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGVuY29kZWRQYWNrZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5sZXQgVEVYVF9ERUNPREVSO1xuZnVuY3Rpb24gdG90YWxMZW5ndGgoY2h1bmtzKSB7XG4gICAgcmV0dXJuIGNodW5rcy5yZWR1Y2UoKGFjYywgY2h1bmspID0+IGFjYyArIGNodW5rLmxlbmd0aCwgMCk7XG59XG5mdW5jdGlvbiBjb25jYXRDaHVua3MoY2h1bmtzLCBzaXplKSB7XG4gICAgaWYgKGNodW5rc1swXS5sZW5ndGggPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNodW5rcy5zaGlmdCgpO1xuICAgIH1cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgYnVmZmVyW2ldID0gY2h1bmtzWzBdW2orK107XG4gICAgICAgIGlmIChqID09PSBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaHVua3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaHVua3MubGVuZ3RoICYmIGogPCBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rc1swXSA9IGNodW5rc1swXS5zbGljZShqKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtKG1heFBheWxvYWQsIGJpbmFyeVR5cGUpIHtcbiAgICBpZiAoIVRFWFRfREVDT0RFUikge1xuICAgICAgICBURVhUX0RFQ09ERVIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICB9XG4gICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgbGV0IHN0YXRlID0gMCAvKiBSRUFEX0hFQURFUiAqLztcbiAgICBsZXQgZXhwZWN0ZWRMZW5ndGggPSAtMTtcbiAgICBsZXQgaXNCaW5hcnkgPSBmYWxzZTtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm1TdHJlYW0oe1xuICAgICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAwIC8qIFJFQURfSEVBREVSICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbExlbmd0aChjaHVua3MpIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gY29uY2F0Q2h1bmtzKGNodW5rcywgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlzQmluYXJ5ID0gKGhlYWRlclswXSAmIDB4ODApID09PSAweDgwO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3RlZExlbmd0aCA9IGhlYWRlclswXSAmIDB4N2Y7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZExlbmd0aCA8IDEyNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzIC8qIFJFQURfUEFZTE9BRCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChleHBlY3RlZExlbmd0aCA9PT0gMTI2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDEgLyogUkVBRF9FWFRFTkRFRF9MRU5HVEhfMTYgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDIgLyogUkVBRF9FWFRFTkRFRF9MRU5HVEhfNjQgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT09IDEgLyogUkVBRF9FWFRFTkRFRF9MRU5HVEhfMTYgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJBcnJheSA9IGNvbmNhdENodW5rcyhjaHVua3MsIDIpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3RlZExlbmd0aCA9IG5ldyBEYXRhVmlldyhoZWFkZXJBcnJheS5idWZmZXIsIGhlYWRlckFycmF5LmJ5dGVPZmZzZXQsIGhlYWRlckFycmF5Lmxlbmd0aCkuZ2V0VWludDE2KDApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDMgLyogUkVBRF9QQVlMT0FEICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0ZSA9PT0gMiAvKiBSRUFEX0VYVEVOREVEX0xFTkdUSF82NCAqLykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxMZW5ndGgoY2h1bmtzKSA8IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckFycmF5ID0gY29uY2F0Q2h1bmtzKGNodW5rcywgOCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyQXJyYXkuYnVmZmVyLCBoZWFkZXJBcnJheS5ieXRlT2Zmc2V0LCBoZWFkZXJBcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuID0gdmlldy5nZXRVaW50MzIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuID4gTWF0aC5wb3coMiwgNTMgLSAzMikgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdCBpcyAyXjUzIC0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKEVSUk9SX1BBQ0tFVCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBleHBlY3RlZExlbmd0aCA9IG4gKiBNYXRoLnBvdygyLCAzMikgKyB2aWV3LmdldFVpbnQzMig0KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzIC8qIFJFQURfUEFZTE9BRCAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbExlbmd0aChjaHVua3MpIDwgZXhwZWN0ZWRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjb25jYXRDaHVua3MoY2h1bmtzLCBleHBlY3RlZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShkZWNvZGVQYWNrZXQoaXNCaW5hcnkgPyBkYXRhIDogVEVYVF9ERUNPREVSLmRlY29kZShkYXRhKSwgYmluYXJ5VHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDAgLyogUkVBRF9IRUFERVIgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZExlbmd0aCA9PT0gMCB8fCBleHBlY3RlZExlbmd0aCA+IG1heFBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKEVSUk9SX1BBQ0tFVCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCwgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/engine.io-parser/build/esm/index.js\n");

/***/ })

};
;