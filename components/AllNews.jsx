import { useState, useEffect } from 'react';
import Head from 'next/head';
import { color } from '@mui/system';

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('/api/news');
      const data = await response.json();

      if (Array.isArray(data)) {
        setNews(data);
      } else {
        console.error('Received invalid data format from API');
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Market News:</h1>
      {news.map((article, index) => (
        <article key={index}>
          <img src={article.image ? article.image : "/logo.jpg"} alt={article.headline} width="125" height="125" />
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {`${article.source} - ${article.headline}`}
          </a>
          <p>{`${article.summary}`}</p>
        </article>
      ))}
    </div>
  );
};

export default AllNews;


