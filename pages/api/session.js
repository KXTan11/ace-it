"use strict";
import { getProducts } from './mockdata/cart/cart_store'

export default async function(req, res) {
  res.json({
    name: 'Mark',
    email: 'mark@domain.com',
    cart: {
      items: getProducts(req, res)
    },
    currency: 'MYR'
  })
}
