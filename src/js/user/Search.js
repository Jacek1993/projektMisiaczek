import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import queryString from 'query-string'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import {search} from './api-user'
import Users from "./Users";



const styles = theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        paddingTop: 10,
        backgroundColor: '#80808024'
    },
    menu: {
        width: 600,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 130,
        verticalAlign: 'bottom',
        marginBottom: '20px'
    },
    searchField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
        marginBottom: '20px'
    },
    searchButton: {
        minWidth: '20px',
        height: '30px',
        padding: '0 8px'
    },
    media:{
        maxHeight: "2000"
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    }
})

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            searched: false,

        }

    }

    componentWillReceiveProps(props){
        this.setState({searchResults: props.searchResults});
        this.setState({searched: props.searched})
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    browse = () => {
        if (this.state.search) {
            let query = {};
            query.search = this.state.search;
            console.log(queryString.stringify(query))
            search(queryString.stringify(query)).then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    this.setState({searchResults: data});
                    if (!data) {
                        this.setState({searched: true});
                    }
                    console.log(data)
                }
            })
        }
    }

    enterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.browse();

        }
    }

    render() {
        const {classes} = this.props;
        console.log(this.state.searchResults)
        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <TextField
                            id="search"
                            label="Search products"
                            type="search"
                            onKeyDown={this.enterKey}
                            onChange={this.handleChange('search')}
                            className={classes.searchField}
                            margin="normal"
                        />
                        <Button variant="raised" color={'primary'} className={classes.searchButton} onClick={()=>{this.browse()}}>
                            <SearchIcon/>
                        </Button>
                    </CardActionArea>
                    <Users searchResults={this.state.searchResults}/>
                </Card>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search)