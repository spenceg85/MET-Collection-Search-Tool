/* @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchField from './components/search';
import SearchResults from './components/results';

import './styles.css'
import getData from './utils/services';

const App = () => {
  const [queryString, setQueryString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // capture user input and map to state

  const handleTextChange = (e) => {
    setQueryString(e.target.value)
    }

  // make npm API call

  const handleSearch = () => {
    setLoading(true);
    const url = `https://api.npms.io/v2/search/suggestions?q=${queryString}`;
    getData(url).then((json) => {
      setSearchResults(json);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
    }
  
    return (
      <div className="App" css={{ color: 'darkgray' }}>
        <SearchField searchTerm={handleTextChange} handleSearch={handleSearch}></SearchField>
        <SearchResults searchResults={searchResults} loading={loading} ></SearchResults>
      </div>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
