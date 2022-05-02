import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';

export default function TaskForm() {
  
  const [task, setTask] = useState({
    title: '',
    description: '',
  })
  
  const handleChange = e => {
    setTask({...task, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = e =>{
    e.preventDefault();
    console.log(task);
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
            color="white">
            Create Task
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
                onChange={handleChange}
                inputProps={{style: {color: "white"}}}
                InputLabelProps={{style: {color: 'white'}}}
              />
                
                <Button variant="contained" color="primary" type="submit">
                  Add
                </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}