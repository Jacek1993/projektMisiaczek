import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import multer from "multer";

const router = express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/list')
    .get(userCtrl.search);


router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, upload.single('avatar'),userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router
