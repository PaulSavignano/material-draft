import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  root: {
    flex: '1 1 100px'
  },
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',

  },
  image: {
    maxWidth: '100%',
    minWidth: '100%',
    verticalAlign: 'top',
    width: '100%',
  }
}

const Image = ({
  classes,
  src
}) => {
  return (
    <div className={classes.root}>
    <div className={classes.container}>
      <img
        src={src}
        className={classes.image}
      />
    </div>
    </div>
  )
}

export default withStyles(styles)(Image)