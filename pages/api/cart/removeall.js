import removeAllCartItem from '../mockdata/cart/remove_all_cart_item'

export default async function handler(req, res) {
  const { item } = req.body || {}
  res.json(await removeAllartItem(item && item.id, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}
