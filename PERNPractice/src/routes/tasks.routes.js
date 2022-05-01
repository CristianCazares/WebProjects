const {Router} = require("express");
const pool = require('../db');

const router = Router();

router.get('/', (req, res) => {
    res.send("homepage");
});

router.get('/db', async(req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0].now);
});

router.get('/tasks', (req, res) => {
    res.send("retrieveing a list of tasks");
});

router.post('/tasks', (req, res) => {
    res.send("creating task");
});

router.delete('/tasks', (req, res) => {
    res.send("deleting a task");
});

router.put('/tasks', (req, res) => {
    res.send("updating a list of taks");
});

module.exports = router;