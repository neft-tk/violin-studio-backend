const User = require('./User');
const Note = require('./Note');
const Event = require('./Event');

User.hasMany(Note, {
    onDelete: 'CASCADE'
});

Note.belongsTo(User);

module.exports = { User, Note, Event}