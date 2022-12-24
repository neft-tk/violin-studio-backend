const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    readToken
} = require('../../controllers/api/userController');

// @ api/users
router.route('/')
.get(getUsers)

// @ api/readtoken
router.route('/readtoken')
.get(readToken)

// @api/users/:userId
router.route('/:userId')
.get(getSingleUser)

module.exports = router;