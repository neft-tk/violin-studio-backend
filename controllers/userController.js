const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { User, Note } = require("../models");

async function getUsers(req, res) {
  try {
    const usersData = await User.findAll({
      include: [
        {
          model: Note,
        },
      ],
    });
    return res.status(200).json(usersData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occured retrieving all user data", err });
  }
}

async function getSingleUser(req, res) {
  try {
    const userData = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Note,
        },
      ],
    });
    return res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "An error occured retrieving a single user's data", err });
  }
}

async function postUserLogin(req, res) {
  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ msg: "Invalid username credentials" });
    } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(401).json({ msg: "Invalid password credentials" });
    } else {
      const token = jwt.sign(
        {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "14d",
        }
      );
      return res.status(200).json({ token, user: foundUser })
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "An error occured logging in", err })    
  }
}

async function readToken(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: userData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: 'An error occured while reading the JWT.' });
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  postUserLogin,
  readToken,
};
