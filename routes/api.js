const express = require('express');
const models = require('../models');

const router = express.Router();

// 建立使用者
router.post('/user/create', async (req, res) => {
  const newUser = await models.User.create({
    username: req.body.username,
  });

  return res.redirect('/users');
});

// 刪除使用者
router.get('/user/:user_id/destroy', (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(() => res.redirect('/users'));
});

// 建立使用者任務
router.post('/user/:userId/task', (req, res) => {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.userId,
    done: false,
  }).then(async () => {
    await router.goTodoPage(req, res);
  });
});

// 刪除使用者任務
router.delete('/user/:userId/task/:taskId', (req, res) => {
  models.Task.destroy({
    where: {
      id: req.params.taskId,
    },
  }).then(async () => {
    await router.goTodoPage(req, res);
  });
});

// 更新任務狀態
router.put('/user/:userId/task/:taskId', async (req, res) => {
  try {
    const task = await models.Task.findOne({
      where: { id: req.params.taskId },
    });
    task.done = !task.done;
    await task.save();

    await router.goTodoPage(req, res);
  } catch (e) {
    console.error(e.stack);
    throw e;
  }
});

// 取得特定使用者任務
router.post('/user/tasks', async (req, res) => {
  try {
    const users = await models.User.findAll();
    const user = await models.User.findOne({
      where: { id: req.body.id },
    });

    const tasks = await models.Task.findAll({
      where: { Userid: req.body.id },
    });

    return res.render('todo', {
      title: 'Tasks',
      data: {
        user,
        users,
        tasks,
      },
    });
  } catch (e) {
    console.error(e.stack);
    throw e;
  }
});

// 返回 todo 頁面
router.goTodoPage = async (req, res) => {
  const users = await models.User.findAll();
  return res.render('todo', {
    title: 'Task list',
    data: {
      users,
      tasks: [],
    },
  });
};
module.exports = router;
