import React, { useContext }  from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { createLazyProps, fetchFromAPI } from 'react-storefront/props'
import useLazyState from 'react-storefront/hooks/useLazyState'
import Row from 'react-storefront/Row'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  }
}))

export default function CheckoutSuccess(lazyProps) {
  const classes = useStyles()
  const [state] = useLazyState(lazyProps)
  const { session, actions } = useContext(SessionContext)

  const items = get(session, 'cart.items')

  items.forEach((item, i) => {
    actions.removeCartItem({
      item: item
    })
  });


  return (
    <Container className={classes.root}>
      <Row>
        <Typography variant="h6">
          {state.pageData.title}
        </Typography>
      </Row>
      <div className={classes.main}>
        <Typography variant="body1" color="primary">
          {state.pageData.message}
        </Typography>
      </div>
    </Container>
  )
}
CheckoutSuccess.getInitialProps = createLazyProps(fetchFromAPI)
