(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("word-search-pillar", [], factory);
	else if(typeof exports === 'object')
		exports["word-search-pillar"] = factory();
	else
		root["word-search-pillar"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var DirectionalKeys=exports.DirectionalKeys=new Map([['UR',[-1,1]],['R',[0,1]],['DR',[1,1]],['D',[1,0]],['DL',[1,-1]],['L',[0,-1]],['UL',[-1,-1]],['U',[-1,0]]]),numberOfDirections=DirectionalKeys.size,WordSearch=exports.WordSearch=function(){function a(){_classCallCheck(this,a),this.wordsToSearch=[],this.charGrid=[],this.height=0,this.width=0}return _createClass(a,[{key:'getSearchData',value:function getSearchData(){var a=this.wordsToSearch,b=this.charGrid,c=this.height,d=this.width;return{wordsToSearch:a,charGrid:b,height:c,width:d}}},{key:'setSearchData',value:function setSearchData(a){var b=a||{},c=b.height,d=b.width,e=b.charGrid,f=b.wordsToSearch;this.width=d||0,this.height=c||0,this.charGrid=e||[],this.wordsToSearch=f||[]}},{key:'splitInputIntoArraysByNewLineThenComma',value:function splitInputIntoArraysByNewLineThenComma(a){var b=a.split(/\r?\n/);return!(2>b.length)&&b.map(function(a){return a.split(',')})}},{key:'verifyStringArray',value:function verifyStringArray(a){if(a.height=a.charGrid.length,a.width=a.charGrid[0].length,a.width!==a.height)return!1;var b=a.charGrid.filter(function(b){return b.length!==a.width});return!b.length}},{key:'parseInputString',value:function parseInputString(a){var b=this.splitInputIntoArraysByNewLineThenComma(a);if(!b)return!1;var c={wordsToSearch:b.shift(),charGrid:b};return!!this.verifyStringArray(c)&&c}},{key:'buildCoord',value:function buildCoord(a,b,c){return[c[0]+a[0]*b,c[1]+a[1]*b]}},{key:'checkIfCharMatch',value:function checkIfCharMatch(a,b,c,d,e){var f=_slicedToArray(a,2),g=f[0],h=f[1];return c[g]?c[g][h]?c[g][h]===b?void 0:d(e):d(e):d(e)}},{key:'checkAroundPoint',value:function checkAroundPoint(a,b,c,d,e,f){var g=this;DirectionalKeys.forEach(function(h,i){if(e[i])return!1;var j=g.buildCoord(h,d,c);g.checkIfCharMatch(j,a,b,f,i)})}},{key:'onFailHelper',value:function onFailHelper(a,b){a[b]=!0,a.timesFailed++}},{key:'returnSuccessfulDirections',value:function returnSuccessfulDirections(a){var b=[];return DirectionalKeys.forEach(function(c,d){!0!==a[d]&&b.push(d)}),!!b.length&&b}},{key:'searchIfWordExistsAtPoint',value:function searchIfWordExistsAtPoint(a,b,c){var d=this,e=_slicedToArray(c,2),f=e[0],g=e[1];if(a[0]!==b[f][g])return!1;for(var h={timesFailed:0},j=1;j<a.length;j++){if(h.timesFailed===numberOfDirections)return!1;this.checkAroundPoint(a[j],b,c,j,{},function(a){return d.onFailHelper(h,a)})}return this.returnSuccessfulDirections(h)}},{key:'getCoordsForDirection',value:function getCoordsForDirection(a,b,c){for(var d=[b],e=1;e<a;e++)d.push(this.buildCoord(c,e,b));return d}},{key:'buildWordCoords',value:function buildWordCoords(a,b,c){var d=this;return b.map(function(b){return{word:a,coords:d.getCoordsForDirection(a.length,c,DirectionalKeys.get(b))}})}},{key:'findWordsAtLocation',value:function findWordsAtLocation(a,b,c){var d=this,e=[];return a.forEach(function(a){var f=d.searchIfWordExistsAtPoint(a,b,c);f&&(e=e.concat(d.buildWordCoords(a,f,c)))}),!!e.length&&e}},{key:'findWordsInRow',value:function findWordsInRow(a,b){var c=this,d=a.wordsToSearch,e=a.charGrid,f=[];return e[b].forEach(function(a,g){var h=c.findWordsAtLocation(d,e,[b,g]);h&&(f=f.concat(h))}),!!f.length&&f}},{key:'findWordsInCharGrid',value:function findWordsInCharGrid(a){var b=this,c=a.charGrid,d=[];return c.forEach(function(c,e){var f=b.findWordsInRow(a,e);f&&(d=d.concat(f))}),!!d.length&&d}},{key:'buildCoordString',value:function buildCoordString(a){var b='';return a.forEach(function(c,d){b+='('+c[0]+','+c[1]+')'+(d<a.length-1?',':'')}),b}},{key:'buildOutputCoordString',value:function buildOutputCoordString(a){var b=this;if(!a||!a.length)return'No words were found';var c='';return a.forEach(function(d,e){c+=d.word+': '+b.buildCoordString(d.coords)+(e<a.length-1?'\n':'')}),c}},{key:'main',value:function main(a){var b=this.parseInputString(a);if(!b)return'Failed to parse input: please make sure input is formatted as follows:\ncomma,separated,words\ng,r\ni,d';var c=this.findWordsInCharGrid(b);return c?this.buildOutputCoordString(c):'Failed to find words'}}]),a}();exports.default=new WordSearch;

/***/ })
/******/ ]);
});