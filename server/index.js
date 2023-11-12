const mongoose = require('mongoose');
const User = require('./schema/user');
const Task = require('./schema/task');
const Training = require('./schema/training');
const Note = require('./schema/note');
const FlashCards = require('./schema/flashcard');
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://szymonklam17:f01qflDRd98I8TiQ@cluster0.xwqkqzv.mongodb.net/workly',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then((err) =>
    err ? console.log(err) : console.log('Connected to yourDB-name database')
  );

User.createIndexes();
Task.createIndexes();

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/add_task', async (req, res) => {
  const { taskName, startDate, endDate, priority, description, user_id } =
    req.body;

  try {
    const newTask = new Task({
      taskName,
      startDate,
      endDate,
      priority,
      description,
      user_id,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/tasks', async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);
  try {
    const tasks = await Task.find({ user_id });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  console.log('Received task ID:', taskId);
  const updatedData = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/del_task/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
let token = '';
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Nieprawna nazwa' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Nieprawne hasło' });
    }
    token = jwt.sign(
      { userId: user._id },
      'daskrqpeksq41jglzchtq2rsrsgap23dadadadasd122',
      {
        expiresIn: '1h',
      }
    );

    res.json({ token, _id: user._id, user });
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.post('/check_token', async (req, res) => {
  try {
    if (req.body.access == token) return res.json(true);
    else return res.json(false);
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.post('/add_training', async (req, res) => {
  const { title, data, user_id } = req.body;

  const newTraining = new Training({ title, data, user_id });
  const savedTraining = await newTraining.save();
  console.log(data);
  res.status(201).json(savedTraining);
});
app.get('/trainings', async (req, res) => {
  const { user_id } = req.query;
  try {
    const tasks = await Training.find({ user_id });
    console.log(tasks);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/edit_training', async (req, res) => {
  const { id, data, title } = req.body;
  try {
    const result = await Training.findByIdAndUpdate(
      id,
      { title, data },
      { new: true }
    );

    if (result) {
      res.json('Pomyślnie zaktualizowano dane');
    } else {
      res.json('Nie udało się zaktualizować danych');
    }
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych:', error);
    res.status(500).json('Błąd serwera');
  }
});
app.delete('/del_training/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTraining = await Training.findByIdAndDelete(id);

    if (!deletedTraining) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add_note', async (req, res) => {
  const { title, text, user_id, date, hour } = req.body;
  const newNode = new Note({ title, text, user_id, date, hour });
  const savedNode = await newNode.save();
  res.status(201).json(savedNode);
});
app.get('/get_note', async (req, res) => {
  const { user_id } = req.query;

  try {
    const notes = await Note.find({ user_id });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/edit_note', async (req, res) => {
  const { id, title, text, date, hour } = req.body;
  try {
    const result = await Note.findByIdAndUpdate(
      id,
      { title, text, date, hour },
      { new: true }
    );

    if (result) {
      res.json('Pomyślnie zaktualizowano dane');
    } else {
      res.json('Nie udało się zaktualizować danych');
    }
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych:', error);
    res.status(500).json('Błąd serwera');
  }
});

app.delete('/del_note/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/add_flashCards', async (req, res) => {
  const { title, data, user_id } = req.body;
  const newFlashCards = new FlashCards({ title, data, user_id });
  const savedNode = await newFlashCards.save();
  res.status(201).json('dodano');
});
app.get('/get_flashCards', async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);
  try {
    const flashcards = await FlashCards.find({ user_id });
    res.json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/edit_flashCards', async (req, res) => {
  const { id, title, data } = req.body;
  try {
    const result = await FlashCards.findByIdAndUpdate(
      id,
      { title, data },
      { new: true }
    );

    if (result) {
      res.json('Pomyślnie zaktualizowano dane');
    } else {
      res.json('Nie udało się zaktualizować danych');
    }
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych:', error);
    res.status(500).json('Błąd serwera');
  }
});

app.delete('/del_flashCard/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCards = await FlashCards.findByIdAndDelete(id);

    if (!deletedCards) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3001);
