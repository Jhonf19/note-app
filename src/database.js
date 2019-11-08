const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/note-app', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is ok'))
  .catch(err => console.error(err));
