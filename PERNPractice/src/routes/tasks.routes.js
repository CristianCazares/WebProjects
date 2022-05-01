const {Router} = require("express");
const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    home,
} = require('../controllers/tasks.controllers');

const router = Router();

router.get('/', home);

router.get('/tasks', getAllTasks);

router.get("/tasks/:id", getTask);

router.post('/tasks', createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', updateTask);

module.exports = router;