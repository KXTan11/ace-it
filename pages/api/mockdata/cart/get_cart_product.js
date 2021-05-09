"use strict";
import createProduct from '../create_products'

Object.defineProperty(exports, "__esModule", {
  value: true
});
export default getCartProduct;

function getCartProduct(id) {
  var products = createProduct();

  var selectedproduct = products.find(function(product) {
    return product.id === id
  })

  return selectedproduct;
}
