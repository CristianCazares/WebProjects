import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom'

export default function TaskForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const handleChange = e => {
    setTask({...task, [e.target.name]: e.target.value});
  }

  const loadTaks = async (id)  =>{
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json()
    setTask({
      title: data.title,
      description: data.description
    })

    setEditing(true);

  }

  useEffect(() => {
    if(params.id){
      loadTaks(params.id);
    }
  }, [params.id])
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);

    if(editing){
      await fetch(`http://localhost:4000/tasks/${params.id}`,{
        method: "PUT",
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json"}
      });
    }else{
      await fetch("http://localhost:4000/tasks",{
        method: 'POST',
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json"}
      });
  
    }
    
    setLoading(false);
    navigate('/');
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <Card
          sx={{mt: 5}}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem"
          }}
          >

          <Typography variant='5'
            textAlign="center"
            color="white"
          >
            {editing ? "Edit task" : "Create task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='standard'
                label='Task title'
                autoComplete="off"
                sx={{
                  display: "block",
                  margin: "0.5rem 0"
                }}
                name="title"
                value={task.title}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}              
                InputLabelProps={{style: {color: 'white'}}}
              />
              <TextField
                variant='standard'
                label='Description'
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: "0.5rem 0"
                }}
                name="description"
                value={task.description}
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: 'white'}}}
              />
                
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!task.title || !task.description}
                > 
                    {loading ? <CircularProgress color='inherit' size={24}/>
                    :editing ? "Update"
                    :"Add"}
                </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
