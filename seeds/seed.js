const sequelize = require('../config/connection');
const { User, Note } = require('../models');

const userData = require('./userData.json');
const noteData = require('./noteData.json');

const seedDatabase = async () => {
  await sequelize.sync({ alter: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const notes = await Note.bulkCreate(noteData);

  process.exit(0);
};

seedDatabase();
