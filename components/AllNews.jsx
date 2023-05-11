import { useState, useEffect } from 'react';
import Head from 'next/head';
import { color } from '@mui/system';
import Image from 'next/image';

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

  const recentNewsWithImages = news.filter((article) => article.image).slice(0, 2);

  return (
    <div className="news-container">
      <h1>Market News:</h1>
      {news.map((article, index) => {
        if (recentNewsWithImages.includes(article)) {
          return (
            <div key={index} className="card">
              <div style={{ position: 'relative', height: '15rem' }}>
                <Image
                src={article.image ? article.image : '/logo.jpg'}
                alt={article.headline}
                fill
                style={{objectFit:"contain"}}
                />
              </div>
              <div class="container">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                {`${article.source} - ${article.headline}`}
                </a>
                <p>{`${article.summary}`}</p>
              </div>
            </div>
          );
        } else {
          return (
            <article key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {`${article.source} - ${article.headline}`}
              </a>
            </article>
          );
        }
      })}
    </div>
  );
};

export default AllNews;



