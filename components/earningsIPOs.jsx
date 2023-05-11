import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/EarningsIPOs.module.css';

const EarningsIPOs = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [ipoData, setIpoData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/calendar');
      setEarningsData(data.earningsCalendar);
      setIpoData(data.ipoCalendar);
    };

    fetchData();
  }, []);

  const displayedData = showAll ? earningsData : earningsData.slice(0, 20);

  return (
    <div className={styles.earnings}>
      <h1>Stocks reporting earnings today:</h1>
      {earningsData.length === 0 ? (
        <h2>No stocks reporting earnings today.</h2>
      ) : (
        <>
          <div className={styles.earningsGrid}>
            {displayedData.map(({ symbol }, index) => (
              <button
                key={index}
                className={styles.earningsButton}
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
              className={styles.showMoreButton}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )}
      <h1>New IPOs today:</h1>
      {ipoData.length === 0 ? (
        <h2>No new IPOs today.</h2>
      ) : (
        ipoData.map(({ name, symbol, exchange, price }, index) => (
          <div key={index} className={styles.ipoCard}>
            <p>Name: {name}</p>
            <p>Stock Symbol: {symbol}</p>
            <p>Exchange: {exchange}</p>
            <p>IPO Price: {price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EarningsIPOs;

