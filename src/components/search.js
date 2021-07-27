import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, FormControl, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
       width: '70%'
    },
  },
  search: {
    float: 'right', 
    width: '30ch',
    height: '7ch',
    color: 'white',
    backgroundColor: 'black',
    "&:hover": {
        color: 'black',
        backgroundColor: 'gray',
    }
}
}));

export default function SearchField(props) {
  const classes = useStyles();

  return (
      <Grid container className={classes.grid} direction="row" >
           <Grid item xs={12}>
        <Paper className={classes.paper}>
    <form className={classes.root} noValidate autoComplete="off" htmlFor='outlined-basic' onSubmit={(e) => e.preventDefault}>
      <TextField id="outlined-basic" label="Search NPM" variant="outlined" onChange={(e) => props.searchTerm(e)} />
      <Button variant="contained" className={classes.search} >
        Search
        </Button>
    </form>
    </Paper>
    </Grid>
    </Grid>
  );
}