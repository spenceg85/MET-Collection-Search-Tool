import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchField from './components/search';
import SearchResults from './components/results';
import Checkbox from '@material-ui/core/Checkbox';
import './styles.css';
import getData from './utils/services';

const App = () => {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [throwMe, setThrowMe] = useState(false);

  // capture user input and map to state

  const handleTextChange = (e) => {
    setQueryString(e.target.value)
    }

    // set throw error boolean true/false checkbox

    const handleChange = (event) => {
      setThrowMe(event.target.checked);
    };

  // make npm API call

  const handleSearch = () => {
    // check if user entered a search string, if not prompt for one, politely

    if(queryString) {
      
    //clear results
    
    setSearchResults([]);

    // set loading true

    setLoading(true);

    // define url

    const url = `https://api.npms.io/v2/search/suggestions?q=${queryString}`;
    getData(url)
    .then(handlErrors)
    .then((json) => {
      if(json && json.length > 0) {
        setSearchResults(json);
        setLoading(false);
      } else {
        alert('No packages found for this search criteria: ' + queryString);
      }
    }).catch(error => {
      alert(error);
      setLoading(false);
  });
    } else {
      alert('Please enter an NPM package name and click Search, thanks!');
    }
  }

  // lets handle those errors - cleaner error handling (that actually works)

  const handlErrors = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error('Unable to load search results: code ' + response.status + response.statusText);
    }
  }
  
    return (
      <div className="App" css={{ color: 'darkgray' }}>
       Fail API? <Checkbox
        indeterminate
        checked={throwMe}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'throw error checkbox' }}
      />
        <SearchField searchTerm={handleTextChange} handleSearch={handleSearch}></SearchField>
        <SearchResults searchResults={searchResults} loading={loading} ></SearchResults>
      </div>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
