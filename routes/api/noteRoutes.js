const router = require('express').Router();

const {
    getNotes,
    getSingleNote,
} = require('../../controllers/noteController');

// @api/notes
router.route('/')
.get(getNotes)

// @api/notes/noteId
router.route('/:noteId')
.get(getSingleNote)

module.exports = router;