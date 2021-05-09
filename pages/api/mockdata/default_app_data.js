"use strict";
import createCategories from './create_categories'

Object.defineProperty(exports, "__esModule", {
  value: true
});

export default getDefaultAppData

export function getDefaultAppData() {
  var menuitem = createMenu();

  return {
    menu: menuitem,
    tabs: menuitem.items
  };
}

function createMenu() {
  var items = [];

  let categories = createCategories();

  categories.forEach((cat, i) => {
    items.push({
      text: cat,
      href: '/s/[subcategoryId]',
      as: `/s/${cat.toLowerCase()}`,
      expensible: false
    })
  });

  return {
    items: items,
    header: '',
    footer: ''
  };
}
