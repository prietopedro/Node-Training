// implement your API here
const express = require('express');
const db = require('./data/db');

// Server
const port = 5000;
const server = express();
server.use(express.json());

// ENDPOINTS

// GET ALL
server.get('/api/users', (req, res) => {
  db.find()
    .then(data => res.status(200).json(data))
    .catch(error =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    );
});

// GET BY ID
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

// ADD A NEW USER
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(data => {
        res.status(201).json({ ...data, ...newUser });
      })
      .catch(error =>
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

// DELETE A USER
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(data => {
      if (data) {
        res.status(200).json({ Message: 'User Deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error =>
      res.status(500).json({ error: 'The user could not be removed' })
    );
});

// UPDATE A USER
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const editedUser = req.body;
  db.update(id, editedUser)
    .then(data => {
      if (data !== 0 && editedUser.bio && editedUser.name) {
        res.status(200).json({ id: +id, ...editedUser });
      } else if (data === 0) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res
          .status(401)
          .json({ errorMessage: 'Please provide name and bio for the user.' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: 'The user information could not be modified.' });
    });
});

//Server Started
server.listen(port, () => console.log(`Server Listening On Port ${port}`));
