"use strict";
import { removeItem } from './cart_store'

Object.defineProperty(exports, "__esModule", {
  value: true
});

export default removeCartItem;

function removeCartItem(id, req, res) {
  return {
    cart: {
      items: removeItem(id, req, res)
    }
  }
}
