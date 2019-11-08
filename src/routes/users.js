const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require('passport');


router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin' ,
  failureFlash: true
}));



router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/add', async (req, res) => {
  const { nombre, email, password, conf_password }= req.body;
  const errors = [];
  if (nombre.length == 0 && email.length == 0 && password.length == 0 && conf_password.length == 0) {
    errors.push({text: 'No puedes dejar campos vacios'});
  }
  if (password != conf_password) {
    errors.push({text: 'Las contraseñas no coinciden'});
  }
  if (password.length < 4) {
    errors.push({text: 'La contraseña debe contener mas de 4 caractéres'});
  }
  if (errors.length > 0) {
    res.render('users/signup', {errors, nombre, email, password, conf_password});
  }else {
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      req.flash('error_msg', 'El E-mail ya esta en uso');
      res.redirect('/users/signup')
    }else {
      const newUser = new User({nombre, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Registro exitoso');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
