const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/note-app', {
mongoose.connect('mongodb+srv://note_app:ormZFJ56a1WOMUQh@cluster0-ambcv.mongodb.net/note-app?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
  .then(db => console.log('DB is ok'))
  .catch(err => console.error(err));
