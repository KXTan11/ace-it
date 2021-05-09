import React, { useContext } from 'react'
import { Grid, Hidden, Divider, Container, Button, Typography, FormControl, Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'
import { createLazyProps, fetchFromAPI } from 'react-storefront/props'
import useLazyState from 'react-storefront/hooks/useLazyState'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'
import { Hbox } from 'react-storefront/Box'
import Row from 'react-storefront/Row'
import clsx from 'clsx'
import { price } from 'react-storefront/utils/format'
import Spacer from 'react-storefront/Spacer'
import Link from 'react-storefront/link/Link'


const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
  form: {
    width: '100%'
  },
  checkoutButton: {
    width: '100%',
  },
  docked: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      padding: `${theme.spacing(2)}px`,
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      borderRadius: '0',
      boxShadow: 'none',
    },
  },
  mainalert: {
    width: '100%',
    margin: theme.spacing(5, 0, 5, 5),
  }
}))

export default function Checkout(lazyProps) {
  const classes = useStyles()

  const [state, updateState] = useLazyState(lazyProps, {
    // additional data not fetched from the network to include in the state
    pageData: { states: [] },
    formData: {
      firstname: "",
      lastname: "",
      country: "",
      state: "",
      deliveryaddress: "",
      zipcode: "",
      phonenumber: ""
    },
    disabled: true,
  })
  const { session, actions } = useContext(SessionContext)

  const items = get(session, 'cart.items')

  const countries = get(state, 'pageData.countries') || []

  let states = get(state, 'pageData.states') || []
  function handleChangeCountry(event) {
    //event.preventDefault() // prevent the page location from changing
    //setCountry(event.target.value);
    var selectedcountry = countries.find(function(c) {
      return c.id === event.target.value
    }) || {};

    state.formData.state = "";
    state.pageData.states = selectedcountry.states
    onChange(event, "country")
  }


  function onChange(event, field) {
    var value = event.target.value
    state.formData[field] = value;
    state.disabled = !checkAllowed()
    updateState({ ...state })
  }

  function checkAllowed() {
    return state.formData.firstname
           && state.formData.lastname
           && state.formData.country
           && state.formData.state
           && state.formData.deliveryaddress
           && state.formData.phonenumber
           && state.formData.zipcode
  }

  return (
    <Container className={classes.root}>

      <Row>

        <Typography variant="h6">
          Checkout
        </Typography>
        <Alert className={classes.mainalert} variant="outlined" severity="info">
            {state.pageData.deliverymessage}
        </Alert>
      </Row>
      <Row>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <form className={classes.form} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel >First name</InputLabel>
                    <Input
                      id="firstname"
                      onChange={e => onChange(e, 'firstname')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel >Last name</InputLabel>
                    <Input
                      id="lastname"
                      onChange={e => onChange(e, 'lastname')}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel >Country</InputLabel>
                    <Select
                      name="country"
                      label="Country"
                      onChange={handleChangeCountry}
                    >
                      {countries.map((country, i) => (
                          <MenuItem
                            key={country.id}
                            value={country.id}
                          >
                            {country.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      label="State"
                      onChange={e => onChange(e, 'state')}
                    >
                    {states.map((s, i) => (
                        <MenuItem
                          key={s.value}
                          value={s.value}
                        >
                          {s.label}
                        </MenuItem>
                      ))
                    }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel >Delivery address</InputLabel>
                    <Input
                      id="deliveryaddress"
                      onChange={e => onChange(e, 'deliveryaddress')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel >Zip-code</InputLabel>
                    <Input
                      id="zipcode"
                      onChange={e => onChange(e, 'zipcode')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel >Phone number</InputLabel>
                    <Input
                      id="phonenumber"
                      onChange={e => onChange(e, 'phonenumber')}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Grid>
          {items.length === 0 ? null : (
            <Grid item xs={12} sm={4}>
              <div className={classes.checkoutPanel}>
                <Hbox alignItems="flex-start">
                  <div>
                    {items.map((product, i) => (
                        <Typography variant="subtitle1" >
                          {product.name}
                        </Typography>
                      ))
                    }
                    <Typography variant="subtitle2" className={classes.total}>
                      Cart Total
                    </Typography>
                    <Typography variant="caption">SST Tax (11%)</Typography>
                    <Typography variant="subtitle2" className={classes.total}>
                      Final Total
                    </Typography>
                  </div>
                  <Spacer />
                  <div>
                    {items.map((product, i) => (
                        <Typography variant="subtitle1" >
                          {price(
                            product.quantity * parseFloat(product.price),
                            { currency: get(session, 'currency') }
                          )}
                        </Typography>
                      ))
                    }
                    <Typography variant="subtitle2" className={classes.total}>
                      {price(
                        items.reduce((a, b) => a + b.quantity * parseFloat(b.price), 0),
                        { currency: get(session, 'currency') }
                      )}
                    </Typography>
                    <Typography variant="caption">
                      {price(
                        items.reduce((a, b) => a + b.quantity * parseFloat(b.price), 0) * 0.11,
                        { currency: get(session, 'currency') }
                      )}
                    </Typography>
                    <Typography variant="subtitle2" className={classes.total}>
                      {price(
                        items.reduce((a, b) => a + b.quantity * parseFloat(b.price), 0) * 1.11,
                        { currency: get(session, 'currency') }
                      )}
                    </Typography>

                  </div>
                </Hbox>
                <Hidden xsDown implementation="css">
                  <Row>
                    <Divider />
                  </Row>
                </Hidden>
                  <Link href="/checkout-success">
                    <Button
                      disabled={state.disabled}
                      color="primary"
                      variant="contained"
                      className={clsx(classes.checkoutButton, classes.docked)}
                    >
                      Confirm Order
                    </Button>
                  </Link>
              </div>
            </Grid>
          )}
        </Grid>
      </Row>
    </Container>
  )
}

Checkout.getInitialProps = createLazyProps(fetchFromAPI)
