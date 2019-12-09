const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

class Account {
  constructor(name, budget) {
    this.name = name;
    this.budget = budget;
  }
}
/// GET ALL ACCOINTS
server.get('/', async (req, res) => {
  try {
    const accs = await db('accounts');
    res.status(200).json(accs);
  } catch (error) {
    res.status(500).json({ error: 'SERVER MALFUNCTIONING' });
  }
});

/// GET BY ID
server.get('/:id', async (req, res) => {
  try {
    const acc = await db('accounts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(acc);
  } catch (error) {
    res.status(500).json({ error: 'SERVER MALFUNCTIONING' });
  }
});

/// POST NEW ACCOUNT
server.post('/', async (req, res) => {
  try {
    const newAcc = new Account(req.body.name, req.body.budget);
    const newAccId = await db('accounts').insert(newAcc);
    res.status(200).json({ id: newAccId[0], ...newAcc });
  } catch (error) {
    res.status(500).json({ error: 'SERVER MALFUNCTIONING' });
  }
});

/// UPDATE ACCOUNT BY ID
server.put('/:id', async (req, res) => {
  try {
    const updatedAcc = new Account(req.body.name, req.body.budget);
    const updatedAccId = await db('accounts')
      .where({ id: req.params.id })
      .update(updatedAcc, ['id', 'name', 'budget']);
    res.status(200).json({ id: updatedAccId, ...updatedAcc });
  } catch (error) {
    res.status(500).json({ error: 'SERVER MALFUNCTIONING' });
  }
});

/// DELETE ACCOUNT BY ID
server.delete('/:id', async (req, res) => {
  try {
    await db('accounts')
      .where({ id: req.params.id })
      .del();
    res.status(200).json({ msg: 'Account Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'SERVER MALFUNCTIONING' });
  }
});

module.exports = server;
