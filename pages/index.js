import React from 'react'
import { Container, Typography, Card, CardActionArea, CardMedia } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles'
import useLazyState from 'react-storefront/hooks/useLazyState'
import CmsSlot from 'react-storefront/CmsSlot'
import LoadMask from 'react-storefront/LoadMask'
import Head from 'next/head'
import createLazyProps from 'react-storefront/props/createLazyProps'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(5, 0, 0, 0),

  },
  mainimage: {
    height: '500px',
    width: '100%'
  },
  mainalert: {
    width: '100%',
    margin: theme.spacing(0, 5, 5, 5),
  }
}))

export default function Index(lazyProps) {
  const classes = useStyles()
  const [state] = useLazyState(lazyProps)

  return (
    <>
      {state.loading ? null : (
        <Head>
          <title>{state.pageData.title}</title>
        </Head>
      )}
      <Container maxWidth="lg">
        {state.loading ? (
          <LoadMask fullscreen />
        ) : (
          <div className={classes.main}>
            <Alert className={classes.mainalert} variant="outlined" severity="info">
              {state.pageData.slots.deliverymessage}
            </Alert>
            <Card className={classes.mainimage}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Ace IT"
                  image={state.pageData.slots.mainimage}
                />
              </CardActionArea>
            </Card>
            <Typography variant="h2" component="h2" gutterBottom color="primary">
              {state.pageData.slots.heading}
            </Typography>
            <CmsSlot variant="h3">{state.pageData.slots.description}</CmsSlot>
          </div>
        )}
      </Container>
    </>
  )
}

Index.getInitialProps = createLazyProps(options => {
  const { res } = options
  if (res) res.setHeader('Cache-Control', 'max-age=99999')
  return fetchFromAPI(options)
})
