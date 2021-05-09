"use strict";

import getCartProduct from './get_cart_product'

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CART_COOKIE = 'rsf_mock_cart';
var initialStore = [];

function getStore(req, res) {
  if (!req.cookies[CART_COOKIE]) {
    res.setHeader('Set-Cookie', "".concat(CART_COOKIE, "=").concat(JSON.stringify(initialStore), "; Path=/"));
  }

  var store = req.cookies[CART_COOKIE] || initialStore;

  try {
    return JSON.parse(store);
  } catch (err) {
    console.log('Failed parsing store from cookie', req.cookies[CART_COOKIE]);
    return [];
  }
}

function toProduct(_ref) {
  var id = _ref.id,
      quantity = _ref.quantity,
      brand = _ref.brand;
  return _objectSpread(_objectSpread({}, getCartProduct(id)), {}, {
    quantity: quantity,
    brand: brand
  });
}

function getProducts(req, res) {
  return getStore(req, res).map(toProduct);
}

function updateItem(id, quantity, req, res) {
  var newStore = (0, _toConsumableArray2["default"])(getStore(req, res));
  var item = newStore.find(function (e) {
    return e.id === id;
  });
  item.quantity = quantity;
  res.setHeader('Set-Cookie', "".concat(CART_COOKIE, "=").concat(JSON.stringify(newStore), "; Path=/"));
  return newStore.map(toProduct);
}

function removeItem(id, req, res) {
  var newStore = (0, _toConsumableArray2["default"])(getStore(req, res)).filter(function (e) {
    return e.id !== id;
  });
  res.setHeader('Set-Cookie', "".concat(CART_COOKIE, "=").concat(JSON.stringify(newStore), "; Path=/"));
  return newStore.map(toProduct);
}

function removeAllItems(req, res) {
  var newStore = [];
  res.setHeader('Set-Cookie', "".concat(CART_COOKIE, "=").concat(JSON.stringify(newStore), "; Path=/"));
  return newStore.map(toProduct);
}

function addItem(id, brand, quantity, req, res) {
  var newStore = [{
    id: id,
    brand: brand,
    quantity: quantity
  }].concat((0, _toConsumableArray2["default"])(getStore(req, res)));
  res.setHeader('Set-Cookie', "".concat(CART_COOKIE, "=").concat(JSON.stringify(newStore), "; Path=/"));
  return newStore.map(toProduct);
}

export {addItem, removeItem, removeAllItems, updateItem, getProducts}
