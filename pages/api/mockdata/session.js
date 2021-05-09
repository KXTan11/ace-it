"use strict";
import { getProducts } from './cart/cart_store'


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = session;

function session(req, res) {
  return {
    name: 'Mark',
    email: 'mark@domain.com',
    cart: {
      items: getProducts())(req, res)
    },
    currency: 'USD'
  }
}
//# sourceMappingURL=session.js.map
