import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (input.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      const res = await fetch(`/api/symbol?input=${input}`);
      const data = await res.json();
      setSearchResults(data);
    };

    fetchSearchResults();
  }, [input]);

  const handleSelect = (symbol) => {
    router.push(`/stock?symbol=${symbol}`);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a stock symbol..."
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




