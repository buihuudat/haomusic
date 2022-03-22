const express = require('express');
const User = require('../../../models/user');
const co = require('co');
const loginValidator = require('../../../shared/validations/login');
const signupValidator = require('../../../shared/validations/signup');

const router = express.Router();

router.put('/save', (req, res, next) => {
  const { fullname, email, username, password, phone, passwordConfirmation } = req.body;
  const { isValid, errors } = signupValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ error: true, errors });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: true, errors: { password: 'Passwords do not match' } });
  }

  co(function* () {
    const existingEmail = yield User.findOne({ email });
    
    if (existingEmail) {
      return res.status(400).json({ error: true, errors: { email: 'Email already exists' } });
    }


    const user = new User({ fullname, email, username, password, phone });
    return user.save();
  })
  .then(user => res.json({
    fullname: user.fullname,
    avatar: user.avatar || 'https://i.pinimg.com/originals/9d/05/86/9d0586ac63b7e7a30a6ffafcbb4e0a93.gif',
    username: user.username,
    password: user.password,
    access_token: user.access_token,
  }))
  .catch(err => next(err));
});

router.post('/signup', (req, res, next) => {
  const { fullname, email, username, password, phone } = req.body;
  const { isValid, errors } = signupValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ error: true, errors });
  }

  co(function* () {
    const existingUser = yield User.findOne({ username });
    const existingEmail = yield User.findOne({ email });
    
    if (existingEmail) {
      return res.status(400).json({ error: true, errors: { email: 'Email already exists' } });
    }

    if (existingUser) {
      const error = { status: 400, errors: { username: 'Username already exists' } };
      throw error;
    }

    const user = new User({ fullname, email, username, password, phone });
    return user.save();
  })
  .then(user => res.json({
    fullname: user.fullname,
    avatar: user.avatar || 'https://i.pinimg.com/originals/9d/05/86/9d0586ac63b7e7a30a6ffafcbb4e0a93.gif',
    username: user.username,
    password: user.password,
    access_token: user.access_token,
  }))
  .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const { isValid, errors } = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json({ error: true, errors });
  }

  co(function* () {
    const user = yield User.findOne({ username });
    if (!user) {
      const error = { status: 401, errors: { username: 'Invalid username' } };
      throw error;
    }

    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
      const error = { status: 401, errors: { password: 'Invalid password' } };
      throw error;
    }
    return user;
  })
  .then(user => res.json({
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    primary: user.primary,
    username: user.username,
    password: user.password,
    access_token: user.access_token,
  }))
  .catch(err => next(err));
});

module.exports = router;

