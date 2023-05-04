import React, { useEffect, useState } from 'react';
import Head from 'next/head';

function StockStats({ symbol, onError }) {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/allStockData?symbol=${symbol}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching all stock data:', error);
        onError(); // Call onError prop function
      }
    }
    fetchData();
  }, [symbol]);

  const {
    currentPrice,
    openPrice,
    highPrice,
    lowPrice,
    previousClose,
    percentChange,
    averageVolume10D,
    high52Week,
    high52WeekDate,
    low52Week,
    low52WeekDate,
    beta,
    epsTTM,
    marketCapitalization,
  } = data;

  return (
    <div className="stats-container">
      <h1>{symbol} Stock Data</h1>
      <div style={{ columns: 2 }}>
        <p>Current Price: {currentPrice}</p>
        <p>Open Price: {openPrice}</p>
        <p>High Price: {highPrice}</p>
        <p>Low Price: {lowPrice}</p>
        <p>Previous Close: {previousClose}</p>
        <p>Percent Change: {percentChange}</p>
        <p>Average Volume(10Day): {averageVolume10D}</p>
        <p>52 Week High: {high52Week}</p>
        <p>52 Week High Date: {high52WeekDate}</p>
        <p>52 Week Low: {low52Week}</p>
        <p>52 Week Low Date: {low52WeekDate}</p>
        <p>Beta: {beta}</p>
        <p>EPS (TTM): {epsTTM}</p>
        <p>Market Capitalization: {marketCapitalization}</p>
      </div>
    </div>
  );
}

export default StockStats;
