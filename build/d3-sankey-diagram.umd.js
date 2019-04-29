(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-interpolate'), require('d3-selection'), require('d3-transition'), require('d3-dispatch'), require('d3-format')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-interpolate', 'd3-selection', 'd3-transition', 'd3-dispatch', 'd3-format'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Array,d3Collection,d3Interpolate,d3Selection,d3Transition,d3Dispatch,d3Format) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag$1 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag$1 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map$$1, key) {
  var data = map$$1.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$1;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$2 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$1] = typedArrayTags[float64Tag$1] =
typedArrayTags[int8Tag$1] = typedArrayTags[int16Tag$1] =
typedArrayTags[int32Tag$1] = typedArrayTags[uint8Tag$1] =
typedArrayTags[uint8ClampedTag$1] = typedArrayTags[uint16Tag$1] =
typedArrayTags[uint32Tag$1] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$2] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$9;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn$1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$11.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise = _getNative(_root, 'Promise');

var _Promise = Promise;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$2 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$2)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$2;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$12.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$2 = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return _cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$3:
      return _cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return _cloneTypedArray(object, isDeep);

    case mapTag$3:
      return new Ctor;

    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);

    case regexpTag$2:
      return _cloneRegExp(object);

    case setTag$3:
      return new Ctor;

    case symbolTag$1:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */
var mapTag$4 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$4;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */
var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

var isMap_1 = isMap;

/** `Object#toString` result references. */
var setTag$4 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$4;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */
var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

var isSet_1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap_1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return _baseClone(value, CLONE_SYMBOLS_FLAG);
}

var clone_1 = clone;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity_1;
}

var _castFunction = castFunction;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayEach : _baseEach;
  return func(collection, _castFunction(iteratee));
}

var forEach_1 = forEach;

var each = forEach_1;

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  _baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

var _baseFilter = baseFilter;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$1) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map$$1) {
  var index = -1,
      result = Array(map$$1.size);

  map$$1.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set$$1) {
  var index = -1,
      result = Array(set$$1.size);

  set$$1.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var errorTag$2 = '[object Error]';
var mapTag$5 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$5 = '[object Set]';
var stringTag$3 = '[object String]';
var symbolTag$2 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$4:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$3:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$3:
    case dateTag$3:
    case numberTag$3:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$2:
      return object.name == other.name && object.message == other.message;

    case regexpTag$3:
    case stringTag$3:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$5:
      var convert = _mapToArray;

    case setTag$5:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$2:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1;

/** Used for built-in method references. */
var objectProto$14 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$14.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$11.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var objectTag$3 = '[object Object]';

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$13.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$2 : _getTag(object),
      othTag = othIsArr ? arrayTag$2 : _getTag(other);

  objTag = objTag == argsTag$3 ? objectTag$3 : objTag;
  othTag = othTag == argsTag$3 ? objectTag$3 : othTag;

  var objIsObj = objTag == objectTag$3,
      othIsObj = othTag == objectTag$3,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$10.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$10.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$3 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$3);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
  return func(collection, _baseIteratee(predicate, 3));
}

var filter_1 = filter;

/** Used for built-in method references. */
var objectProto$15 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$15.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty$12.call(object, key);
}

var _baseHas = baseHas;

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && _hasPath(object, path, _baseHas);
}

var has_1 = has;

/** `Object#toString` result references. */
var mapTag$6 = '[object Map]';
var setTag$6 = '[object Set]';

/** Used for built-in method references. */
var objectProto$16 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$13 = objectProto$16.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_1(value) &&
      (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }
  var tag = _getTag(value);
  if (tag == mapTag$6 || tag == setTag$6) {
    return !value.size;
  }
  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$13.call(value, key)) {
      return false;
    }
  }
  return true;
}

var isEmpty_1 = isEmpty;

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];

  _baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap;

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map$1(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayMap : _baseMap;
  return func(collection, _baseIteratee(iteratee, 3));
}

var map_1 = map$1;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var _arrayReduce = arrayReduce;

/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function(value, index, collection) {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

var _baseReduce = baseReduce;

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  var func = isArray_1(collection) ? _arrayReduce : _baseReduce,
      initAccum = arguments.length < 3;

  return func(collection, _baseIteratee(iteratee, 4), accumulator, initAccum, _baseEach);
}

var reduce_1 = reduce;

/** `Object#toString` result references. */
var stringTag$4 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$4);
}

var isString_1 = isString;

/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = _baseProperty('length');

var _asciiSize = asciiSize;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff';
var rsComboMarksRange = '\\u0300-\\u036f';
var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange = '\\u20d0-\\u20ff';
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode;

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff';
var rsComboMarksRange$1 = '\\u0300-\\u036f';
var reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f';
var rsComboSymbolsRange$1 = '\\u20d0-\\u20ff';
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']';
var rsCombo = '[' + rsComboRange$1 + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange$1 + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
var rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange$1 + ']?';
var rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

var _unicodeSize = unicodeSize;

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return _hasUnicode(string)
    ? _unicodeSize(string)
    : _asciiSize(string);
}

var _stringSize = stringSize;

/** `Object#toString` result references. */
var mapTag$7 = '[object Map]';
var setTag$7 = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if (isArrayLike_1(collection)) {
    return isString_1(collection) ? _stringSize(collection) : collection.length;
  }
  var tag = _getTag(collection);
  if (tag == mapTag$7 || tag == setTag$7) {
    return collection.size;
  }
  return _baseKeys(collection).length;
}

var size_1 = size;

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
  var isArr = isArray_1(object),
      isArrLike = isArr || isBuffer_1(object) || isTypedArray_1(object);

  iteratee = _baseIteratee(iteratee, 4);
  if (accumulator == null) {
    var Ctor = object && object.constructor;
    if (isArrLike) {
      accumulator = isArr ? new Ctor : [];
    }
    else if (isObject_1(object)) {
      accumulator = isFunction_1(Ctor) ? _baseCreate(_getPrototype(object)) : {};
    }
    else {
      accumulator = {};
    }
  }
  (isArrLike ? _arrayEach : _baseForOwn)(object, function(value, index, object) {
    return iteratee(accumulator, value, index, object);
  });
  return accumulator;
}

var transform_1 = transform;

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? _strictIndexOf(array, value, fromIndex)
    : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

var noop_1 = noop;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$2) ? noop_1 : function(values) {
  return new _Set(values);
};

var _createSet = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE$1) {
    var set$$1 = iteratee ? null : _createSet(array);
    if (set$$1) {
      return _setToArray(set$$1);
    }
    isCommon = false;
    includes = _cacheHas;
    seen = new _SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = _baseRest(function(arrays) {
  return _baseUniq(_baseFlatten(arrays, 1, isArrayLikeObject_1, true));
});

var union_1 = union;

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return _arrayMap(props, function(key) {
    return object[key];
  });
}

var _baseValues = baseValues;

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : _baseValues(object, keys_1(object));
}

var values_1 = values;

/* global window */

var lodash;

if (typeof commonjsRequire === "function") {
  try {
    lodash = {
      clone: clone_1,
      constant: constant_1,
      each: each,
      filter: filter_1,
      has:  has_1,
      isArray: isArray_1,
      isEmpty: isEmpty_1,
      isFunction: isFunction_1,
      isUndefined: isUndefined_1,
      keys: keys_1,
      map: map_1,
      reduce: reduce_1,
      size: size_1,
      transform: transform_1,
      union: union_1,
      values: values_1
    };
  } catch (e) {}
}

if (!lodash) {
  lodash = window._;
}

var lodash_1 = lodash;

var graph = Graph;

var DEFAULT_EDGE_NAME = "\x00";
var GRAPH_NODE = "\x00";
var EDGE_KEY_DELIM = "\x01";

// Implementation notes:
//
//  * Node id query functions should return string ids for the nodes
//  * Edge id query functions should return an "edgeObj", edge object, that is
//    composed of enough information to uniquely identify an edge: {v, w, name}.
//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
//    reference edges. This is because we need a performant way to look these
//    edges up and, object properties, which have string keys, are the closest
//    we're going to get to a performant hashtable in JavaScript.

function Graph(opts) {
  this._isDirected = lodash_1.has(opts, "directed") ? opts.directed : true;
  this._isMultigraph = lodash_1.has(opts, "multigraph") ? opts.multigraph : false;
  this._isCompound = lodash_1.has(opts, "compound") ? opts.compound : false;

  // Label for the graph itself
  this._label = undefined;

  // Defaults to be set when creating a new node
  this._defaultNodeLabelFn = lodash_1.constant(undefined);

  // Defaults to be set when creating a new edge
  this._defaultEdgeLabelFn = lodash_1.constant(undefined);

  // v -> label
  this._nodes = {};

  if (this._isCompound) {
    // v -> parent
    this._parent = {};

    // v -> children
    this._children = {};
    this._children[GRAPH_NODE] = {};
  }

  // v -> edgeObj
  this._in = {};

  // u -> v -> Number
  this._preds = {};

  // v -> edgeObj
  this._out = {};

  // v -> w -> Number
  this._sucs = {};

  // e -> edgeObj
  this._edgeObjs = {};

  // e -> label
  this._edgeLabels = {};
}

/* Number of nodes in the graph. Should only be changed by the implementation. */
Graph.prototype._nodeCount = 0;

/* Number of edges in the graph. Should only be changed by the implementation. */
Graph.prototype._edgeCount = 0;


/* === Graph functions ========= */

Graph.prototype.isDirected = function() {
  return this._isDirected;
};

Graph.prototype.isMultigraph = function() {
  return this._isMultigraph;
};

Graph.prototype.isCompound = function() {
  return this._isCompound;
};

Graph.prototype.setGraph = function(label) {
  this._label = label;
  return this;
};

Graph.prototype.graph = function() {
  return this._label;
};


/* === Node functions ========== */

Graph.prototype.setDefaultNodeLabel = function(newDefault) {
  if (!lodash_1.isFunction(newDefault)) {
    newDefault = lodash_1.constant(newDefault);
  }
  this._defaultNodeLabelFn = newDefault;
  return this;
};

Graph.prototype.nodeCount = function() {
  return this._nodeCount;
};

Graph.prototype.nodes = function() {
  return lodash_1.keys(this._nodes);
};

Graph.prototype.sources = function() {
  var self = this;
  return lodash_1.filter(this.nodes(), function(v) {
    return lodash_1.isEmpty(self._in[v]);
  });
};

Graph.prototype.sinks = function() {
  var self = this;
  return lodash_1.filter(this.nodes(), function(v) {
    return lodash_1.isEmpty(self._out[v]);
  });
};

Graph.prototype.setNodes = function(vs, value) {
  var args = arguments;
  var self = this;
  lodash_1.each(vs, function(v) {
    if (args.length > 1) {
      self.setNode(v, value);
    } else {
      self.setNode(v);
    }
  });
  return this;
};

Graph.prototype.setNode = function(v, value) {
  if (lodash_1.has(this._nodes, v)) {
    if (arguments.length > 1) {
      this._nodes[v] = value;
    }
    return this;
  }

  this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
  if (this._isCompound) {
    this._parent[v] = GRAPH_NODE;
    this._children[v] = {};
    this._children[GRAPH_NODE][v] = true;
  }
  this._in[v] = {};
  this._preds[v] = {};
  this._out[v] = {};
  this._sucs[v] = {};
  ++this._nodeCount;
  return this;
};

Graph.prototype.node = function(v) {
  return this._nodes[v];
};

Graph.prototype.hasNode = function(v) {
  return lodash_1.has(this._nodes, v);
};

Graph.prototype.removeNode =  function(v) {
  var self = this;
  if (lodash_1.has(this._nodes, v)) {
    var removeEdge = function(e) { self.removeEdge(self._edgeObjs[e]); };
    delete this._nodes[v];
    if (this._isCompound) {
      this._removeFromParentsChildList(v);
      delete this._parent[v];
      lodash_1.each(this.children(v), function(child) {
        self.setParent(child);
      });
      delete this._children[v];
    }
    lodash_1.each(lodash_1.keys(this._in[v]), removeEdge);
    delete this._in[v];
    delete this._preds[v];
    lodash_1.each(lodash_1.keys(this._out[v]), removeEdge);
    delete this._out[v];
    delete this._sucs[v];
    --this._nodeCount;
  }
  return this;
};

Graph.prototype.setParent = function(v, parent) {
  if (!this._isCompound) {
    throw new Error("Cannot set parent in a non-compound graph");
  }

  if (lodash_1.isUndefined(parent)) {
    parent = GRAPH_NODE;
  } else {
    // Coerce parent to string
    parent += "";
    for (var ancestor = parent;
         !lodash_1.isUndefined(ancestor);
         ancestor = this.parent(ancestor)) {
      if (ancestor === v) {
        throw new Error("Setting " + parent+ " as parent of " + v +
                        " would create a cycle");
      }
    }

    this.setNode(parent);
  }

  this.setNode(v);
  this._removeFromParentsChildList(v);
  this._parent[v] = parent;
  this._children[parent][v] = true;
  return this;
};

Graph.prototype._removeFromParentsChildList = function(v) {
  delete this._children[this._parent[v]][v];
};

Graph.prototype.parent = function(v) {
  if (this._isCompound) {
    var parent = this._parent[v];
    if (parent !== GRAPH_NODE) {
      return parent;
    }
  }
};

Graph.prototype.children = function(v) {
  if (lodash_1.isUndefined(v)) {
    v = GRAPH_NODE;
  }

  if (this._isCompound) {
    var children = this._children[v];
    if (children) {
      return lodash_1.keys(children);
    }
  } else if (v === GRAPH_NODE) {
    return this.nodes();
  } else if (this.hasNode(v)) {
    return [];
  }
};

Graph.prototype.predecessors = function(v) {
  var predsV = this._preds[v];
  if (predsV) {
    return lodash_1.keys(predsV);
  }
};

Graph.prototype.successors = function(v) {
  var sucsV = this._sucs[v];
  if (sucsV) {
    return lodash_1.keys(sucsV);
  }
};

Graph.prototype.neighbors = function(v) {
  var preds = this.predecessors(v);
  if (preds) {
    return lodash_1.union(preds, this.successors(v));
  }
};

Graph.prototype.isLeaf = function (v) {
  var neighbors;
  if (this.isDirected()) {
    neighbors = this.successors(v);
  } else {
    neighbors = this.neighbors(v);
  }
  return neighbors.length === 0;
};

Graph.prototype.filterNodes = function(filter) {
  var copy = new this.constructor({
    directed: this._isDirected,
    multigraph: this._isMultigraph,
    compound: this._isCompound
  });

  copy.setGraph(this.graph());

  var self = this;
  lodash_1.each(this._nodes, function(value, v) {
    if (filter(v)) {
      copy.setNode(v, value);
    }
  });

  lodash_1.each(this._edgeObjs, function(e) {
    if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
      copy.setEdge(e, self.edge(e));
    }
  });

  var parents = {};
  function findParent(v) {
    var parent = self.parent(v);
    if (parent === undefined || copy.hasNode(parent)) {
      parents[v] = parent;
      return parent;
    } else if (parent in parents) {
      return parents[parent];
    } else {
      return findParent(parent);
    }
  }

  if (this._isCompound) {
    lodash_1.each(copy.nodes(), function(v) {
      copy.setParent(v, findParent(v));
    });
  }

  return copy;
};

/* === Edge functions ========== */

Graph.prototype.setDefaultEdgeLabel = function(newDefault) {
  if (!lodash_1.isFunction(newDefault)) {
    newDefault = lodash_1.constant(newDefault);
  }
  this._defaultEdgeLabelFn = newDefault;
  return this;
};

Graph.prototype.edgeCount = function() {
  return this._edgeCount;
};

Graph.prototype.edges = function() {
  return lodash_1.values(this._edgeObjs);
};

Graph.prototype.setPath = function(vs, value) {
  var self = this,
      args = arguments;
  lodash_1.reduce(vs, function(v, w) {
    if (args.length > 1) {
      self.setEdge(v, w, value);
    } else {
      self.setEdge(v, w);
    }
    return w;
  });
  return this;
};

/*
 * setEdge(v, w, [value, [name]])
 * setEdge({ v, w, [name] }, [value])
 */
Graph.prototype.setEdge = function() {
  var v, w, name, value,
      valueSpecified = false,
      arg0 = arguments[0];

  if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
    v = arg0.v;
    w = arg0.w;
    name = arg0.name;
    if (arguments.length === 2) {
      value = arguments[1];
      valueSpecified = true;
    }
  } else {
    v = arg0;
    w = arguments[1];
    name = arguments[3];
    if (arguments.length > 2) {
      value = arguments[2];
      valueSpecified = true;
    }
  }

  v = "" + v;
  w = "" + w;
  if (!lodash_1.isUndefined(name)) {
    name = "" + name;
  }

  var e = edgeArgsToId(this._isDirected, v, w, name);
  if (lodash_1.has(this._edgeLabels, e)) {
    if (valueSpecified) {
      this._edgeLabels[e] = value;
    }
    return this;
  }

  if (!lodash_1.isUndefined(name) && !this._isMultigraph) {
    throw new Error("Cannot set a named edge when isMultigraph = false");
  }

  // It didn't exist, so we need to create it.
  // First ensure the nodes exist.
  this.setNode(v);
  this.setNode(w);

  this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);

  var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
  // Ensure we add undirected edges in a consistent way.
  v = edgeObj.v;
  w = edgeObj.w;

  Object.freeze(edgeObj);
  this._edgeObjs[e] = edgeObj;
  incrementOrInitEntry(this._preds[w], v);
  incrementOrInitEntry(this._sucs[v], w);
  this._in[w][e] = edgeObj;
  this._out[v][e] = edgeObj;
  this._edgeCount++;
  return this;
};

Graph.prototype.edge = function(v, w, name) {
  var e = (arguments.length === 1
            ? edgeObjToId(this._isDirected, arguments[0])
            : edgeArgsToId(this._isDirected, v, w, name));
  return this._edgeLabels[e];
};

Graph.prototype.hasEdge = function(v, w, name) {
  var e = (arguments.length === 1
            ? edgeObjToId(this._isDirected, arguments[0])
            : edgeArgsToId(this._isDirected, v, w, name));
  return lodash_1.has(this._edgeLabels, e);
};

Graph.prototype.removeEdge = function(v, w, name) {
  var e = (arguments.length === 1
            ? edgeObjToId(this._isDirected, arguments[0])
            : edgeArgsToId(this._isDirected, v, w, name)),
      edge = this._edgeObjs[e];
  if (edge) {
    v = edge.v;
    w = edge.w;
    delete this._edgeLabels[e];
    delete this._edgeObjs[e];
    decrementOrRemoveEntry(this._preds[w], v);
    decrementOrRemoveEntry(this._sucs[v], w);
    delete this._in[w][e];
    delete this._out[v][e];
    this._edgeCount--;
  }
  return this;
};

Graph.prototype.inEdges = function(v, u) {
  var inV = this._in[v];
  if (inV) {
    var edges = lodash_1.values(inV);
    if (!u) {
      return edges;
    }
    return lodash_1.filter(edges, function(edge) { return edge.v === u; });
  }
};

Graph.prototype.outEdges = function(v, w) {
  var outV = this._out[v];
  if (outV) {
    var edges = lodash_1.values(outV);
    if (!w) {
      return edges;
    }
    return lodash_1.filter(edges, function(edge) { return edge.w === w; });
  }
};

Graph.prototype.nodeEdges = function(v, w) {
  var inEdges = this.inEdges(v, w);
  if (inEdges) {
    return inEdges.concat(this.outEdges(v, w));
  }
};

function incrementOrInitEntry(map$$1, k) {
  if (map$$1[k]) {
    map$$1[k]++;
  } else {
    map$$1[k] = 1;
  }
}

function decrementOrRemoveEntry(map$$1, k) {
  if (!--map$$1[k]) { delete map$$1[k]; }
}

function edgeArgsToId(isDirected, v_, w_, name) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +
             (lodash_1.isUndefined(name) ? DEFAULT_EDGE_NAME : name);
}

function edgeArgsToObj(isDirected, v_, w_, name) {
  var v = "" + v_;
  var w = "" + w_;
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  var edgeObj =  { v: v, w: w };
  if (name) {
    edgeObj.name = name;
  }
  return edgeObj;
}

function edgeObjToId(isDirected, edgeObj) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

var version = '2.1.7';

// Includes only the "core" of graphlib
var lib = {
  Graph: graph,
  version: version
};

var json = {
  write: write,
  read: read
};

function write(g) {
  var json = {
    options: {
      directed: g.isDirected(),
      multigraph: g.isMultigraph(),
      compound: g.isCompound()
    },
    nodes: writeNodes(g),
    edges: writeEdges(g)
  };
  if (!lodash_1.isUndefined(g.graph())) {
    json.value = lodash_1.clone(g.graph());
  }
  return json;
}

function writeNodes(g) {
  return lodash_1.map(g.nodes(), function(v) {
    var nodeValue = g.node(v),
        parent = g.parent(v),
        node = { v: v };
    if (!lodash_1.isUndefined(nodeValue)) {
      node.value = nodeValue;
    }
    if (!lodash_1.isUndefined(parent)) {
      node.parent = parent;
    }
    return node;
  });
}

function writeEdges(g) {
  return lodash_1.map(g.edges(), function(e) {
    var edgeValue = g.edge(e),
        edge = { v: e.v, w: e.w };
    if (!lodash_1.isUndefined(e.name)) {
      edge.name = e.name;
    }
    if (!lodash_1.isUndefined(edgeValue)) {
      edge.value = edgeValue;
    }
    return edge;
  });
}

function read(json) {
  var g = new graph(json.options).setGraph(json.value);
  lodash_1.each(json.nodes, function(entry) {
    g.setNode(entry.v, entry.value);
    if (entry.parent) {
      g.setParent(entry.v, entry.parent);
    }
  });
  lodash_1.each(json.edges, function(entry) {
    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
  });
  return g;
}

var components_1 = components;

function components(g) {
  var visited = {},
      cmpts = [],
      cmpt;

  function dfs(v) {
    if (lodash_1.has(visited, v)) return;
    visited[v] = true;
    cmpt.push(v);
    lodash_1.each(g.successors(v), dfs);
    lodash_1.each(g.predecessors(v), dfs);
  }

  lodash_1.each(g.nodes(), function(v) {
    cmpt = [];
    dfs(v);
    if (cmpt.length) {
      cmpts.push(cmpt);
    }
  });

  return cmpts;
}

var priorityQueue = PriorityQueue;

/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */
function PriorityQueue() {
  this._arr = [];
  this._keyIndices = {};
}

/**
 * Returns the number of elements in the queue. Takes `O(1)` time.
 */
PriorityQueue.prototype.size = function() {
  return this._arr.length;
};

/**
 * Returns the keys that are in the queue. Takes `O(n)` time.
 */
PriorityQueue.prototype.keys = function() {
  return this._arr.map(function(x) { return x.key; });
};

/**
 * Returns `true` if **key** is in the queue and `false` if not.
 */
PriorityQueue.prototype.has = function(key) {
  return lodash_1.has(this._keyIndices, key);
};

/**
 * Returns the priority for **key**. If **key** is not present in the queue
 * then this function returns `undefined`. Takes `O(1)` time.
 *
 * @param {Object} key
 */
PriorityQueue.prototype.priority = function(key) {
  var index = this._keyIndices[key];
  if (index !== undefined) {
    return this._arr[index].priority;
  }
};

/**
 * Returns the key for the minimum element in this queue. If the queue is
 * empty this function throws an Error. Takes `O(1)` time.
 */
PriorityQueue.prototype.min = function() {
  if (this.size() === 0) {
    throw new Error("Queue underflow");
  }
  return this._arr[0].key;
};

/**
 * Inserts a new key into the priority queue. If the key already exists in
 * the queue this function returns `false`; otherwise it will return `true`.
 * Takes `O(n)` time.
 *
 * @param {Object} key the key to add
 * @param {Number} priority the initial priority for the key
 */
PriorityQueue.prototype.add = function(key, priority) {
  var keyIndices = this._keyIndices;
  key = String(key);
  if (!lodash_1.has(keyIndices, key)) {
    var arr = this._arr;
    var index = arr.length;
    keyIndices[key] = index;
    arr.push({key: key, priority: priority});
    this._decrease(index);
    return true;
  }
  return false;
};

/**
 * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
 */
PriorityQueue.prototype.removeMin = function() {
  this._swap(0, this._arr.length - 1);
  var min$$1 = this._arr.pop();
  delete this._keyIndices[min$$1.key];
  this._heapify(0);
  return min$$1.key;
};

/**
 * Decreases the priority for **key** to **priority**. If the new priority is
 * greater than the previous priority, this function will throw an Error.
 *
 * @param {Object} key the key for which to raise priority
 * @param {Number} priority the new priority for the key
 */
PriorityQueue.prototype.decrease = function(key, priority) {
  var index = this._keyIndices[key];
  if (priority > this._arr[index].priority) {
    throw new Error("New priority is greater than current priority. " +
        "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
  }
  this._arr[index].priority = priority;
  this._decrease(index);
};

PriorityQueue.prototype._heapify = function(i) {
  var arr = this._arr;
  var l = 2 * i,
      r = l + 1,
      largest = i;
  if (l < arr.length) {
    largest = arr[l].priority < arr[largest].priority ? l : largest;
    if (r < arr.length) {
      largest = arr[r].priority < arr[largest].priority ? r : largest;
    }
    if (largest !== i) {
      this._swap(i, largest);
      this._heapify(largest);
    }
  }
};

PriorityQueue.prototype._decrease = function(index) {
  var arr = this._arr;
  var priority = arr[index].priority;
  var parent;
  while (index !== 0) {
    parent = index >> 1;
    if (arr[parent].priority < priority) {
      break;
    }
    this._swap(index, parent);
    index = parent;
  }
};

PriorityQueue.prototype._swap = function(i, j) {
  var arr = this._arr;
  var keyIndices = this._keyIndices;
  var origArrI = arr[i];
  var origArrJ = arr[j];
  arr[i] = origArrJ;
  arr[j] = origArrI;
  keyIndices[origArrJ.key] = i;
  keyIndices[origArrI.key] = j;
};

var dijkstra_1 = dijkstra;

var DEFAULT_WEIGHT_FUNC = lodash_1.constant(1);

function dijkstra(g, source, weightFn, edgeFn) {
  return runDijkstra(g, String(source),
                     weightFn || DEFAULT_WEIGHT_FUNC,
                     edgeFn || function(v) { return g.outEdges(v); });
}

function runDijkstra(g, source, weightFn, edgeFn) {
  var results = {},
      pq = new priorityQueue(),
      v, vEntry;

  var updateNeighbors = function(edge) {
    var w = edge.v !== v ? edge.v : edge.w,
        wEntry = results[w],
        weight = weightFn(edge),
        distance = vEntry.distance + weight;

    if (weight < 0) {
      throw new Error("dijkstra does not allow negative edge weights. " +
                      "Bad edge: " + edge + " Weight: " + weight);
    }

    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  g.nodes().forEach(function(v) {
    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results[v] = { distance: distance };
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin();
    vEntry = results[v];
    if (vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    edgeFn(v).forEach(updateNeighbors);
  }

  return results;
}

var dijkstraAll_1 = dijkstraAll;

function dijkstraAll(g, weightFunc, edgeFunc) {
  return lodash_1.transform(g.nodes(), function(acc, v) {
    acc[v] = dijkstra_1(g, v, weightFunc, edgeFunc);
  }, {});
}

var tarjan_1 = tarjan;

function tarjan(g) {
  var index = 0,
      stack = [],
      visited = {}, // node id -> { onStack, lowlink, index }
      results = [];

  function dfs(v) {
    var entry = visited[v] = {
      onStack: true,
      lowlink: index,
      index: index++
    };
    stack.push(v);

    g.successors(v).forEach(function(w) {
      if (!lodash_1.has(visited, w)) {
        dfs(w);
        entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
      } else if (visited[w].onStack) {
        entry.lowlink = Math.min(entry.lowlink, visited[w].index);
      }
    });

    if (entry.lowlink === entry.index) {
      var cmpt = [],
          w;
      do {
        w = stack.pop();
        visited[w].onStack = false;
        cmpt.push(w);
      } while (v !== w);
      results.push(cmpt);
    }
  }

  g.nodes().forEach(function(v) {
    if (!lodash_1.has(visited, v)) {
      dfs(v);
    }
  });

  return results;
}

var findCycles_1 = findCycles;

function findCycles(g) {
  return lodash_1.filter(tarjan_1(g), function(cmpt) {
    return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
  });
}

var floydWarshall_1 = floydWarshall;

var DEFAULT_WEIGHT_FUNC$1 = lodash_1.constant(1);

function floydWarshall(g, weightFn, edgeFn) {
  return runFloydWarshall(g,
                          weightFn || DEFAULT_WEIGHT_FUNC$1,
                          edgeFn || function(v) { return g.outEdges(v); });
}

function runFloydWarshall(g, weightFn, edgeFn) {
  var results = {},
      nodes = g.nodes();

  nodes.forEach(function(v) {
    results[v] = {};
    results[v][v] = { distance: 0 };
    nodes.forEach(function(w) {
      if (v !== w) {
        results[v][w] = { distance: Number.POSITIVE_INFINITY };
      }
    });
    edgeFn(v).forEach(function(edge) {
      var w = edge.v === v ? edge.w : edge.v,
          d = weightFn(edge);
      results[v][w] = { distance: d, predecessor: v };
    });
  });

  nodes.forEach(function(k) {
    var rowK = results[k];
    nodes.forEach(function(i) {
      var rowI = results[i];
      nodes.forEach(function(j) {
        var ik = rowI[k];
        var kj = rowK[j];
        var ij = rowI[j];
        var altDistance = ik.distance + kj.distance;
        if (altDistance < ij.distance) {
          ij.distance = altDistance;
          ij.predecessor = kj.predecessor;
        }
      });
    });
  });

  return results;
}

var topsort_1 = topsort;
topsort.CycleException = CycleException;

function topsort(g) {
  var visited = {},
      stack = {},
      results = [];

  function visit(node) {
    if (lodash_1.has(stack, node)) {
      throw new CycleException();
    }

    if (!lodash_1.has(visited, node)) {
      stack[node] = true;
      visited[node] = true;
      lodash_1.each(g.predecessors(node), visit);
      delete stack[node];
      results.push(node);
    }
  }

  lodash_1.each(g.sinks(), visit);

  if (lodash_1.size(visited) !== g.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

function CycleException() {}
CycleException.prototype = new Error(); // must be an instance of Error to pass testing

var isAcyclic_1 = isAcyclic;

function isAcyclic(g) {
  try {
    topsort_1(g);
  } catch (e) {
    if (e instanceof topsort_1.CycleException) {
      return false;
    }
    throw e;
  }
  return true;
}

var dfs_1 = dfs;

/*
 * A helper that preforms a pre- or post-order traversal on the input graph
 * and returns the nodes in the order they were visited. If the graph is
 * undirected then this algorithm will navigate using neighbors. If the graph
 * is directed then this algorithm will navigate using successors.
 *
 * Order must be one of "pre" or "post".
 */
function dfs(g, vs, order) {
  if (!lodash_1.isArray(vs)) {
    vs = [vs];
  }

  var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);

  var acc = [],
      visited = {};
  lodash_1.each(vs, function(v) {
    if (!g.hasNode(v)) {
      throw new Error("Graph does not have node: " + v);
    }

    doDfs(g, v, order === "post", visited, navigation, acc);
  });
  return acc;
}

function doDfs(g, v, postorder, visited, navigation, acc) {
  if (!lodash_1.has(visited, v)) {
    visited[v] = true;

    if (!postorder) { acc.push(v); }
    lodash_1.each(navigation(v), function(w) {
      doDfs(g, w, postorder, visited, navigation, acc);
    });
    if (postorder) { acc.push(v); }
  }
}

var postorder_1 = postorder;

function postorder(g, vs) {
  return dfs_1(g, vs, "post");
}

var preorder_1 = preorder;

function preorder(g, vs) {
  return dfs_1(g, vs, "pre");
}

var prim_1 = prim;

function prim(g, weightFunc) {
  var result = new graph(),
      parents = {},
      pq = new priorityQueue(),
      v;

  function updateNeighbors(edge) {
    var w = edge.v === v ? edge.w : edge.v,
        pri = pq.priority(w);
    if (pri !== undefined) {
      var edgeWeight = weightFunc(edge);
      if (edgeWeight < pri) {
        parents[w] = v;
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (g.nodeCount() === 0) {
    return result;
  }

  lodash_1.each(g.nodes(), function(v) {
    pq.add(v, Number.POSITIVE_INFINITY);
    result.setNode(v);
  });

  // Start from an arbitrary node
  pq.decrease(g.nodes()[0], 0);

  var init = false;
  while (pq.size() > 0) {
    v = pq.removeMin();
    if (lodash_1.has(parents, v)) {
      result.setEdge(v, parents[v]);
    } else if (init) {
      throw new Error("Input graph is not connected: " + g);
    } else {
      init = true;
    }

    g.nodeEdges(v).forEach(updateNeighbors);
  }

  return result;
}

var alg = {
  components: components_1,
  dijkstra: dijkstra_1,
  dijkstraAll: dijkstraAll_1,
  findCycles: findCycles_1,
  floydWarshall: floydWarshall_1,
  isAcyclic: isAcyclic_1,
  postorder: postorder_1,
  preorder: preorder_1,
  prim: prim_1,
  tarjan: tarjan_1,
  topsort: topsort_1
};

/**
 * Copyright (c) 2014, Chris Pettitt
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



var graphlib = {
  Graph: lib.Graph,
  json: json,
  alg: alg,
  version: lib.version
};

var graphlib_1 = graphlib.Graph;
var graphlib_3 = graphlib.alg;

/**
 * Create a new graph where nodes in the same rank set are merged into one node.
 *
 * Depends on the "backwards" attribute of the nodes in G, and the "delta"
 * atribute of the edges.
 *
 */
function groupedGraph (G, rankSets) {
  if ( rankSets === void 0 ) rankSets = [];

  // Not multigraph because this is only used for calculating ranks
  var GG = new graphlib_1({directed: true});
  if (G.nodes().length === 0) { return GG }

  // Make sure there is a minimum-rank set
  rankSets = ensureSmin(G, rankSets);

  // Construct map of node ids to the set they are in, if any
  var nodeSets = d3Collection.map();
  var set$$1;
  var id;
  var i;
  var j;
  for (i = 0; i < rankSets.length; ++i) {
    set$$1 = rankSets[i];
    if (!set$$1.nodes || set$$1.nodes.length === 0) { continue }
    id = '' + i;
    for (j = 0; j < set$$1.nodes.length; ++j) {
      nodeSets.set(set$$1.nodes[j], id);
    }
    GG.setNode(id, { type: set$$1.type, nodes: set$$1.nodes });
  }

  // use i to keep counting new ids
  var nodes = G.nodes();
  G.nodes().forEach(function (u) {
    var d = G.node(u);
    if (!nodeSets.has(u)) {
      id = '' + (i++);
      set$$1 = { type: 'same', nodes: [u] };
      nodeSets.set(u, id);
      GG.setNode(id, set$$1);
    }
  });

  // Add edges between nodes/groups
  G.edges().forEach(function (e) {
    var d = G.edge(e);
    var sourceSet = nodeSets.get(e.v);
    var targetSet = nodeSets.get(e.w);

    // Minimum edge length depends on direction of nodes:
    //  -> to -> : 1
    //  -> to <- : 0
    //  <- to -> : 0 (in opposite direction??)
    //  <- to <- : 1 in opposite direction
    var edge = GG.edge(sourceSet, targetSet) || { delta: 0 };
    if (sourceSet === targetSet) {
      edge.delta = 0;
      GG.setEdge(sourceSet, targetSet, edge);
    } else if (G.node(e.v).backwards) {
      edge.delta = Math.max(edge.delta, G.node(e.w).backwards ? 1 : 0);
      GG.setEdge(targetSet, sourceSet, edge);
    } else {
      edge.delta = Math.max(edge.delta, G.node(e.w).backwards ? 0 : 1);
      GG.setEdge(sourceSet, targetSet, edge);
    }
  });

  return GG
}

// export function linkDelta (nodeBackwards, link) {
//   if (nodeBackwards(link.source)) {
//     return nodeBackwards(link.target) ? 1 : 0
//   } else {
//     return nodeBackwards(link.target) ? 0 : 1
//   }
// }

function ensureSmin (G, rankSets) {
  for (var i = 0; i < rankSets.length; ++i) {
    if (rankSets[i].type === 'min') {
      return rankSets  // ok
    }
  }

  // find the first sourceSet node, or else use the first node
  var sources = G.sources();
  var n0 = sources.length ? sources[0] : G.nodes()[0];
  return [{ type: 'min', nodes: [ n0 ] }].concat(rankSets)
}

/**
 * Reverse edges in G to make it acyclic
 */
function makeAcyclic (G, v0) {
  var tree = findSpanningTree(G, v0);

  G.edges().forEach(function (e) {
    var rel = nodeRelationship(tree, e.v, e.w);
    if (rel < 0) {
      var label = G.edge(e) || {};
      label.reversed = true;
      G.removeEdge(e);
      G.setEdge(e.w, e.v, label);
    }
  });

  return G
}

// find spanning tree, starting from the given node.
// return new graph where nodes have depth and thread
function findSpanningTree (G, v0) {
  var visited = d3Collection.set();
  var tree = new graphlib_1({directed: true});
  var thread = [];

  if (!G.hasNode(v0)) { throw Error('node not in graph') }

  doDfs$1(G, v0, visited, tree, thread);
  G.nodes().forEach(function (u) {
    if (!visited.has(u)) {
      doDfs$1(G, u, visited, tree, thread);
    }
  });

  thread.forEach(function (u, i) {
    tree.node(u).thread = (i + 1 < thread.length) ? thread[i + 1] : thread[0];
  });

  return tree
}

/**
 * Returns 1 if w is a descendent of v, -1 if v is a descendent of w, and 0 if
 * they are unrelated.
 */
function nodeRelationship (tree, v, w) {
  var V = tree.node(v);
  var W = tree.node(w);
  if (V.depth < W.depth) {
    var u = V.thread;  // next node
    while (tree.node(u).depth > V.depth) {
      if (u === w) { return 1 }
      u = tree.node(u).thread;
    }
  } else if (W.depth < V.depth) {
    var u$1 = W.thread;  // next node
    while (tree.node(u$1).depth > W.depth) {
      if (u$1 === v) { return -1 }
      u$1 = tree.node(u$1).thread;
    }
  }
  return 0
}

function doDfs$1 (G, v, visited, tree, thread, depth) {
  if ( depth === void 0 ) depth = 0;

  if (!visited.has(v)) {
    visited.add(v);
    thread.push(v);
    tree.setNode(v, { depth: depth });

    // It doesn't seem to cause a problem with letters as node ids, but numbers
    // are sorted when using G.successors(). So use G.outEdges() instead.
    var next = G.outEdges(v).map(function (e) { return e.w; });
    next.forEach(function (w, i) {
      if (!visited.has(w)) {
        tree.setEdge(v, w, { delta: 1 });
      }
      doDfs$1(G, w, visited, tree, thread, depth + 1);
    });
  }
}

/**
 * Take an acyclic graph and assign initial ranks to the nodes
 */
function assignInitialRanks (G) {
  // Place nodes on queue when they have no unmarked in-edges. Initially, this
  // means sources.
  var queue = G.sources();
  var seen = d3Collection.set();
  var marked = d3Collection.set();

  // Mark any loops, since they don't affect rank assignment
  G.edges().forEach(function (e) {
    if (e.v === e.w) { marked.add(edgeIdString(e)); }
  });

  G.nodes().forEach(function (v) {
    G.node(v).rank = 0;
  });

  var loop = function () {
    var v = queue.shift();
    seen.add(v);

    var V = G.node(v);
    if (!V) { G.setNode(v, (V = {})); }

    // Set rank to minimum of incoming edges
    V.rank = 0;
    G.inEdges(v).forEach(function (e) {
      var delta = G.edge(e).delta === undefined ? 1 : G.edge(e).delta;
      V.rank = Math.max(V.rank, G.node(e.v).rank + delta);
    });

    // Mark outgoing edges
    G.outEdges(v).forEach(function (e) {
      marked.add(edgeIdString(e));
    });

    // Add nodes to queue when they have no unmarked in-edges.
    G.nodes().forEach(function (n) {
      if (queue.indexOf(n) < 0 && !seen.has(n) &&
          !G.inEdges(n).some(function (e) { return !marked.has(edgeIdString(e)); })) {
        queue.push(n);
      }
    });
  };

  while (queue.length > 0) loop();
}

function edgeIdString (e) {
  return e.v + '\x01' + e.w + '\x01' + e.name
}

/**
 * Assign ranks to the nodes in G, according to rankSets.
 */
function assignRanks (G, rankSets) {
  // Group nodes together, and add additional edges from Smin to sources
  var GG = groupedGraph(G, rankSets);
  if (GG.nodeCount() === 0) { return }

  // Add additional edges from Smin to sources
  addTemporaryEdges(GG);

  // Make the graph acyclic
  makeAcyclic(GG, '0');

  // Assign the initial ranks
  assignInitialRanks(GG);

  // XXX improve initial ranking...
  moveSourcesRight(GG);

  // Apply calculated ranks to original graph
  // const ranks = []
  GG.nodes().forEach(function (u) {
    var groupedNode = GG.node(u);
    // while (node.rank >= ranks.length) ranks.push([])
    groupedNode.nodes.forEach(function (v) {
      G.node(v).rank = groupedNode.rank;
    });
  });
  // return ranks
}

// export function nodeBackwards (link) {
//   if (link.source.direction === 'l') {
//     return link.target.direction === 'l' ? 1 : 0
//   } else {
//     return link.target.direction === 'l' ? 0 : 1
//   }
// }

function addTemporaryEdges (GG) {
  // Add temporary edges between Smin and sources
  GG.sources().forEach(function (u) {
    if (u !== '0') {
      GG.setEdge('0', u, { temp: true, delta: 0 });
    }
  });

  // XXX Should also add edges from sinks to Smax

  // G.nodes().forEach(u => {
  //   if (!nodeSets.has(u)) {
  //     GG.
  //   }
  // });
}

function moveSourcesRight (GG) {
  GG.edges().forEach(function (e) {
    var edge = GG.edge(e);
    if (edge.temp) { moveRight(e.w); }
  });

  function moveRight (v) {
    var V = GG.node(v);
    var rank = d3Array.min(GG.outEdges(v), function (e) { return GG.node(e.w).rank - GG.edge(e).delta; });
    if (rank !== undefined) { V.rank = rank; }
  }
}

function initialOrdering (G, ranks) {
  var order = [];
  if (ranks.length === 0) { return order }

  // Start with sources & nodes in rank 0
  var start = G.sources();
  var nodeRanks = d3Collection.map();
  ranks.forEach(function (nodes, i) {
    order.push([]);
    nodes.forEach(function (u) {
      if (i === 0 && start.indexOf(u) < 0) { start.push(u); }
      nodeRanks.set(u, i);
    });
  });

  graphlib_3.preorder(G, start).forEach(function (u) {
    order[nodeRanks.get(u)].push(u);
  });

  return order
}

/** @module node-ordering/count-crossings */

/**
 * Count the total number of crossings between 2 layers.
 *
 * This is the sum of the countBetweenCrossings and countLoopCrossings.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
function countCrossings (G, orderA, orderB) {
  return (
    countBetweenCrossings(G, orderA, orderB) // +
    // countLoopCrossings(G, orderA, orderB)
  )
}

/**
 * Count the number of crossings of edges passing between 2 layers.
 *
 * Algorithm from
 * http://jgaa.info/accepted/2004/BarthMutzelJuenger2004.8.2.pdf
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
function countBetweenCrossings (G, orderA, orderB) {
  var north;
  var south;
  var q;

  if (orderA.length > orderB.length) {
    north = orderA;
    south = orderB;
  } else {
    north = orderB;
    south = orderA;
  }
  q = south.length;

  // lexicographically sorted edges from north to south
  var southSeq = [];
  north.forEach(function (u) {
    south.forEach(function (v, j) {
      if (G.hasEdge(u, v) || G.hasEdge(v, u)) { southSeq.push(j); }
    });
  });

  // build accumulator tree
  var firstIndex = 1;
  while (firstIndex < q) { firstIndex *= 2; }
  var treeSize = 2 * firstIndex - 1;  // number of tree nodes
  firstIndex -= 1;                      // index of leftmost leaf

  var tree = new Array(treeSize);
  for (var i = 0; i < treeSize; i++) { tree[i] = 0; }

  // count the crossings
  var count = 0;
  southSeq.forEach(function (k) {
    var index = k + firstIndex;
    tree[index]++;
    while (index > 0) {
      if (index % 2) { count += tree[index + 1]; }
      index = Math.floor((index - 1) / 2);
      tree[index]++;
    }
  });

  return count
}

/**
 * Count the number of crossings from within-layer edges.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */

function swapNodes (G, order) {
  var improved = true;
  while (improved) {
    improved = false;
    for (var i = 0; i < order.length; ++i) {
      for (var j = 0; j < order[i].length - 1; ++j) {
        var count0 = allCrossings$1(G, order, i);
        transpose(order[i], j, j + 1);
        var count1 = allCrossings$1(G, order, i);

        if (count1 < count0) {
          improved = true;
        } else {
          transpose(order[i], j, j + 1);  // put back
        }
      }
    }
  }
}

function allCrossings$1 (G, order, i) {
  var count = 0;
  if (i > 0) {
    count += countCrossings(G, order[i - 1], order[i]);
  }
  if (i + 1 < order.length) {
    count += countCrossings(G, order[i], order[i + 1]);
  }
  return count
}

function transpose (list, i, j) {
  var tmp = list[i];
  list[i] = list[j];
  list[j] = tmp;
}

function medianValue (positions) {
  var m = Math.floor(positions.length / 2);
  if (positions.length === 0) {
    return -1
  } else if (positions.length % 2 === 1) {
    return positions[m]
  } else if (positions.length === 2) {
    return (positions[0] + positions[1]) / 2
  } else {
    var left = positions[m - 1] - positions[0];
    var right = positions[positions.length - 1] - positions[m];
    return (positions[m - 1] * right + positions[m] * left) / (left + right)
  }
}

function neighbourPositions (G, order, i, j, u, includeLoops) {
  if ( includeLoops === void 0 ) includeLoops = false;

  // current rank i
  // neighbour rank j
  var thisRank = order[i];
  var otherRank = order[j];

  var positions = [];

  // neighbouring positions on other rank
  otherRank.forEach(function (n, i) {
    if (G.nodeEdges(n, u).length > 0) {
      positions.push(i);
    }
  });

  if (positions.length === 0 && includeLoops) {
    // if no neighbours in other rank, look for loops to this rank
    // XXX only on one side?
    thisRank.forEach(function (n, i) {
      if (G.nodeEdges(n, u).length > 0) {
        positions.push(i + 0.5);
      }
    });
  }

  positions.sort(function (a, b) { return a - b; });

  return positions
}

/**
 * Sort arr according to order. -1 in order means stay in same position.
 */
function sortByPositions (arr, order) {
  var origOrder = d3Collection.map(arr.map(function (d, i) { return [d, i]; }), function (d) { return d[0]; });

  // console.log('sorting', arr, order, origOrder)
  for (var i = 1; i < arr.length; ++i) {
    // console.group('start', i, arr[i])
    for (var k = i; k > 0; --k) {
      var j = k - 1;
      var a = order.get(arr[j]);
      var b = order.get(arr[k]);

      // count back over any fixed positions (-1)
      while ((a = order.get(arr[j])) === -1 && j > 0) { j--; }

      // console.log(j, k, arr[j], arr[k], a, b)
      if (b === -1 || a === -1) {
        // console.log('found -1', a, b, 'skipping', j, k)
        break
      }

      if (a === b) {
        a = origOrder.get(arr[j]);
        b = origOrder.get(arr[k]);
        // console.log('a == b, switching to orig order', a, b)
      }

      if (b >= a) {
        // console.log('k > k -1, stopping')
        break
      }
      // console.log('swapping', arr[k], arr[j])
      // swap arr[k], arr[j]
      var assign;
      (assign = [arr[j], arr[k]], arr[k] = assign[0], arr[j] = assign[1]);
      // console.log(arr)
    }
    // console.groupEnd()
  }
  // console.log('-->', arr)
}

function sortNodes$1 (G, order, sweepDirection, includeLoops) {
  if ( sweepDirection === void 0 ) sweepDirection = 1;
  if ( includeLoops === void 0 ) includeLoops = false;

  if (sweepDirection > 0) {
    var loop = function ( r ) {
      var medians = d3Collection.map();
      order[r].forEach(function (u) {
        var neighbour = medianValue(neighbourPositions(G, order, r, r - 1, u, includeLoops));
        medians.set(u, neighbour);
      });
      sortByPositions(order[r], medians);
    };

    for (var r = 1; r < order.length; ++r) loop( r );
  } else {
    var loop$1 = function ( r ) {
      var medians$1 = d3Collection.map();
      order[r].forEach(function (u) {
        var neighbour = medianValue(neighbourPositions(G, order, r, r + 1, u, includeLoops));
        medians$1.set(u, neighbour);
      });
      sortByPositions(order[r], medians$1);
    };

    for (var r$1 = order.length - 2; r$1 >= 0; --r$1) loop$1( r$1 );
  }
}

/** @module node-ordering */

/**
 * Sorts the nodes in G, setting the `depth` attribute on each.
 *
 * @param {Graph} G - The graph. Nodes must have a `rank` attribute.
 *
 */
function sortNodes (G, maxIterations) {
  if ( maxIterations === void 0 ) maxIterations = 25;

  var ranks = getRanks(G);
  var order = initialOrdering(G, ranks);
  var best = order;
  var i = 0;

  while (i++ < maxIterations) {
    sortNodes$1(G, order, (i % 2 === 0));
    swapNodes(G, order);
    if (allCrossings(G, order) < allCrossings(G, best)) {
      // console.log('improved', allCrossings(G, order), order);
      best = copy(order);
    }
  }

  // Assign depth to nodes
  // const depths = map()
  best.forEach(function (nodes) {
    nodes.forEach(function (u, i) {
      // depths.set(u, i)
      G.node(u).depth = i;
    });
  });
}

function getRanks (G) {
  var ranks = [];
  G.nodes().forEach(function (u) {
    var r = G.node(u).rank || 0;
    while (r >= ranks.length) { ranks.push([]); }
    ranks[r].push(u);
  });
  return ranks
}

function allCrossings (G, order) {
  var count = 0;
  for (var i = 0; i < order.length - 1; ++i) {
    count += countCrossings(G, order[i], order[i + 1]);
  }
  return count
}

function copy (order) {
  var result = [];
  order.forEach(function (rank) {
    result.push(rank.map(function (d) { return d; }));
  });
  return result
}

function addDummyNodes (G) {
  // Add edges & dummy nodes
  if (typeof G.graph() !== 'object') { G.setGraph({}); }
  G.graph().dummyChains = [];
  G.edges().forEach(function (e) { return normaliseEdge(G, e); });
}

// based on https://github.com/cpettitt/dagre/blob/master/lib/normalize.js
function normaliseEdge (G, e) {
  var edge = G.edge(e);
  var dummies = dummyNodes(G.node(e.v), G.node(e.w));
  if (dummies.length === 0) { return }

  G.removeEdge(e);

  var v = e.v;
  dummies.forEach(function (dummy, i) {
    var id = "__" + (e.v) + "_" + (e.w) + "_" + i;
    if (!G.hasNode(id)) {
      dummy.dummy = 'edge';
      G.setNode(id, dummy);
      if (i === 0) {
        G.graph().dummyChains.push(id);
      }
    }
    addDummyEdge(v, (v = id));
  });
  addDummyEdge(v, e.w);

  function addDummyEdge (v, w) {
    var label = { points: [], value: edge.value, origEdge: e, origLabel: edge };
    G.setEdge(v, w, label, e.name);
  }
}

function removeDummyNodes (G) {
  var chains = G.graph().dummyChains || [];
  chains.forEach(function (v) {
    var node = G.node(v);
    var dummyEdges = G.inEdges(v).map(function (e) { return G.edge(e); });

    // Set dy and starting point of edge and add back to graph
    dummyEdges.forEach(function (dummyEdge) {
      dummyEdge.origLabel.dy = dummyEdge.dy;
      dummyEdge.origLabel.x0 = dummyEdge.x0;
      dummyEdge.origLabel.y0 = dummyEdge.y0;
      dummyEdge.origLabel.r0 = dummyEdge.r0;
      dummyEdge.origLabel.d0 = dummyEdge.d0;
      G.setEdge(dummyEdge.origEdge, dummyEdge.origLabel);
    });
    var r1s = dummyEdges.map(function (dummyEdge) { return dummyEdge.r1; });

    // Walk through chain
    var w;
    while (node.dummy) {
      dummyEdges = G.outEdges(v).map(function (e) { return G.edge(e); });
      dummyEdges.forEach(function (dummyEdge, i) {
        dummyEdge.origLabel.points.push({
          x: (node.x0 + node.x1) / 2,
          y: dummyEdge.y0,
          d: dummyEdge.d0,
          ro: dummyEdge.r0,
          ri: r1s[i]  // from last edge
        });
      });
      r1s = dummyEdges.map(function (dummyEdge) { return dummyEdge.r1; });

      // move on
      w = G.successors(v)[0];
      G.removeNode(v);
      node = G.node(v = w);
    }

    // Set ending point of edge
    dummyEdges.forEach(function (dummyEdge) {
      dummyEdge.origLabel.x1 = dummyEdge.x1;
      dummyEdge.origLabel.y1 = dummyEdge.y1;
      dummyEdge.origLabel.r1 = dummyEdge.r1;
      dummyEdge.origLabel.d1 = dummyEdge.d1;
    });
  });
}

function dummyNodes (source, target) {
  var dummyNodes = [];
  var r = source.rank;

  if (r + 1 <= target.rank) {
    // add more to get forwards
    if (source.backwards) {
      dummyNodes.push({rank: r, backwards: false});  // turn around
    }
    while (++r < target.rank) {
      dummyNodes.push({rank: r, backwards: false});
    }
    if (target.backwards) {
      dummyNodes.push({rank: r, backwards: false});  // turn around
    }
  } else if (r > target.rank) {
    // add more to get backwards
    if (!source.backwards) {
      dummyNodes.push({rank: r, backwards: true});  // turn around
    }
    while (r-- > target.rank + 1) {
      dummyNodes.push({rank: r, backwards: true});
    }
    if (!target.backwards) {
      dummyNodes.push({rank: r, backwards: true});  // turn around
    }
  }

  return dummyNodes
}

function nestGraph (nodes) {
  var maxRank = d3Array.max(nodes, function (d) { return d.rank || 0; }) || 0;
  var maxBand = d3Array.max(nodes, function (d) { return d.band || 0; }) || 0;

  // const nodes = graph.nodes().concat(graph.dummyNodes())

  var nested = d3Collection.nest()
    .key(function (d) { return d.rank || 0; })
    .key(function (d) { return d.band || 0; })
    .sortValues(function (a, b) { return a.depth - b.depth; })
    .map(nodes);

  var result = new Array(maxRank + 1);
  var rank;
  for (var i = 0; i <= maxRank; ++i) {
    result[i] = new Array(maxBand + 1);
    rank = nested.get(i);
    if (rank) {
      for (var j = 0; j <= maxBand; ++j) {
        result[i][j] = rank.get(j) || [];
      }
    } else {
      for (var j$1 = 0; j$1 <= maxBand; ++j$1) {
        result[i][j$1] = [];
      }
    }
  }

  result.bandValues = bandValues(result);

  return result
}

function bandValues (nested) {
  if (nested.length === 0 || nested[0].length === 0) { return [] }

  var Nb = nested[0].length;
  var values = new Array(Nb);
  for (var i = 0; i < Nb; i++) { values[i] = 0; }

  nested.forEach(function (rank) {
    rank.forEach(function (band, j) {
      var total = d3Array.sum(band, function (d) { return d.value; });
      values[j] = Math.max(values[j], total);
    });
  });

  return values
}

// export function minEdgeDx (w, y0, y1) {
//   console.log('mindx', w, y0, y1)
//   const dy = y1 - y0
//   const ay = Math.abs(dy) - w  // final sign doesn't matter
//   const dx2 = w * w - ay * ay
//   const dx = dx2 >= 0 ? Math.sqrt(dx2) : w
//   return dx
// }

function positionHorizontally (G, width, nodeWidth) {
  // const minWidths = new Array(maxRank).fill(0)
  // G.edges().forEach(e => {
  //   const r0 = G.node(e.v).rank || 0
  //   minWidths[r0] = Math.max(minWidths[r0], minEdgeDx(G.edge(e).dy, G.node(e.v).y, G.node(e.w).y))
  // })
  // for (let i = 0; i < nested.length - 1; ++i) {
  //   minWidths[i] = 0
  //   nested[i].forEach(band => {
  //     band.forEach(d => {
  //       // edges for dummy nodes, outgoing for real nodes
  //       (d.outgoing || d.edges).forEach(e => {
  //         minWidths[i] = Math.max(minWidths[i], minEdgeDx(e))
  //       })
  //     })
  //   })
  // }
  // const totalMinWidth = sum(minWidths)
  // let dx
  // if (totalMinWidth > width) {
  //   // allocate fairly
  //   dx = minWidths.map(w => width * w / totalMinWidth)
  // } else {
  //   const spare = (width - totalMinWidth) / (nested.length - 1)
  //   dx = minWidths.map(w => w + spare)
  // }

  var maxRank = d3Array.max(G.nodes(), function (u) { return G.node(u).rank || 0; }) || 0;
  var dx = (width - nodeWidth) / maxRank;

  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.x0 = dx * (node.rank || 0);
    node.x1 = node.x0 + nodeWidth;
  });
}

function defaultSeparation (a, b) {
  return 1
}

function positionNodesVertically () {
  var separation = defaultSeparation;

  function layout (nested, totalHeight, whitespace) {
    nested.forEach(function (layer) {
      var y = 0;
      layer.forEach(function (band, j) {
        // Height of this band, based on fraction of value
        var bandHeight = nested.bandValues[j] / d3Array.sum(nested.bandValues) * totalHeight;

        var margin = whitespace * bandHeight / 5;
        var height = bandHeight - 2 * margin;
        var total = d3Array.sum(band, function (d) { return d.dy; });
        var gaps = band.map(function (d, i) {
          if (!d.value) { return 0 }
          return band[i + 1] ? separation(band[i], band[i + 1], layout) : 0
        });
        var space = Math.max(0, height - total);
        var kg = d3Array.sum(gaps) ? space / d3Array.sum(gaps) : 0;

        var isFirst = true;
        var isLast = true;  // XXX bands

        var yy = y + margin;
        if (band.length === 1) {
          // centre vertically
          yy += (height - band[0].dy) / 2;
        }

        var prevGap = isFirst ? Number.MAX_VALUE : 0;  // edge of graph
        band.forEach(function (node, i) {
          node.y = yy;
          node.spaceAbove = prevGap;
          node.spaceBelow = gaps[i] * kg;
          yy += node.dy + node.spaceBelow;
          prevGap = node.spaceBelow;

          // XXX is this a good idea?
          if (node.data && node.data.forceY !== undefined) {
            node.y = margin + node.data.forceY * (height - node.dy);
          }
        });
        if (band.length > 0) {
          band[band.length - 1].spaceBelow = isLast ? Number.MAX_VALUE : 0;  // edge of graph
        }

        y += bandHeight;
      });
    });
  }

  layout.separation = function (x) {
    if (!arguments.length) { return separation }
    separation = required$1(x);
    return layout
  };

  return layout
}

function required$1 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function prepareNodePorts (G, sortPorts) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    var ports = d3Collection.map();
    function getOrSet (id, side) {
      if (ports.has(id)) { return ports.get(id) }
      var port = { id: id, node: node.data, side: side, incoming: [], outgoing: [] };
      ports.set(id, port);
      return port
    }

    G.inEdges(u).forEach(function (e) {
      var edge = G.edge(e);
      var port = getOrSet(edge.targetPortId || 'in', node.direction !== 'l' ? 'west' : 'east');
      port.incoming.push(e);
      edge.targetPort = port;
    });
    G.outEdges(u).forEach(function (e) {
      var edge = G.edge(e);
      var port = getOrSet(edge.sourcePortId || 'out', node.direction !== 'l' ? 'east' : 'west');
      port.outgoing.push(e);
      edge.sourcePort = port;
    });

    node.ports = ports.values();
    node.ports.sort(sortPorts);

    // Set positions of ports, roughly -- so the other endpoints of links are
    // known approximately when being sorted.
    var y = {west: 0, east: 0};
    var i = {west: 0, east: 0};
    node.ports.forEach(function (port) {
      port.y = y[port.side];
      port.index = i[port.side];
      port.dy = Math.max(d3Array.sum(port.incoming, function (e) { return G.edge(e).dy; }),
                         d3Array.sum(port.outgoing, function (e) { return G.edge(e).dy; }));
      var x = (port.side === 'west' ? node.x0 : node.x1);

      port.outgoing.forEach(function (e) {
        var link = G.edge(e);
        link.x0 = x;
        link.y0 = node.y + port.y + link.dy / 2;
      });
      port.incoming.forEach(function (e) {
        var link = G.edge(e);
        link.x1 = x;
        link.y1 = node.y + port.y + link.dy / 2;
      });
      y[port.side] += port.dy;
      i[port.side] += 1;
    });
  });
}

function linkDirection (G, e, head) {
  if ( head === void 0 ) head = true;

  if (e.v === e.w) {
    // pretend self-links go downwards
    return Math.PI / 2 * (head ? +1 : -1)
  } else {
    // const source = G.node(e.v)
    // const target = G.node(e.w)
    // return Math.atan2(target.y - source.y,
    //                   target.x0 - source.x1)
    var link = G.edge(e);
    return Math.atan2(link.y1 - link.y0,
                      link.x1 - link.x0)
  }
}

/** @module edge-ordering */

/**
 * Order the edges at all nodes.
 */
function orderEdges (G, opts) {
  G.nodes().forEach(function (u) { return orderEdgesOne(G, u, opts); });
}

/**
 * Order the edges at the given node.
 * The ports have already been setup and sorted.
 */
function orderEdgesOne (G, v) {
  var node = G.node(v);
  node.ports.forEach(function (port) {
    port.incoming.sort(compareDirection(G, node, false));
    port.outgoing.sort(compareDirection(G, node, true));
  });
}

/**
 * Sort links based on their endpoints & type
 */
function compareDirection (G, node, head) {
  if ( head === void 0 ) head = true;

  return function (a, b) {
    var da = linkDirection(G, a, head);
    var db = linkDirection(G, b, head);
    var c = head ? 1 : -1;

    // links between same node, sort on type
    if (a.v === b.v && a.w === b.w && Math.abs(da - db) < 1e-3) {
      if (typeof a.name === 'number' && typeof b.name === 'number') {
        return a.name - b.name
      } else if (typeof a.name === 'string' && typeof b.name === 'string') {
        return a.name.localeCompare(b.name)
      } else {
        return 0
      }
    }

    // loops to same slice based on y-position
    if (Math.abs(da - db) < 1e-3) {
      if (a.w === b.w) {
        return G.node(b.v).y - G.node(a.v).y
      } else if (a.v === b.v) {
        return G.node(b.w).y - G.node(a.w).y
      } else {
        return 0
      }
    }

    // otherwise sort by direction
    return c * (da - db)
  }
}

function findFirst(links, p) {
  var jmid = null;
  for (var j = 0; j < links.length; ++j) {
    if (p(links[j])) { jmid = j; break; }
  }
  return jmid;
}


/**
 * Adjust radii of curvature to avoid overlaps, as much as possible.
 * @param links - the list of links, ordered from outside to inside of bend
 * @param rr - "r0" or "r1", the side to work on
 */
function sweepCurvatureInwards(links, rr) {
  if (links.length === 0) { return; }

  // sweep from inside of curvature towards outside
  var Rmin = 0, h;
  for (var i = links.length - 1; i >= 0; --i) {
    h = links[i].dy / 2;
    if (links[i][rr] - h < Rmin) {  // inner radius
      links[i][rr] = Math.min(links[i].Rmax, Rmin + h);
    }
    Rmin = links[i][rr] + h;
  }

  // sweep from outside of curvature towards centre
  var Rmax = links[0].Rmax + links[0].dy / 2;
  for (var i$1 = 0; i$1 < links.length; ++i$1) {
    h = links[i$1].dy / 2;
    if (links[i$1][rr] + h > Rmax) {  // outer radius
      links[i$1][rr] = Math.max(h, Rmax - h);
    }
    Rmax = links[i$1][rr] - h;
  }

}

/**
 * Edge positioning.
 *
 * @module link-positioning
 */

/*
 * Requires incoming and outgoing attributes on nodes
 */
function layoutLinks (G) {
  setEdgeEndpoints(G);
  setEdgeCurvatures(G);
  return G
}

function setEdgeEndpoints (G) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.ports.forEach(function (port) {
      var sy = node.y + port.y;
      var ty = node.y + port.y;

      port.outgoing.forEach(function (e) {
        var link = G.edge(e);
        // link.x0 = node.x1
        link.y0 = sy + link.dy / 2;
        link.d0 = node.backwards ? 'l' : 'r';
        link.dy = link.dy;
        sy += link.dy;
      });

      port.incoming.forEach(function (e) {
        var link = G.edge(e);
        // link.x1 = node.x0
        link.y1 = ty + link.dy / 2;
        link.d1 = node.backwards ? 'l' : 'r';
        link.dy = link.dy;
        ty += link.dy;
      });
    });
  });
}

function setEdgeCurvatures (G) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.ports.forEach(function (port) {
      setEdgeEndCurvatures(G, port.outgoing, 'r0');
      setEdgeEndCurvatures(G, port.incoming, 'r1');
    });
  });
}

function maximumRadiusOfCurvature (link) {
  var Dx = link.x1 - link.x0;
  var Dy = link.y1 - link.y0;
  if (link.d0 !== link.d1) {
    return Math.abs(Dy) / 2.1
  } else {
    return (Dy !== 0) ? (Dx * Dx + Dy * Dy) / Math.abs(4 * Dy) : Infinity
  }
}

function setEdgeEndCurvatures (G, edges, rr) {
  var links = edges.map(function (e) { return G.edge(e); });

  // initialise segments, find reversal of curvature
  links.forEach(function (link) {
    // const link = (i < 0) ? link.segments[link.segments.length + i] : link.segments[i]
    link.Rmax = maximumRadiusOfCurvature(link);
    link[rr] = Math.max(link.dy / 2, (link.d0 === link.d1 ? link.Rmax * 0.6 : (5 + link.dy / 2)));
  });

  var jmid = (rr === 'r0'
              ? findFirst(links, function (f) { return f.y1 > f.y0; })
              : findFirst(links, function (f) { return f.y0 > f.y1; }));
  if (jmid === null) { jmid = links.length; }

  // Set maximum radius down from middle
  sweepCurvatureInwards(links.slice(jmid), rr);

  // Set maximum radius up from middle
  if (jmid > 0) {
    var links2 = [];
    for (var j = jmid - 1; j >= 0; j--) { links2.push(links[j]); }
    sweepCurvatureInwards(links2, rr);
  }
}

function buildGraph (graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue) {
  var G = new graphlib_1({ directed: true, multigraph: true });
  graph.nodes.forEach(function (node, i) {
    var id = nodeId(node, i);
    if (G.hasNode(id)) { throw new Error('duplicate: ' + id) }
    G.setNode(id, {
      data: node,
      index: i,
      backwards: nodeBackwards(node, i),
      // XXX don't need these now have nodePositions?
      x0: node.x0,
      x1: node.x1,
      y: node.y0
    });
  });

  graph.links.forEach(function (link, i) {
    var v = idAndPort(sourceId(link, i));
    var w = idAndPort(targetId(link, i));
    var label = {
      data: link,
      sourcePortId: v.port,
      targetPortId: w.port,
      index: i,
      points: [],
      value: linkValue(link, i),
      type: linkType(link, i)
    };
    if (!G.hasNode(v.id)) { throw new Error('missing: ' + v.id) }
    if (!G.hasNode(w.id)) { throw new Error('missing: ' + w.id) }
    G.setEdge(v.id, w.id, label, linkType(link, i));
  });

  G.setGraph({});

  return G
}

function idAndPort (x) {
  if (typeof x === 'object') { return x }
  return {id: x, port: undefined}
}

/**
 */

function defaultNodes (graph) {
  return graph.nodes
}

function defaultLinks (graph) {
  return graph.links
}

function defaultNodeId (d) {
  return d.id
}

function defaultNodeBackwards (d) {
  return d.direction && d.direction.toLowerCase() === 'l'
}

function defaultSourceId (d) {
  // return typeof d.source === 'object' ? d.source.id : d.source
  return {
    id: typeof d.source === 'object' ? d.source.id : d.source,
    port: typeof d.sourcePort === 'object' ? d.sourcePort.id : d.sourcePort
  }
}

function defaultTargetId (d) {
  // return typeof d.target === 'object' ? d.target.id : d.target
  return {
    id: typeof d.target === 'object' ? d.target.id : d.target,
    port: typeof d.targetPort === 'object' ? d.targetPort.id : d.targetPort
  }
}

function defaultLinkType (d) {
  return d.type
}

function defaultSortPorts (a, b) {
  // XXX weighted sum
  return a.id.localeCompare(b.id)
}

// function defaultNodeSubdivisions

function sankeyLayout () {
  var nodes = defaultNodes;
  var links = defaultLinks;
  var nodeId = defaultNodeId;
  var nodeBackwards = defaultNodeBackwards;
  var sourceId = defaultSourceId;
  var targetId = defaultTargetId;
  var linkType = defaultLinkType;
  var ordering = null;
  var rankSets = [];
  var maxIterations = 25; // XXX setter/getter
  var nodePosition = null;
  var sortPorts = defaultSortPorts;

  // extent
  var x0 = 0;
  var y0 = 0;
  var x1 = 1;
  var y1 = 1;

  // node width
  var dx = 1;

  var scale = null;
  var linkValue = function (e) { return e.value };
  var whitespace = 0.5;
  var verticalLayout = positionNodesVertically();

  function sankey () {
    var graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    var G = buildGraph(graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue);

    setNodeValues(G, linkValue);

    if (nodePosition) {
      // hard-coded node positions

      G.nodes().forEach(function (u) {
        var node = G.node(u);
        var pos = nodePosition(node.data);
        node.x0 = pos[0];
        node.x1 = pos[0] + dx;
        node.y = pos[1];
      });
      setWidths(G, scale);
    } else {
      // calculate node positions

      if (ordering !== null) {
        applyOrdering(G, ordering);
      } else {
        assignRanks(G, rankSets);
        sortNodes(G, maxIterations);
      }

      addDummyNodes(G);
      setNodeValues(G, linkValue);
      if (ordering === null) {
        // XXX sort nodes?
        sortNodes(G, maxIterations);
      }

      var nested = nestGraph(G.nodes().map(function (u) { return G.node(u); }));
      maybeScaleToFit(G, nested);
      setWidths(G, scale);

      // position nodes
      verticalLayout(nested, y1 - y0, whitespace);
      positionHorizontally(G, x1 - x0, dx);

      // adjust origin
      G.nodes().forEach(function (u) {
        var node = G.node(u);
        node.x0 += x0;
        node.x1 += x0;
        node.y += y0;
      });
    }

    // sort & position links
    prepareNodePorts(G, sortPorts);
    orderEdges(G);
    layoutLinks(G);

    removeDummyNodes(G);
    addLinkEndpoints(G);

    copyResultsToGraph(G, graph);

    return graph
  }

  sankey.update = function (graph, doOrderLinks) {
    var G = buildGraph(graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue);
    setNodeValues(G, linkValue);
    var nested = nestGraph(G.nodes().map(function (u) { return G.node(u); }));
    maybeScaleToFit(G, nested);
    setWidths(G, scale);

    prepareNodePorts(G, sortPorts);
    orderEdges(G);
    layoutLinks(G);

    // removeDummyNodes(G)
    addLinkEndpoints(G);

    copyResultsToGraph(G, graph);

    return graph
  };
  //   if (scale === null) sankey.scaleToFit(graph)
  //   // set node and edge sizes
  //   setNodeValues(graph, linkValue, scale)
  //   if (doOrderLinks) {
  //     orderLinks(graph)
  //   }
  //   layoutLinks(graph)
  //   return graph
  // }

  sankey.nodes = function (x) {
    if (arguments.length) {
      nodes = required(x);
      return sankey
    }
    return nodes
  };

  sankey.links = function (x) {
    if (arguments.length) {
      links = required(x);
      return sankey
    }
    return links
  };

  sankey.nodeId = function (x) {
    if (arguments.length) {
      nodeId = required(x);
      return sankey
    }
    return nodeId
  };

  sankey.nodeBackwards = function (x) {
    if (arguments.length) {
      nodeBackwards = required(x);
      return sankey
    }
    return nodeBackwards
  };

  sankey.sourceId = function (x) {
    if (arguments.length) {
      sourceId = required(x);
      return sankey
    }
    return sourceId
  };

  sankey.targetId = function (x) {
    if (arguments.length) {
      targetId = required(x);
      return sankey
    }
    return targetId
  };

  sankey.linkType = function (x) {
    if (arguments.length) {
      linkType = required(x);
      return sankey
    }
    return linkType
  };

  sankey.sortPorts = function (x) {
    if (arguments.length) {
      sortPorts = required(x);
      return sankey
    }
    return sortPorts
  };

  // sankey.scaleToFit = function (graph) {
  function maybeScaleToFit (G, nested) {
    if (scale !== null) { return }
    var maxValue = d3Array.sum(nested.bandValues);
    if (maxValue <= 0) {
      scale = 1;
    } else {
      scale = (y1 - y0) / maxValue;
      if (whitespace !== 1) { scale *= (1 - whitespace); }
    }
  }

  sankey.ordering = function (x) {
    if (!arguments.length) { return ordering }
    ordering = x;
    return sankey
  };

  sankey.rankSets = function (x) {
    if (!arguments.length) { return rankSets }
    rankSets = x;
    return sankey
  };

  sankey.nodeWidth = function (x) {
    if (!arguments.length) { return dx }
    dx = x;
    return sankey
  };

  sankey.nodePosition = function (x) {
    if (!arguments.length) { return nodePosition }
    nodePosition = x;
    return sankey
  };

  sankey.size = function (x) {
    if (!arguments.length) { return [x1 - x0, y1 - y0] }
    x0 = y0 = 0;
    x1 = +x[0];
    y1 = +x[1];
    return sankey
  };

  sankey.extent = function (x) {
    if (!arguments.length) { return [[x0, y0], [x1, y1]] }
    x0 = +x[0][0];
    y0 = +x[0][1];
    x1 = +x[1][0];
    y1 = +x[1][1];
    return sankey
  };

  sankey.whitespace = function (x) {
    if (!arguments.length) { return whitespace }
    whitespace = x;
    return sankey
  };

  sankey.scale = function (x) {
    if (!arguments.length) { return scale }
    scale = x;
    return sankey
  };

  sankey.linkValue = function (x) {
    if (!arguments.length) { return linkValue }
    linkValue = x;
    return sankey
  };

  sankey.verticalLayout = function (x) {
    if (!arguments.length) { return verticalLayout }
    verticalLayout = required(x);
    return sankey
  };

  function applyOrdering (G, ordering) {
    ordering.forEach(function (x, i) {
      x.forEach(function (u, j) {
        if (u.forEach) {
          u.forEach(function (v, k) {
            var d = G.node(v);
            if (d) {
              d.rank = i;
              d.band = j;
              d.depth = k;
            }
          });
        } else {
          var d = G.node(u);
          if (d) {
            d.rank = i;
            // d.band = 0
            d.depth = j;
          }
        }
      });
    });
  }

  return sankey
}

function setNodeValues (G, linkValue) {
  G.nodes().forEach(function (u) {
    var d = G.node(u);
    var incoming = d3Array.sum(G.inEdges(u), function (e) { return G.edge(e).value; });
    var outgoing = d3Array.sum(G.outEdges(u), function (e) { return G.edge(e).value; });
    d.value = Math.max(incoming, outgoing);
  });
}

function setWidths (G, scale) {
  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.dy = edge.value * scale;
  });
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.dy = node.value * scale;
  });
}

function required (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function addLinkEndpoints (G) {
  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.points.unshift({x: edge.x0, y: edge.y0, ro: edge.r0, d: edge.d0});
    edge.points.push({x: edge.x1, y: edge.y1, ri: edge.r1, d: edge.d1});
  });
}

function copyResultsToGraph (G, graph) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);

    // Build lists of edge data objects
    node.data.incoming = [];
    node.data.outgoing = [];
    node.data.ports = node.ports;
    node.data.ports.forEach(function (port) {
      port.incoming = [];
      port.outgoing = [];
    });

    node.data.dy = node.dy;
    node.data.x0 = node.x0;
    node.data.x1 = node.x1;
    node.data.y0 = node.y;
    node.data.y1 = node.y + node.dy;
    node.data.rank = node.rank;
    node.data.band = node.band;
    node.data.depth = node.depth;
    node.data.value = node.value;
    node.data.spaceAbove = node.spaceAbove;
    node.data.spaceBelow = node.spaceBelow;
  });

  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.data.source = G.node(e.v).data;
    edge.data.target = G.node(e.w).data;
    edge.data.sourcePort = edge.sourcePort;
    edge.data.targetPort = edge.targetPort;
    // console.log(edge)
    edge.data.source.outgoing.push(edge.data);
    edge.data.target.incoming.push(edge.data);
    if (edge.data.sourcePort) { edge.data.sourcePort.outgoing.push(edge.data); }
    if (edge.data.targetPort) { edge.data.targetPort.incoming.push(edge.data); }
    edge.data.value = edge.value;
    edge.data.type = edge.type;
    edge.data.dy = edge.dy;
    edge.data.points = edge.points || [];
    // edge.data.id = `${e.v}-${e.w}-${e.name}`
  });
}

function positionNodesVertically$1 () {
  var iterations = 25;
  var nodePadding = 8;

  function layout (nested, height) {
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1, i = iterations; i > 0; --i) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth () {
      nested.forEach(function (layer) {
        var i = 0;
        layer.forEach(function (band) {
          // ignore bands for this layout
          band.forEach(function (node) {
            node.y = i++;
          });
        });
      });
    }

    function relaxLeftToRight (alpha) {
      nested.forEach(function (layer) {
        layer.forEach(function (band) {
          band.forEach(function (node) {
            var edges = node.incoming || node.edges;
            if (edges.length) {
              var y = d3Array.sum(edges, weightedSource) / d3Array.sum(edges, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });
      });

      function weightedSource (link) {
        return center(link.source) * link.value
      }
    }

    function relaxRightToLeft (alpha) {
      nested.slice().reverse().forEach(function (layer) {
        layer.forEach(function (band) {
          band.forEach(function (node) {
            var edges = node.outgoing || node.edges;
            if (edges.length) {
              var y = d3Array.sum(edges, weightedTarget) / d3Array.sum(edges, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });
      });

      function weightedTarget (link) {
        return center(link.target) * link.value
      }
    }

    function resolveCollisions () {
      nested.forEach(function (layer) {
        layer.forEach(function (nodes) {
          var node;
          var dy;
          var y0 = 0;
          var n = nodes.length;
          var i;

          // Push any overlapping nodes down.
          nodes.sort(ascendingDepth);
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            dy = y0 - node.y;
            if (dy > 0) { node.y += dy; }
            y0 = node.y + node.dy + nodePadding;
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - height;
          if (dy > 0) {
            y0 = node.y -= dy;

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i];
              dy = node.y + node.dy + nodePadding - y0;
              if (dy > 0) { node.y -= dy; }
              y0 = node.y;
            }
          }
        });
      });
    }
  }

  layout.iterations = function (x) {
    if (!arguments.length) { return iterations }
    iterations = +x;
    return layout
  };

  layout.padding = function (x) {
    if (!arguments.length) { return nodePadding }
    nodePadding = +x;
    return layout
  };

  return layout
}

function center (node) {
  return 0
}

function value (link) {
  return link.value
}

function ascendingDepth (a, b) {
  return a.y - b.y
}

// function defaultSegments (d) {
//   return d.segments
// }

function defaultMinWidth (d) {
  return (d.dy === 0) ? 0 : 2
}

function sankeyLink() {
  // var segments = defaultSegments
  var minWidth = defaultMinWidth;

  function radiusBounds(d) {
    var Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        Rmin = d.dy / 2,
        Rmax = (Dx*Dx + Dy*Dy) / Math.abs(4*Dy);
    return [Rmin, Rmax];
  }

  function link(d) {
    var path = '';
    var seg;
    for (var i = 0; i < d.points.length - 1; ++i) {
      seg = {
        x0: d.points[i].x,
        y0: d.points[i].y,
        x1: d.points[i + 1].x,
        y1: d.points[i + 1].y,
        r0: d.points[i].ro,
        r1: d.points[i + 1].ri,
        d0: d.points[i].d,
        d1: d.points[i + 1].d,
        dy: d.dy
      };
      path += segmentPath(seg);
    }
    return path
  }

  function segmentPath (d) {
    var dir = (d.d0 || 'r') + (d.d1 || 'r');
    if (d.source && d.source === d.target) {
      return selfLink(d);
    }
    if (dir === 'rl') {
      return fbLink(d);
    }
    if (dir === 'rd') {
      return fdLink(d);
    }
    if (dir === 'dr') {
      return dfLink(d);
    }
    if (dir === 'lr') {
      return bfLink(d);
    }

    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1;

    if (x1 < x0) {
      var assign;
      (assign = [x1, x0], x0 = assign[0], x1 = assign[1]);
      var assign$1;
      (assign$1 = [y1, y0], y0 = assign$1[0], y1 = assign$1[1]);
    }

    var f = y1 > y0 ? 1 : -1,
        fx = 1;  // dir === 'll' ? -1 : 1;

    var Rlim = radiusBounds(d),
          defaultRadius = Math.max(Rlim[0], Math.min(Rlim[1], (x1 - x0)/3));

    var r0 = Math.max(Rlim[0], Math.min(Rlim[1], (d.r0 || defaultRadius))),
        r1 = Math.max(Rlim[0], Math.min(Rlim[1], (d.r1 || defaultRadius)));

    var dcx = (x1 - x0),
          dcy = (y1 - y0) - f * (r0 + r1),
          D = Math.sqrt(dcx*dcx + dcy*dcy);

    var phi = -f * Math.acos(Math.min(1, (r0 + r1) / D)),
          psi = Math.atan2(dcy, dcx);

    var theta = Math.PI/2 + f * (psi + phi);

    var hs = h * f * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = x0 + fx * r0 * Math.sin(Math.abs(theta)),
        x3 = x1 - fx * r1 * Math.sin(Math.abs(theta)),
        y2 = y0 + r0 * f * (1 - Math.cos(theta)),
        y3 = y1 - r1 * f * (1 - Math.cos(theta));

    if (isNaN(theta) || Math.abs(theta) < 1e-3) {
      theta = r0 = r1 = 0;
      x2 = x0;
      x3 = x1;
      y2 = y0;
      y3 = y1;
      hs = 0;
      hc = h;
    }

    function arc(dir, r) {
      var f = ( dir * (y1-y0) > 0) ? 1 : 0,
          rr = (fx * dir * (y1-y0) > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    var path;
    // if (fx * (x2 - x3) < 0 || Math.abs(y1 - y0) > 4*h) {
    // XXX this causes juddering during transitions

    path =  ("M"     + [x0,    y0-h ] + " " +
              arc(+1, r0) + [x2+hs, y2-hc] + " " +
            "L"     + [x3+hs, y3-hc] + " " +
              arc(-1, r1) + [x1,    y1-h ] + " " +
            "L"     + [x1,    y1+h ] + " " +
              arc(+1, r1) + [x3-hs, y3+hc] + " " +
            "L"     + [x2-hs, y2+hc] + " " +
              arc(-1, r0) + [x0,    y0+h ] + " " +
            "Z");
    
    if (/NaN/.test(path)) {
      console.error('path NaN', d, path);
    }
    return path;
  }

  function selfLink(d) {
    var h = Math.max(minWidth(d), d.dy) / 2,
        r = h*1.5,
        theta = 2 * Math.PI,
        x0 = d.x0,
        y0 = d.y0;

    function arc(dir) {
      var f = (dir > 0) ? 1 : 0,
          rr = (dir > 0) ? (r + h) : (r - h);
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 1 " + f + " ";
    }

    return ("M"     + [x0+0.1, y0-h] + " " +
            arc(+1) + [x0-0.1, y0-h] + " " +
            "L"     + [x0-0.1, y0+h] + " " +
            arc(-1) + [x0+0.1, y0+h] + " " +
            "Z");
  }

  function fbLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        //Rlim = radiusBounds(d),
        defaultRadius = ((d.r0 + d.r1) / 2) || (5 + h), //Math.max(Rlim[0], Math.min(Rlim[1], Dx/3)),
        r = Math.min(Math.abs(y1-y0)/2.1, defaultRadius), //2*(d.r || defaultRadius),
        theta = Math.atan2(Dy - 2*r, Dx),
        l = Math.sqrt(Math.max(0, Dx*Dx + (Dy-2*r)*(Dy-2*r))),
        f = d.y1 > d.y0 ? 1 : -1,
        hs = h * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = d.x0 + r * Math.sin(Math.abs(theta)),
        x3 = d.x1 + r * Math.sin(Math.abs(theta)),
        y2 = d.y0 + r * f * (1 - Math.cos(theta)),
        y3 = d.y1 - r * f * (1 - Math.cos(theta));

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(+1) + [x2+hs, y2-hc] + " " +
            "L"     + [x3+hs, y3-hc] + " " +
            arc(+1) + [x1,    y1+h ] + " " +
            "L"     + [x1,    y1-h ] + " " +
            arc(-1) + [x3-hs, y3+hc] + " " +
            "L"     + [x2-hs, y2+hc] + " " +
            arc(-1) + [x0,    y0+h ] + " " +
            "Z");
  }

  function fdLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        theta = Math.PI / 2,
        r = Math.max(0, x1 - x0),
        f = d.y1 > d.y0,  // = 1
        y2 = y0 + r;

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(+1) + [x1+h,  y2   ] + " " +
            "L"     + [x1+h,  y1   ] + " " +
            ""      + [x1-h,  y1   ] + " " +
            ""      + [x1-h,  y2   ] + " " +
            arc(-1) + [x0,    y0+h ] + " " +
            "Z");
  }

  function dfLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        theta = Math.PI / 2,
        r = Math.max(0, x1 - x0),
        f = d.y1 > d.y0,  // = 1
        y2 = y1 - r;

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0-h,  y0   ] + " " +
            "L"     + [x0+h,  y0   ] + " " +
            ""      + [x0+h,  y2   ] + " " +
            arc(-1) + [x1  ,  y1-h ] + " " +
            "L"     + [x1  ,  y1+h ] + " " +
            arc(+1) + [x0-h,  y2   ] + " " +
            "Z");
  }

  function bfLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        //Rlim = radiusBounds(d),
        defaultRadius = ((d.r0 + d.r1) / 2) || (5 + h), //Math.max(Rlim[0], Math.min(Rlim[1], Dx/3)),
        r = Math.min(Math.abs(Dy)/2.1, defaultRadius), //2*(d.r || defaultRadius),
        theta = Math.atan2(Dy - 2*r, Dx),
        l = Math.sqrt(Math.max(0, Dx*Dx + (Dy-2*r)*(Dy-2*r))),
        f = d.y1 > d.y0 ? 1 : -1,
        hs = h * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = d.x0 - r * Math.sin(Math.abs(theta)),
        x3 = d.x1 - r * Math.sin(Math.abs(theta)),
        y2 = d.y0 + r * f * (1 - Math.cos(theta)),
        y3 = d.y1 - r * f * (1 - Math.cos(theta));

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (-dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(-1) + [x2-hs, y2-hc] + " " +
            "L"     + [x3-hs, y3-hc] + " " +
            arc(-1) + [x1,    y1+h ] + " " +
            "L"     + [x1,    y1-h ] + " " +
            arc(+1) + [x3+hs, y3-hc] + " " +
            "L"     + [x2+hs, y2-hc] + " " +
            arc(+1) + [x0,    y0+h ] + " " +
            "Z");
  }

  link.minWidth = function (x) {
    if (arguments.length) {
      minWidth = required$2(x);
      return link
    }
    return minWidth
  };

  return link;
}

function required$2 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

var sankeyNode = function () {
  var nodeTitle = function (d) { return d.title !== undefined ? d.title : d.id; };
  var nodeValue = function (d) { return null; };
  var nodeVisible = function (d) { return !!nodeTitle(d); };

  function sankeyNode (context) {
    var selection = context.selection ? context.selection() : context;

    if (selection.select('text').empty()) {
      selection.append('title');
      selection.append('line')
        .attr('x1', 0)
        .attr('x2', 0);
      selection.append('rect')
        .attr('class', 'node-body');
      selection.append('text')
        .attr('class', 'node-value')
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle');
      selection.append('text')
        .attr('class', 'node-title')
        .attr('dy', '.35em');
      selection.append('rect')
        .attr('class', 'node-click-target')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 10)
        .style('fill', 'none')
        .style('visibility', 'hidden')
        .style('pointer-events', 'all');

      selection
        .attr('transform', nodeTransform);
    }

    selection.each(function (d) {
      var title = d3Selection.select(this).select('title');
      var value = d3Selection.select(this).select('.node-value');
      var text = d3Selection.select(this).select('.node-title');
      var line = d3Selection.select(this).select('line');
      var body = d3Selection.select(this).select('.node-body');
      var clickTarget = d3Selection.select(this).select('.node-click-target');

      // Local var for title position of each node
      var layoutData = titlePosition(d);
      layoutData.dy = (d.y0 === d.y1) ? 0 : Math.max(1, d.y1 - d.y0);

      var separateValue = (d.x1 - d.x0) > 2;
      var titleText = nodeTitle(d) + ((!separateValue && nodeValue(d))
                                        ? ' (' + nodeValue(d) + ')' : '');

      // Update un-transitioned
      title
        .text(titleText);

      value
        .text(nodeValue)
        .style('display', separateValue ? 'inline' : 'none');

      text
        .attr('text-anchor', layoutData.right ? 'end' : 'start')
        .text(titleText)
        .each(wrap, 100);

      // Are we in a transition?
      if (context !== selection) {
        text = text.transition(context);
        line = line.transition(context);
        body = body.transition(context);
        clickTarget = clickTarget.transition(context);
      }

      // Update
      context
        .attr('transform', nodeTransform);

      line
        .attr('y1', function (d) { return layoutData.titleAbove ? -5 : 0 })
        .attr('y2', function (d) { return layoutData.dy })
        .style('display', function (d) {
          return (d.y0 === d.y1 || !nodeVisible(d)) ? 'none' : 'inline'
        });

      clickTarget
        .attr('height', function (d) { return layoutData.dy + 5 });

      body
        .attr('width', function (d) { return d.x1 - d.x0 })
        .attr('height', function (d) { return layoutData.dy });

      text
        .attr('transform', textTransform)
        .style('display', function (d) {
          return (d.y0 === d.y1 || !nodeVisible(d)) ? 'none' : 'inline'
        });

      value
        .style('font-size', function (d) { return Math.min(d.x1 - d.x0 - 4, d.y1 - d.y0 - 4) + 'px' })
        .attr('transform', function (d) {
          var dx = d.x1 - d.x0;
          var dy = d.y1 - d.y0;
          var theta = dx > dy ? 0 : -90;
          return 'translate(' + (dx / 2) + ',' + (dy / 2) + ') rotate(' + theta + ')'
        });

      function textTransform (d) {
        var layout = layoutData;
        var y = layout.titleAbove ? -10 : (d.y1 - d.y0) / 2;
        var x;
        if (layout.titleAbove) {
          x = (layout.right ? 4 : -4);
        } else {
          x = (layout.right ? -4 : d.x1 - d.x0 + 4);
        }
        return 'translate(' + x + ',' + y + ')'
      }
    });
  }

  sankeyNode.nodeVisible = function (x) {
    if (arguments.length) {
      nodeVisible = required$3(x);
      return sankeyNode
    }
    return nodeVisible
  };

  sankeyNode.nodeTitle = function (x) {
    if (arguments.length) {
      nodeTitle = required$3(x);
      return sankeyNode
    }
    return nodeTitle
  };

  sankeyNode.nodeValue = function (x) {
    if (arguments.length) {
      nodeValue = required$3(x);
      return sankeyNode
    }
    return nodeValue
  };

  return sankeyNode
};

function nodeTransform (d) {
  return 'translate(' + d.x0 + ',' + d.y0 + ')'
}

function titlePosition (d) {
  var titleAbove = false;
  var right = false;

  // If thin, and there's enough space, put above
  if (d.spaceAbove > 20 && d.style !== 'type') {
    titleAbove = true;
  } else {
    titleAbove = false;
  }

  if (d.incoming.length === 0) {
    right = true;
    titleAbove = false;
  } else if (d.outgoing.length === 0) {
    right = false;
    titleAbove = false;
  }

  return {titleAbove: titleAbove, right: right}
}

function wrap (d, width) {
  var text = d3Selection.select(this);
  var lines = text.text().split(/\n/);
  var lineHeight = 1.1; // ems
  if (lines.length === 1) { return }
  text.text(null);
  lines.forEach(function (line, i) {
    text.append('tspan')
      .attr('x', 0)
      .attr('dy', (i === 0 ? 0.7 - lines.length / 2 : 1) * lineHeight + 'em')
      .text(line);
  });
}

function required$3 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function positionGroup (nodes, group) {
  var rect = {
    top: Number.MAX_VALUE,
    left: Number.MAX_VALUE,
    bottom: 0,
    right: 0
  };

  group.nodes.forEach(function (n) {
    var node = nodes.get(n);
    if (!node) { return }
    if (node.x0 < rect.left) { rect.left = node.x0; }
    if (node.x1 > rect.right) { rect.right = node.x1; }
    if (node.y0 < rect.top) { rect.top = node.y0; }
    if (node.y1 > rect.bottom) { rect.bottom = node.y1; }
  });

  group.rect = rect;
  return group
}

// The reusable SVG component for the sliced Sankey diagram

function linkTitleGenerator (nodeTitle, typeTitle, fmt) {
  return function (d) {
    var parts = [];
    var sourceTitle = nodeTitle(d.source);
    var targetTitle = nodeTitle(d.target);
    var matTitle = typeTitle(d);

    parts.push((sourceTitle + " → " + targetTitle));
    if (matTitle) { parts.push(matTitle); }
    parts.push(fmt(d.value));
    return parts.join('\n')
  }
}

function sankeyDiagram () {
  var margin = {top: 0, right: 0, bottom: 0, left: 0};

  var selectedNode = null;
  var selectedEdge = null;

  var groups = [];

  var fmt = d3Format.format('.3s');
  var node = sankeyNode();
  var link = sankeyLink();

  var linkColor = function (d) { return null; };
  var linkTitle = linkTitleGenerator(node.nodeTitle(), function (d) { return d.type; }, fmt);
  var linkLabel = defaultLinkLabel;

  var listeners = d3Dispatch.dispatch('selectNode', 'selectGroup', 'selectLink');

  /* Main chart */

  function exports (context) {
    var selection = context.selection ? context.selection() : context;

    selection.each(function (G) {
      // Create the skeleton, if it doesn't already exist
      var svg = d3Selection.select(this);

      var sankey = svg.selectAll('.sankey')
            .data([{type: 'sankey'}]);

      var sankeyEnter = sankey.enter()
            .append('g')
            .classed('sankey', true);

      sankeyEnter.append('g').classed('groups', true);
      sankeyEnter.append('g').classed('links', true);  // Links below nodes
      sankeyEnter.append('g').classed('nodes', true);
      sankeyEnter.append('g').classed('slice-titles', true);  // Slice titles

      sankey = sankey.merge(sankeyEnter);

      // Update margins
      sankey
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        // .select('.slice-titles')
        // .attr('transform', 'translate(' + margin.left + ',0)')

      // Groups of nodes
      var nodeMap = d3Collection.map(G.nodes, function (n) { return n.id; });
      var groupsPositioned = (groups || []).map(function (g) { return positionGroup(nodeMap, g); });

      // Render
      updateNodes(sankey, context, G.nodes);
      updateLinks(sankey, context, G.links);
      updateGroups(svg, groupsPositioned);
      // updateSlices(svg, layout.slices(nodes));

      // Events
      svg.on('click', function () {
        listeners.call('selectNode', this, null);
        listeners.call('selectLink', this, null);
      });
    });
  }

  function updateNodes (sankey, context, nodes) {
    var nodeSel = sankey
        .select('.nodes')
        .selectAll('.node')
        .data(nodes, function (d) { return d.id; });

    // EXIT
    nodeSel.exit().remove();

    nodeSel = nodeSel.merge(
      nodeSel.enter()
        .append('g')
        .attr('class', 'node')
        .call(node)
        .on('click', selectNode));

    if (context instanceof d3Transition.transition) {
      nodeSel.transition(context)
        .call(node);
    } else {
      nodeSel.call(node);
    }
  }

  function updateLinks (sankey, context, edges) {
    var linkSel = sankey
        .select('.links')
        .selectAll('.link')
        .data(edges, function (d) { return d.source.id + '-' + d.target.id + '-' + d.type; });

    // EXIT

    linkSel.exit().remove();

    // ENTER

    var linkEnter = linkSel.enter()
        .append('g')
        .attr('class', 'link')
        .on('click', selectLink);

    linkEnter.append('path')
      .attr('d', link)
      .style('fill', 'white')
      .each(function (d) { this._current = d; });

    linkEnter.append('title');

    linkEnter.append('text')
      .attr('class', 'label')
      .attr('dy', '0.35em')
      .attr('x', function (d) { return d.points[0].x + 4; })
      .attr('y', function (d) { return d.points[0].y; });

    // UPDATE

    linkSel = linkSel.merge(linkEnter);

    // Non-transition updates
    linkSel.classed('selected', function (d) { return d.id === selectedEdge; });
    linkSel.sort(linkOrder);

    // Transition updates, if available
    if (context instanceof d3Transition.transition) {
      linkSel = linkSel.transition(context);
      linkSel
        .select('path')
        .style('fill', linkColor)
        .each(function (d) {
          d3Selection.select(this)
            .transition(context)
            .attrTween('d', interpolateLink);
        });
    } else {
      linkSel
        .select('path')
        .style('fill', linkColor)
        .attr('d', link);
    }

    linkSel.select('title')
      .text(linkTitle);

    linkSel.select('.label')
      .text(linkLabel)
      .attr('x', function (d) { return d.points[0].x + 4; })
      .attr('y', function (d) { return d.points[0].y; });
  }

  // function updateSlices(svg, slices) {
  //   var slice = svg.select('.slice-titles').selectAll('.slice')
  //         .data(slices, function(d) { return d.id; });

  //   var textWidth = (slices.length > 1 ?
  //                    0.9 * (slices[1].x - slices[0].x) :
  //                    null);

  //   slice.enter().append('g')
  //     .attr('class', 'slice')
  //     .append('foreignObject')
  //     .attr('requiredFeatures',
  //           'http://www.w3.org/TR/SVG11/feature#Extensibility')
  //     .attr('height', margin.top)
  //     .attr('class', 'title')
  //     .append('xhtml:div')
  //     .style('text-align', 'center')
  //     .style('word-wrap', 'break-word');
  //   // .text(pprop('sliceMetadata', 'title'));

  //   slice
  //     .attr('transform', function(d) {
  //       return 'translate(' + (d.x - textWidth / 2) + ',0)'; })
  //     .select('foreignObject')
  //     .attr('width', textWidth)
  //     .select('div');
  //   // .text(pprop('sliceMetadata', 'title'));

  //   slice.exit().remove();
  // }

  function updateGroups (svg, groups) {
    var group = svg.select('.groups').selectAll('.group')
      .data(groups);

    // EXIT
    group.exit().remove();

    // ENTER
    var enter = group.enter().append('g')
            .attr('class', 'group')
            .on('click', selectGroup);

    enter.append('rect');
    enter.append('text')
      .attr('x', -10)
      .attr('y', -25);

    group = group.merge(enter);

    group
      .style('display', function (d) { return d.title ? 'inline' : 'none'; })
      .attr('transform', function (d) { return ("translate(" + (d.rect.left) + "," + (d.rect.top) + ")"); })
      .select('rect')
      .attr('x', -10)
      .attr('y', -20)
      .attr('width', function (d) { return d.rect.right - d.rect.left + 20; })
      .attr('height', function (d) { return d.rect.bottom - d.rect.top + 30; });

    group.select('text')
      .text(function (d) { return d.title; });
  }

  function interpolateLink (b) {
    // XXX should limit radius better
    b.points.forEach(function (p) {
      if (p.ri > 1e3) { p.ri = 1e3; }
      if (p.ro > 1e3) { p.ro = 1e3; }
    });
    var interp = d3Interpolate.interpolate(linkGeom(this._current), b);
    var that = this;
    return function (t) {
      that._current = interp(t);
      return link(that._current)
    }
  }

  function linkGeom (l) {
    return {
      points: l.points,
      dy: l.dy
    }
  }

  function linkOrder (a, b) {
    if (a.id === selectedEdge) { return +1 }
    if (b.id === selectedEdge) { return -1 }
    if (!a.source || a.target && a.target.direction === 'd') { return -1 }
    if (!b.source || b.target && b.target.direction === 'd') { return +1 }
    if (!a.target || a.source && a.source.direction === 'd') { return -1 }
    if (!b.target || b.source && b.source.direction === 'd') { return +1 }
    return a.dy - b.dy
  }

  function selectLink (d) {
    d3Selection.event.stopPropagation();
    var el = d3Selection.select(this).node();
    listeners.call('selectLink', el, d);
  }

  function selectNode (d) {
    d3Selection.event.stopPropagation();
    var el = d3Selection.select(this).node();
    listeners.call('selectNode', el, d);
  }

  function selectGroup(d) {
    d3.event.stopPropagation();
    var el = d3.select(this)[0][0];
    d3Dispatch.dispatch.selectGroup.call(el, d);
  }

  exports.margins = function (_x) {
    if (!arguments.length) { return margin }
    margin = {
      top: _x.top === undefined ? margin.top : _x.top,
      left: _x.left === undefined ? margin.left : _x.left,
      bottom: _x.bottom === undefined ? margin.bottom : _x.bottom,
      right: _x.right === undefined ? margin.right : _x.right
    };
    return this
  };

  exports.groups = function (_x) {
    if (!arguments.length) { return groups }
    groups = _x;
    return this
  };

  // Node styles and title
  exports.nodeTitle = function (_x) {
    if (!arguments.length) { return node.nodeTitle() }
    node.nodeTitle(_x);
    linkTitle = linkTitleGenerator(_x, function (d) { return d.type; }, fmt);
    return this
  };

  exports.nodeValue = function (_x) {
    if (!arguments.length) { return node.nodeValue() }
    node.nodeValue(_x);
    return this
  };

  // Link styles and titles
  exports.linkTitle = function (_x) {
    if (!arguments.length) { return linkTitle }
    linkTitle = _x;
    return this
  };

  exports.linkLabel = function (_x) {
    if (!arguments.length) { return linkLabel }
    linkLabel = _x;
    return this
  };

  exports.linkColor = function (_x) {
    if (!arguments.length) { return linkColor }
    linkColor = _x;
    return this
  };

  exports.linkMinWidth = function (_x) {
    if (!arguments.length) { return link.minWidth() }
    link.minWidth(_x);
    return this
  };

  exports.selectNode = function (_x) {
    selectedNode = _x;
    return this
  };

  exports.selectLink = function (_x) {
    selectedEdge = _x;
    return this
  };

  exports.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? exports : value
  };

  return exports
}

function defaultLinkLabel (d) {
  return null
}

exports.sankey = sankeyLayout;
exports.sankeyPositionJustified = positionNodesVertically;
exports.sankeyPositionRelaxation = positionNodesVertically$1;
exports.sankeyLink = sankeyLink;
exports.sankeyNode = sankeyNode;
exports.sankeyDiagram = sankeyDiagram;
exports.sankeyLinkTitle = linkTitleGenerator;

Object.defineProperty(exports, '__esModule', { value: true });

})));
