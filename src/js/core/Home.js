import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Search from "../user/Search";
import Grid from "@material-ui/core/Grid/Grid";
import {list} from '../user/api-user'
// import seashellImg from './../assets/images/seashell.jpg'


const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    paper: {
        height: '300px',
        width: '100%',
        margin: '0 auto'
    },
    grid:{
        margin: '300px'
    }
})

class Home extends Component {
    constructor(){
        super();
        this.state={
            searchResults: [],
            error: ''
        }
        this.loadUsers=this.loadUsers.bind(this)
    }


    loadUsers(){

        list().then((response)=>{
            if(response.error){
                console.log(response.error)
                this.setState({error: response.error});
            }
            else{
                this.setState({searchResults: response})
            }
        })
    }

    componentDidMount(){
        this.loadUsers();
        console.log('componentDidMount')
    }

  render() {
    const {classes} = this.props
    return (
        <Grid container spacing={2}>
            <Grid container xs={11} sm={11} margin={200} >
                {this.state.searchResults &&(
                    <Search searchResults={this.state.searchResults} />
                )}

            </Grid>
            <Grid items xs={1} sm={1}>

            </Grid>
        </Grid>
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