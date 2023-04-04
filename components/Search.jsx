import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

function Search() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/symbol?inputValue=${inputValue}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  const filteredResults = data.result.filter(result => result.type === "Common Stock" && 
    !result.displaySymbol.includes("."));
  setSearchResults(filteredResults);
};

  useEffect(() => {
    console.log(searchResults);
    setInputValue('');
  }, [searchResults]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className="searchContainer">
        <h1>Enter a stock ticker symbol:</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="ie AAPL or AMZN" value={inputValue} onChange={handleInputChange} />
          <IconButton type="submit" color="success" aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </div>
      <div>
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results:</h2>
            {searchResults.map(result => (
              <a key={result.symbol} onClick={() => {
  router.push(`/stock?symbol=${result.symbol}&newsSymbol=${result.symbol}`);
}}>
  {result.displaySymbol}
</a>

              
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default Search;



