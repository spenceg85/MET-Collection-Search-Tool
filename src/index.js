import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SearchField from './components/search'
import SearchResults from './components/results'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import './styles.css'
import getData from './utils/services'
import met from './assets/met.png'
import SearchIcon from '@material-ui/icons/Search'
import {makeStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      '@media (max-width: 905px)': {
        width: '95%'
      },
      '@media (min-width: 905px)': {
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
    '&:hover': {
      color: 'black',
      backgroundColor: 'gray'
    },
    '@media (max-width: 905px)': {
      width: '95%'
    },
    '@media (min-width: 905px)': {
      float: 'right'
    }
  }
}))

function App(props) {
  const classes = useStyles()
  const [queryString, setQueryString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(true)
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    let deptUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/departments';
    getData(deptUrl)
        .then(response => response.json()).then((res) => {
          setDepartments(res.departments);
        })
  }, [])

  const mapDepts = (depts) => {
    return (
    <Chip
              variant="contained"
              id="search-button"
              style={{margin: '3px'}}
              label={depts.displayName}
              onClick={e => {
                handleSearch(depts.departmentId)
              }}
              endIcon={<SearchIcon />}
            >
              
            </Chip>
    )
  }

  // capture user input and map to state

  const handleTextChange = e => {
    setQueryString(e.target.value)
  }

  // set throw error boolean true/false checkbox

  const handleChange = event => {
    setIsHighlighted(event.target.checked)
  }

  // make npm API call

  const handleSearch = (departmentId) => {
    // check if user entered a search string, if not prompt for one, politely

    if (departmentId || queryString) {
      //clear results

      setSearchResults([])

      // set loading true

      setLoading(true)

      // define url

      const url = departmentId
        ? `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${queryString}&isHighlight=true&department=${departmentId}`
        : `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${queryString}&isHighlight=true` // `https://api.npms.io/v2/search/suggestions?q=${queryString}`
      getData(url)
        .then(response => response.json())
        .then(json => {
          if (json && json.objectIDs.length > 0) {
            const collection = [];
            json.objectIDs.forEach(element => {
              let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${element}`
              getData(url).then(response => response.json())
              .then((json) => {
                collection.push(json);
              })
            })
            setTimeout(() => {
              setLoading(false)
            setSearchResults(collection)
            }, 2500);
            setTimeout(() => {
              setLoading(false)
            setQueryString(' ')
            }, 10000);
          } else {
            alert(
              'No objects found for this search criteria: ' +
                queryString
            )
            setLoading(false)
          }
        })
        .catch(error => {
          alert(error)
          setLoading(false)
        })
    } else {
      alert(
        'Please enter an MET art object name and click Search, thanks!'
      )
    }
  }

  // lets handle those errors - cleaner error handling (that actually works)

  // const handlErrors = response => {
  //   if (response.ok) {
  //     return response.json()
  //   } else {
  //     throw Error(
  //       'Unable to load search results: code ' +
  //         response.status +
  //         response.statusText
  //     )
  //   }
  // }

  return (
    <div className="App" css={{ color: 'darkgray' }}>
      <div style={{textAlign: 'center'}}>
      <img src={met}></img>
      </div>
      <h1 style={{textAlign: 'center'}}>MET Museum Collection Search Tool</h1>
      {/* Search Highlighted? <Checkbox
        indeterminate
        checked={isHighlighted}
        onChange={handleChange}
        inputProps={{
          'aria-label': 'is highlighted object checkbox'
        }}
      /> {' '} - selected works of art from The
      Met Museum’s permanent collection representing
      different cultures and time periods */}
      <div style={{display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'center'}}>
      {departments && departments.length &&
                      departments.map(dept =>
                        mapDepts(dept)
                      )}
                      </div>
      <SearchField
        searchTerm={handleTextChange}
        handleSearch={handleSearch}
      ></SearchField>
      <SearchResults
        key={JSON.stringify(searchResults)}
        loading={loading}
        searchResults={searchResults}
      ></SearchResults>
      by Spencer Grier
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
