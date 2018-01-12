const models = require('../models');
const express = require('express');

const router = express.Router();

// 首頁
router.get('/', async (req, res) => {
  const users = await models.User.findAll();

  return res.render('index', {
    title: 'Express Example',
    data: {
      users,
    },
  });
});

router.get('/about', async (req, res) => {
  const me = await models.User.find({
    username: 'david',
  });

  return res.render('about', {
    title: 'Express Example',
    data: {
      me,
    },
  });
});

// 使用者清單
router.get('/users', async (req, res) => {
  const users = await models.User.findAll();

  return res.render('user', {
    title: 'User list',
    data: {
      users,
    },
  });
});

// TASK 清單
router.get('/todo', async (req, res) => {
  const users = await models.User.findAll();
  return res.render('todo', {
    title: 'Todo list',
    data: {
      users,
      tasks: [],
    },
  });
});

module.exports = router;
