const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost/note-app', {
mongoose.connect('mongodb+srv://note_app:ormZFJ56a1WOMUQh@cluster0-ambcv.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is ok'))
  .catch(err => console.error(err));
