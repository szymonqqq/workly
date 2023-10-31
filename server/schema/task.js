const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  priority: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
