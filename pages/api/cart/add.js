import addToCart from '../mockdata/cart/add_to_cart'

async function handler(req, res) {
  const { product, brand, quantity } = req.body
  const result = await addToCart(product && product.id, brand, quantity, req, res)
  res.json(result)
}

export const config = {
  api: {
    bodyParser: true,
  },
}

export default handler
