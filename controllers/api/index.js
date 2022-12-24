const router = require('express').Router();
const userRoutes = require('./userController');
const noteRoutes = require('./noteController');
const eventRoutes = require('./eventController');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/events', eventRoutes);


module.exports = router;
