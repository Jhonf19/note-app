const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/note-app', {
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL , {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB M is ok'))
  .catch(err => console.error(err));
