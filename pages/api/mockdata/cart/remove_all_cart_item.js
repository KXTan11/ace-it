"use strict";
import { removeAllItem } from './cart_store'

Object.defineProperty(exports, "__esModule", {
  value: true
});

export default removeAllCartItem;

function removeAllCartItem(id, req, res) {
  return {
    cart: {
      items: removeAllItem(id, req, res)
    }
  }
}
