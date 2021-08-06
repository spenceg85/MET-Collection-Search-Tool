import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
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

export default function SearchResults(props) {
  const classes = useStyles()
  const [results, setResults] = useState([])

  // hook to listen for changes in results prop, makes sure to re-render
  useEffect(() => {
    let results = []
    results = props.searchResults
    setResults(results)
  }, [props.searchResults])

  // function called on map over results to return list elements
  const getListFromResults = (result, index) => {
    return (
      <div key={result.package.name}>
        <ListItem alignItems="flex-start">
          <ListItemText
            className={classes.title}
            primary={
              <Link
                href={result.package.links.npm}
                target="_blank"
                color="inherit"
              >
                <h4>{result.package.name}</h4>
              </Link>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  <p>{result.package.description}</p>
                  {
                    <strong>
                      {result.package.publisher.username}
                    </strong>
                  }{' '}
                  {/* extras */}
                  <span>
                    {result.score.detail
                      ? mapScores(result.score.detail)
                      : ''}
                  </span>
                  <p>
                    {result.package.keywords &&
                    result.package.keywords.length > 0
                      ? result.package.keywords.map(
                          keyword => mapChips(keyword)
                        )
                      : ''}
                  </p>
                </Typography>
                published {result.package.version}{' '}
                <FiberManualRecordIcon
                  className={classes.dotIcon}
                />{' '}
                {result.package.date.split('-')[0]}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  }

  const mapChips = keyword => {
    let url = `https://www.npmjs.com/search?q=keywords:${keyword}`
    return (
      <Chip
        label={keyword}
        component="a"
        href={url}
        target="_blank"
        clickable
      />
    )
  }

  const mapScores = detail => {
    const maintenanceScore = detail.maintenance * 10
    const popularityScore = detail.popularity * 10
    const qualityScore = detail.quality * 10

    return (
      <div className={classes.scores}>
        p
        <LinearProgress
          className={classes.popularity}
          color="primary"
          variant="determinate"
          value={popularityScore}
        />
        q
        <LinearProgress
          className={classes.quality}
          color="primary"
          variant="determinate"
          value={qualityScore}
        />
        m
        <LinearProgress
          className={classes.maintenance}
          color="primary"
          variant="determinate"
          value={maintenanceScore}
        />
      </div>
    )
  }

  return (
    <List className={classes.root}>
      {results && results.length ? (
        results.map((node, index) =>
          getListFromResults(node, index)
        )
      ) : props.loading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        ''
      )}
    </List>
  )
}
