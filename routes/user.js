const { Router } = require('express');
const router = Router();
const User = require('../model/user');

router.post('/create', async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (user) {
      res.status(200).send(user);
    } else {
      const newUser = new User({ ...req.body });
      newUser.isAdmin = false;
      await newUser.save();
      res.status(200).send(newUser);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/get', async (req, res) => {
  const { uid } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (user) {
      res.status(200).send(user);
    } else {
      setTimeout(async () => {
        user = await User.findOne({ uid });
        if (user) {
          res.status(200).send(user);
        } else {
          res.status(500).send('No user found');
        }
      }, 2000);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/is-admin', (req, res) => {
  const { uid } = req.body;
  const isAdmin = process.env.ADMIN_UID === uid;
  res.status(200).send(isAdmin);
});

module.exports = router;
