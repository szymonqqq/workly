const mongoose = require('mongoose');
const FleshCardsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
const FlashCards = mongoose.model('FlashCards', FleshCardsSchema);
module.exports = FlashCards;
