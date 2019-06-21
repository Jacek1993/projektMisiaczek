import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// import seashellImg from './../assets/images/seashell.jpg'


const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

class Home extends Component {
  render() {
    const {classes} = this.props
    return (
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            Home Page
          </Typography>
          {/*<CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>*/}
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the MERN Skeleton home page.
            </Typography>
          </CardContent>
        </Card>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

/*
To validate the required injection of style declarations as props to the component, we add the PropTypes requirement validator to the defined component.
 */

export default withStyles(styles)(Home)

/*
we will export the component with the defined styles passed in using withStyles from Material-UI. Using withStyles like this creates
a Higher-order component (HOC) that has access to the defined style objects as props
 */

/*
[ …    {       test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,       use: 'file-loader'    }]
w webapack.config.client.js zapewnia ze statyczne obrazy beda renderowane w componentach
 */