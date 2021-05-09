"use strict";
import { addItem } from './cart_store'

Object.defineProperty(exports, "__esModule", {
  value: true
});

export default addToCart;

function addToCart(id, brand, quantity, req, res) {
  return {
    cart: {
      items: addItem(id, brand, quantity, req, res)
    }
  }
}
