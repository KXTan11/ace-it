import updateCartItem from '../mockdata/cart/update_cart_item'

export default async function handler(req, res) {
  const { item, quantity } = req.body
  res.json(await updateCartItem(item && item.id, quantity, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}
