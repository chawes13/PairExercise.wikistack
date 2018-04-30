const express = require('express');
const { User, Page } = require('../models');
const userListPage = require('../views/userList');
const userPage = require('../views/userPages');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const usersData = await User.findAll();
    res.send(userListPage(usersData));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {dataValues: user} = await User.findById(req.params.id);
    const pagesData = await Page.findAll({
      where: {
        authorId: req.params.id
      }
    });

    res.send(userPage(user, pagesData));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
