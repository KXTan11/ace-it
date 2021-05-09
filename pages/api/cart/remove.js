import removeCartItem from '../mockdata/cart/remove_cart_item'

export default async function handler(req, res) {
  const { item } = req.body || {}
  res.json(await removeCartItem(item && item.id, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}
