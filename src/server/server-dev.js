import path from 'path'
import express from 'express'
import webpack from 'webpack'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import mongoose from "mongoose";
import Config from './../config/config';
import Template from './template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import MainRouter from './../js/MainRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';
import {indigo, pink} from '@material-ui/core/colors';


mongoose.Promise=global.Promise;
mongoose.connect(Config.mongoUri);
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`)
})
const app = express(),
            DIST_DIR = __dirname,

            compiler = webpack(config);
console.log(compiler);
//to jest to co jest w devBundle.js
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))


app.use(webpackHotMiddleware(compiler))

// const CURRENT_WORKING_DIR = process.cwd()
// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser);
app.use(compress());
app.use(helmet());
app.use(cors());


app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('*', (req, res) => {
    const sheetsRegistry = new SheetsRegistry()
    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#757de8',
                main: '#3f51b5',
                dark: '#002984',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff79b0',
                main: '#ff4081',
                dark: '#c60055',
                contrastText: '#000',
            },
            openTitle: indigo['400'],
            protectedTitle: pink['400'],
            type: 'light'
        },
    })
    const generateClassName = createGenerateClassName()
    const context = {}
    const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                    <MainRouter/>
                </MuiThemeProvider>
            </JssProvider>
        </StaticRouter>
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const css = sheetsRegistry.toString()
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }
})



app.listen(Config.port, () => {
    console.log(`App listening to ${Config.port}....`)
    console.log('Press Ctrl+C to quit.')
})
