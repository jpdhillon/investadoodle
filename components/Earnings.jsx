import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Earnings = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/calendar');
      setEarningsData(data.earningsCalendar);
    };

    fetchData();
  }, []);

  const displayedData = showAll ? earningsData : earningsData.slice(0, 20);

  return (
    <div className="earnings">
      <h1>Companies reporting earnings today:</h1>
      {earningsData.length === 0 ? (
        <h2>No companies reporting earnings today.</h2>
      ) : (
        <>
          <div className="earningsGrid">
            {displayedData.map(({ symbol }, index) => (
              <button
                key={index}
                className="earningsButton"
                onClick={() => {
                  router.push({
                    pathname: '/stock',
                    query: { symbol },
                  });
                }}
              >
                {symbol}
              </button>
            ))}
          </div>
          {earningsData.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Earnings;

