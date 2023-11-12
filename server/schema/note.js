const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
