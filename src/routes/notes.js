const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/add-note');
});

router.get('/notes', isAuthenticated, async (req, res) => {
  // Note.find({titulo: 'Nota1'}); filtradp por
  // const notes = await Note.find(); todo
  const notes = await Note.find({user: req.user.id}).sort({fecha: 'desc'});
  res.render('notes/all-notes', { notes });
});

router.post('/notes/add', isAuthenticated, async (req, res) => {
  const { titulo, descripcion }= req.body;
  const errors = [];
  if (!titulo) {
    errors.push({msgerror: 'inserta un título'});
  }
  if (!descripcion) {
    errors.push({msgerror: 'inserta un descripción'});
  }

  if (errors.length > 0) {
    res.render('notes/add-note', {
      errors,
      titulo,
      descripcion
    });
  }else {
    const newNote = new Note({ titulo, descripcion });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Nota creada')
    res.redirect('/notes');
  }
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('notes/edit-note', {note});
});

router.put('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const { titulo, descripcion}= req.body;
  await Note.findByIdAndUpdate(req.params.id, { titulo, descripcion});
  req.flash('success_msg', 'Nota editada');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Nota eliminada');
  res.redirect('/notes');
});



module.exports = router;
