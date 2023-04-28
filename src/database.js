const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://AbDev:Ab123@abcluster.loywk7g.mongodb.net/?retryWrites=true&w=majority', {
})
  .then(db => console.log('DB is connect'))
  .catch(err => console.error(err))
