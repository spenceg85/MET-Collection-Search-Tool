import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'

// styling using hooks

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px',
    maxWidth: '95%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  title: {
    color: 'black'
  },
  dotIcon: {
    color: 'gray',
    fontSize: 'small'
  },
  scores: {
    float: 'right',
    width: '15%'
  },
  popularity: {
    backgroundColor: 'white',
    '& .MuiLinearProgress-barColorPrimary': {
      color: '#29ABE2',
      backgroundColor: '#29ABE2'
    }
  },
  maintenance: {
    backgroundColor: 'white',
    '& .MuiLinearProgress-barColorPrimary': {
      color: '#cb3837',
      backgroundColor: '#cb3837'
    }
  },
  quality: {
    backgroundColor: 'white',
    '& .MuiLinearProgress-barColorPrimary': {
      color: '#8956FF',
      backgroundColor: '#8956FF'
    }
  },
  loading: {
    textAlign: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))

const SearchResults = (props) => {
  const classes = useStyles()
  const [results, setResults] = useState(props.searchResults)

    // hook to listen for changes in results prop, makes sure to re-render
  useEffect(() => { setResults(props.searchResults) }, [props.searchResults]);

  // function called on map over results to return list elements
  const getListFromResults = (result, index) => {
    return (
      <div key={result.objectID}>
        <ListItem alignItems="flex-start">
          <ListItemText
            className={classes.title}
            primary={
              <Link
                href={result.objectWikidata_URL}
                target="_blank"
                color="inherit"
              >
                <h4>{result.title}</h4>
              </Link>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  <p>{result.creditLine}</p>
                  {
                    <strong>
                      <a href={result.artistULAN_URL} target={'_blank'}>
                      {result.artistDisplayName ? result.artistDisplayName : 'Uknown Artist'} {' '} {'(' + result.artistBeginDate + ' - ' + result.artistEndDate + ')'}
                      </a>
                    </strong>
                  } <strong>
                    <br></br>
                    Bio: </strong>{result.artistDisplayBio}
                  {' '} 
                  {/* extras */}
                  <span>
                    <a href={result.objectWikidata_URL} target={'_blank'}><img style={{height: '200px', height: '150px', float: 'right'}} src={result.primaryImageSmall}></img></a>
                  </span>
                  <p>
                    {result.tags &&
                      result.tags.length > 0 &&
                      result.tags.map(keyword =>
                        mapChips(keyword)
                      )}
                  </p>
                </Typography>
                <strong>Accession Year:</strong>{' '} {result.accessionYear}
                <br></br>
                <strong>Medium:</strong>{' '}{result.medium}
                <br></br>
                <strong>Object Date:</strong>{' '}{result.objectDate}
                <FiberManualRecordIcon
                  className={classes.dotIcon}
                />{' '}
                Repository: {result.repository}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  }
  const mapChips = keyword => {
    return (
      <Chip
        label={keyword.term}
        component="a"
        href={keyword.Wikidata_URL}
        target="_blank"
        clickable
      />
    )
  }

  // const mapScores = detail => {
  //   const maintenanceScore = detail.maintenance * 10
  //   const popularityScore = detail.popularity * 10
  //   const qualityScore = detail.quality * 10

  //   return (
  //     <div className={classes.scores}>
  //       p
  //       <LinearProgress
  //         className={classes.popularity}
  //         color="primary"
  //         variant="determinate"
  //         value={popularityScore}
  //       />
  //       q
  //       <LinearProgress
  //         className={classes.quality}
  //         color="primary"
  //         variant="determinate"
  //         value={qualityScore}
  //       />
  //       m
  //       <LinearProgress
  //         className={classes.maintenance}
  //         color="primary"
  //         variant="determinate"
  //         value={maintenanceScore}
  //       />
  //     </div>
  //   )
  // }

  return (
    <List className={classes.root}>
     
     { props.loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        results.map((node, index) =>
          getListFromResults(node, index)
        )
      )}
    </List>
  )
}

export default SearchResults;