const pool = require('../db');

const home = (req, res) => {
    res.send("homepage");
}

const getAllTasks = async(req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks"
        );
        res.send(result.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const getTask = async(req, res) => {
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
        console.log(error.message);
        res.json(error.message);
    }
}

const createTask = async(req, res) => {
    const {title, description} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.json(result.rows[0]);        
    } catch (error) {
        res.json({error: error.message})  
    }

}

const deleteTask = async(req, res) => {
    const {id} = req.params;

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
}

const updateTask = async(req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;

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
    
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    home
}