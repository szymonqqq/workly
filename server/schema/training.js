const mongoose = require('mongoose');
const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
