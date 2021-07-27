/* @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SearchField from './components/search';

import './styles.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTextChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value)
    e.preventDefault()
    }
  
    return (
      <div className="App" css={{ color: 'darkgray' }}>
        <SearchField searchTerm={handleTextChange}></SearchField>
      </div>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
