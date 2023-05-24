import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Search = ({ onError }) => {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (input.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`/api/symbol?input=${input}`);
        if (!res.ok) {
          throw new Error('Rate limit exceeded or other error');
        }
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching all stock data:', error);
        onError(); 
      }
    };
    fetchSearchResults();
  }, [input]);

  const handleSelect = (symbol) => {
    router.push(`/stock?symbol=${symbol}`);
  };

  return (
    <div className='search'>
      <h1>Search for the latest stock information and news!</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a stock symbol..."
        className='searchInput'
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div
              key={result['1. symbol']}
              onClick={() => handleSelect(result['1. symbol'])}
              className='clickIt'
            >
              {result['1. symbol']} - {result['2. name']}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;





