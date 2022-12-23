const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/events', eventRoutes);


module.exports = router;
