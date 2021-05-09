import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import getDefaultAppData from './mockdata/default_app_data'

export default async function(req, res) {
  res.json(
      await fulfillAPIRequest(req, {
      appData: () => Promise.resolve( getDefaultAppData() ),
      pageData: () => Promise.resolve({
        title: "Home",
        slots: {
          heading: "Ace IT",
          description: "Your one-stop place for all IT gadgets!",
          deliverymessage: "Deliveries are currently only available to Singapore and KL. But don't worry, we are working hard to be able to reach you!",
          mainimage: "ace-it-image.jpg"
        }
      })
    })
  );
}
