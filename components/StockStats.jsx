import React, { useEffect, useState } from 'react';
import Head from 'next/head';

function StockStats({ symbol }) {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [quoteData, setQuoteData] = useState({});
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/realTime?symbol=${symbol}`);
      const data = await res.json();
      setCurrentPrice(data.price);
    }
    fetchData();
  }, [symbol]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/quote?symbol=${symbol}`);
      const data = await res.json();
      setQuoteData(data);
    }
    fetchData();
  }, [symbol]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/overview?symbol=${symbol}`);
      const data = await res.json();
      setOverviewData(data);
    }
    fetchData();
  }, [symbol]);

  const {
    open,
    high,
    low,
    close,
    volume,
    average_volume,
    previous_close,
    percent_change,
  } = quoteData;

  const {
    Symbol,
    MarketCapitalization,
    PERatio,
    EPS,
    Beta,
    DividendDate,
    ExDividendDate,
  } = overviewData;

  return (
    <div>
      <h1>{Symbol} Stock Data</h1>
      <div style={{columns: 2}}>
        <p>Current Price: {currentPrice}</p>
        <p>Open: {open}</p>
        <p>High: {high}</p>
        <p>Low: {low}</p>
        <p>Close: {close}</p>
        <p>Volume: {volume}</p>
        <p>Average Volume: {average_volume}</p>
        <p>Previous Close: {previous_close}</p>
        <p>Percent Change: {percent_change}</p>
        <p>Market Capitalization: {MarketCapitalization}</p>
        <p>P/E Ratio: {PERatio}</p>
        <p>Earnings Per Share (EPS): {EPS}</p>
        <p>Beta: {Beta}</p>
        <p>Dividend Date: {DividendDate}</p>
        <p>Ex-Dividend Date: {ExDividendDate}</p>
      </div>
    </div>
  );
}

export default StockStats;
