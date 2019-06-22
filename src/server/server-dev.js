import express from 'express'
import webpack from 'webpack'
import bodyParser from 'body-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import mongoose from "mongoose";
import Config from './../config/config';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import React from 'react';
import path from 'path'



mongoose.Promise=global.Promise;
mongoose.connect(Config.mongoUri);
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database:`)
})
const app = express(),
            DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);
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
    res.sendFile(HTML_FILE)

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
