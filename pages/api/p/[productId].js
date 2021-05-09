import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import getDefaultAppData from '../mockdata/default_app_data'
import getProduct from '../mockdata/get_product'

export default async function pdp(req, res) {
  const { productId } = req.query
  return res.json(
    await fulfillAPIRequest(req, {
      appData: () => Promise.resolve( getDefaultAppData() ),
      pageData: () => Promise.resolve(getProduct(productId))
    })
  )
}
