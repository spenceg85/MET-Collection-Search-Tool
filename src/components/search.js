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
        <Paper >
    <form className={classes.root} action="#" noValidate autoComplete="off" htmlFor='search-button' onSubmit={(e) => {props.handleSearch(); e.preventDefault()}}>
      <TextField id="outlined-basic" label="Search NPM" variant="outlined" onChange={(e) => props.searchTerm(e)} />
      <Button variant="contained" id="search-button" className={classes.search} onClick={(e) => {props.handleSearch()}} >
        Search
        </Button>
    </form>
    </Paper>
    </Grid>
    </Grid>
  );
}