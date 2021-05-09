import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import getDefaultAppData from './mockdata/default_app_data'

export default async function(req, res) {
  res.json(
      await fulfillAPIRequest(req, {
      appData: () => Promise.resolve( getDefaultAppData() ),
      pageData: () => Promise.resolve({
        title: "Checkout success!",
        message: "Thank you for your order! We will be delivering your items to you soon. Hope to see you again!"
      })
    })
  );
}
