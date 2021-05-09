"use strict";
import createProduct from './create_products'

Object.defineProperty(exports, "__esModule", {
  value: true
});
export default getProduct

function getProduct(id) {
  var products = createProduct();

  var selectedproduct = products.find(function(product) {
    return product.id === id
  })

  return {
    title: selectedproduct && selectedproduct.name || "",
    product: selectedproduct
  }
}
