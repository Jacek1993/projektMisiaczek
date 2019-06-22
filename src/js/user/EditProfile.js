import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import FileUpload from '@material-ui/icons/FileCopy'
import {sendForm} from "./api-user";
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    title: {
        margin: theme.spacing.unit * 2,
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    }
})

class EditProfile extends Component {
    constructor({match}) {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: '',
            avatar: ''
        }
        this.match = match
        this.handleFileChange = this.handleFileChange.bind(this)
    }

    componentDidMount = () => {
        const jwt = auth.isAuthenticated()
        read({
            userId: this.match.params.userId
        }, {t: jwt.token}).then((data) => {
            if (data.error) {
                this.setState({error: data.error})
            } else {
                this.setState({name: data.name, email: data.email, avatar: data.avatar})
            }
        })
    }

    handleFileChange(e) {
        this.setState({avatar: e.target.files[0]})
    }

    clickSubmit = () => {
        const jwt = auth.isAuthenticated();
        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined,
            avatar: this.state.avatar || undefined
        }
        console.log(user);
        const data = new FormData();
        data.append('name', user.name);
        data.append('email', user.email);
        data.append('password', user.password);
        data.append('avatar', user.avatar);
        sendForm({userId: this.match.params.userId}, {t: jwt.token}, data)
        this.setState({'userId': data._id, 'redirectToProfile': true})


    }
    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    render() {
        const {classes} = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/user/' + this.state.userId}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Edit Profile
                    </Typography>
                    {this.state.avatar&&
                    (<Avatar src={this.state.avatar.buffer} className={classes.bigAvatar}/>)}
                    <input accept="image/*" onChange={this.handleFileChange} className={classes.input}
                           id="icon-button-file" type="file"/>
                    <label htmlFor="icon-button-file">
                        <Button variant="raised" color="default" component="span">
                            Upload
                            <FileUpload/>
                        </Button>
                    </label> <span
                    className={classes.filename}>{this.state.photo ? this.state.photo : ''}</span><br/>
                    <TextField id="name" label="Name" className={classes.textField} value={this.state.name}
                               onChange={this.handleChange('name')} margin="normal"/><br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField}
                               value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
                    <TextField id="password" type="password" label="Password" className={classes.textField}
                               value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
                    <br/> {
                    this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}
                    </Typography>)
                }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="raised" onClick={this.clickSubmit}
                            className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        )
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
