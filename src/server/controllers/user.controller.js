import User from '../models/user.model'
import errorHandler from './../helpers/dbErrorHandler'
import sharp from 'sharp'
import fs from 'fs'

const create = (req, res, next) => {
    const user = new User(req.body)
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()
    })
}

const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    req.profile.avatar=new Uint8Array(req.profile.avatar)
    console.log(req.profile.avatar)
    return res.json(req.profile)
}

const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(users)
    }).select('name email updated created avatar')
}

const remove = (req, res, next) => {
    let user = req.profile
    user.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    })
}

const search = (req, res, next) => {
    let names = {};
    if (req.query.search) {
        names = {'$regex': req.query.search, '$options': 'i'};
    } else {
        let temp = [];
        res.status(200).send(temp)
    }

    User.find({name: names}, (err, response) => {
        if (err) {
            res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(response)
    }).select('name email created');
}


const update = (req, res, next) => {
    let user = req.profile
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer().then((data)=>{
        user.avatar=data;

        user.updated = Date.now()
        user.save((err) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        })
    })
   
}


export default {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    search
}
