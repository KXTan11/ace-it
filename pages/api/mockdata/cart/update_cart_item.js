"use strict";
import { updateItem } from './cart_store'

Object.defineProperty(exports, "__esModule", {
  value: true
});
export default updateCartItem;

function updateCartItem(id, quantity, req, res) {
  return {
    cart: {
      items: updateItem(id, quantity, req, res)
    }
  };
}
