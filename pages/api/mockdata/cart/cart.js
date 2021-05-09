"use strict";
import { getProducts } from './cart_store'

Object.defineProperty(exports, "__esModule", {
  value: true
});

export default cart;

function cart(req, res) {
  return {
    title: 'My Cart',
    breadcrumbs: [{
      text: 'Home',
      href: '/'
    }],
    cart: {
      items: getProducts(req, res)
    }
  }
}
