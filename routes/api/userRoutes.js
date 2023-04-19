const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    postUserLogin,
    readToken
} = require('../../controllers/userController');

// @ api/users
router.route('/')
.get(getUsers)

// @ api/users/login
router.route('/login')
.post(postUserLogin)

// @ api/readtoken
router.route('/readtoken')
.get(readToken)

// @api/users/:userId
router.route('/:userId')
.get(getSingleUser)

module.exports = router;