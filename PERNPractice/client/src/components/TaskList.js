import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function TaskList() {

  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    try {
      const response = await fetch("http://localhost:4000/tasks");
      const data = await response.json();
      setTasks(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() =>{
    loadTasks();
  }, [])
  
  
  const handleDelete = async(id) =>{
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE"
      });
  
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
    <h1>My tasks</h1>
    {
      tasks.map(task => (
        <Card
            style={{
              marginBottom: ".7rem",
              background: "#1e272e"
            }}
            key={task.id}
          >
          <CardContent style={{
            display: "Flex",
            justifyContent: "space-between"
          }}>
            <div style={{color: "#fff"}}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            
            <div>
              <Button
                variant='contained'
                color='inherit'
                >
                Edit
              </Button>
              <Button
                variant='contained'
                color="warning"
                style={{marginLeft: "0.5rem"}}
                onClick={() => handleDelete(task.id)}
                >
                Delete
              </Button>
            </div>

          </CardContent>
        </Card>
      ))
    }
    </>
  )
}
