// implement your API here
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const db = require('./data/db');

// Server
const port = 5000;
const server = express();
server.use(express.json());
server.use(cors());

// VALIDATOR
const joiValidateUser = body => {
  const schema = {
    name: Joi.string().required(),
    bio: Joi.string().required()
  };

  return Joi.validate(body, schema);
};
// ENDPOINTS

// GET ALL
server.get('/api/users', (req, res) => {
  db.find()
    .then(data => res.status(200).json(data))
    .catch(() =>
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
  const check = joiValidateUser(newUser);
  if (!check.error) {
    db.insert(newUser)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error =>
        res.status(500).json({
          error: 'There was an error while saving the user to the database'
        })
      );
  } else {
    res.status(400).json(check.error.details[0].message);
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
  const check = joiValidateUser(editedUser);
  if (!check.error) {
    db.update(id, editedUser)
      .then(data => {
        if (data !== 0) {
          res.status(200).json({ id: +id, ...editedUser });
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'The user information could not be modified.' });
      });
  } else {
    res.status(401).json(check.error.details[0].message);
  }
});

//Server Started
server.listen(port, () => console.log(`Server Listening On Port ${port}`));
