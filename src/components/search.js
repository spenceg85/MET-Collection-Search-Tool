import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, FormControl, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

// styling using hooks

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      "@media (max-width: 905px)": {
        width: '95%'
      },
      "@media (min-width: 905px)": {
        width: '70%'
      }
    },
    width: '100%'
  },
  search: {
    width: '30ch',
    height: '7ch',
    color: 'white',
    backgroundColor: 'black',
    "&:hover": {
        color: 'black',
        backgroundColor: 'gray',
        },
        "@media (max-width: 905px)": {
            width: '95%'
          },
          "@media (min-width: 905px)": {
            float: 'right'
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
      <Button variant="contained" id="search-button" className={classes.search} onClick={(e) => {props.handleSearch()}} endIcon={<SearchIcon />} >
        Search
        </Button>
    </form>
    </Paper>
    </Grid>
    </Grid>
  );
}