const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/rogues', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT rogues.id, rogues.user_id, rogues.alias, rogues.name, rogues.alive, rogues.year, categories.name as category
      FROM rogues
      JOIN categories
      ON categories.id = rogues.category_id `);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/categories', async(req, res) => {
  try {
    const data = await client.query('SELECT * from categories');

    res.json(data.rows);
  } catch(e) {

    res.status(500).jason({ error: e.message });
  }
});

app.get('/rogues/:id', async(req, res) => {
  try {
    const rogueId = req.params.id;

    const data = await client.query(`
      SELECT
        rogues.id,
        rogues.user_id,
        rogues.alias,
        rogues.name,
        rogues.alive,
        rogues.year,
        categories.id as category
      FROM rogues
      JOIN categories
      ON categories.id = rogues.category_id
      WHERE rogues.id=$1
    `, [rogueId]);

    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/rogues', async(req, res) => {
  try {
    const newUserId = req.body.user_id;
    const newAlias = req.body.alias;
    const newName = req.body.name;
    const newAlive = req.body.alive;
    const newCategory = req.body.category_id;
    const newYear = req.body.year;

    const data = await client.query(`
    INSERT INTO rogues (user_id, alias, name, alive, category_id, year)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [newUserId, newAlias, newName, newAlive, newCategory, newYear]);

    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/rogues/:id', async(req, res) => {
  try {
    const newUserId = req.body.user_id;
    const newAlias = req.body.alias;
    const newName = req.body.name;
    const newAlive = req.body.alive;
    const newCategory = req.body.category_id;
    const newYear = req.body.year;

    const data = await client.query(`
    UPDATE rogues
    SET user_id = $1,
    alias = $2,
    name = $3,
    alive = $4,
    category_id = $5,
    year = $6
    WHERE rogues.id = $7
    RETURNING *
    `,
    [newUserId, newAlias, newName, newAlive, newCategory, newYear, req.params.id]);

    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/rogues/:id', async(req, res) => {
  try {
    const rogueId = req.params.id;

    const data = await client.query(`
    DELETE from rogues
    WHERE rogues.id=$1
    `,
    [rogueId]);

    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
