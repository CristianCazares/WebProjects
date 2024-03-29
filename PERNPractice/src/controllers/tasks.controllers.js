const pool = require('../db');

const home = (req, res, next) => {
    res.send("Home backend");
}

const getAllTasks = async(req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks"
        );
        res.send(result.rows);
    } catch (error) {
        next(error);
    }
}

const getTask = async(req, res, next) => {
    try {
        const {id} = req.params;
        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );
    
        if(result.rows.length == 0){
            return res.status(404).json({
                message: "Task not found",
            });
        }
        
        res.json(result.rows[0]);
        
    } catch (error) {
        next(error);

    }
}

const createTask = async(req, res, next) => {
    const {title, description} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.json(result.rows[0]);        
    }catch (error) {
        next(error);
    }

}

const deleteTask = async(req, res, next) => {
    const {id} = req.params;

    try {
        const result = await pool.query(
            
            "DELETE FROM tasks WHERE id = $1", //Just delete
            //"DELETE FROM tasks WHERE id = $1 RETURNING *", //Delete and show the deleted item (result.rows)
            [id]
        );
    
        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Task not found"
            });
        }
        
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const updateTask = async(req, res, next) => {
    const {id} = req.params;
    const {title, description} = req.body;

    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        );
    
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Task not found",
            });
        }
    
        res.send(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    home
}