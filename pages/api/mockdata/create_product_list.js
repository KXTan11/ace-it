"use strict";
import createCategories from './create_categories'
import createProduct from './create_products'

Object.defineProperty(exports, "__esModule", {
  value: true
});
export default createProductList;

function createProductList(category) {
  let currentcategory = category[0];
  let categories = createCategories();
  let products = createProduct();

  let filteredproducts = products.filter(function(product) {
    return currentcategory === "all" || product.category === currentcategory;
  })
  let selectedcategory = categories.find(function(cat){
    return cat.toLowerCase() === currentcategory
  })
  return {
    id: currentcategory,
    name: selectedcategory,
    title: "Store - " + selectedcategory,
    total: filteredproducts.length,
    page: 0,
    totalPages: 1,
    facets: [{
      name: "Brand",
      ui: "buttons",
      options: [{
        name: "Asus",
        code: "brand:asus"
      }, {
        name: "LG",
        code: "brand:lg"
      }, {
        name: "Samsung",
        code: "brand:samsung"
      }]
    }],
    sort: "name",
    sortOptions: [{
      name: "Name (asc)",
      code: "name_asc"
    }],
    products: filteredproducts
  }
}
