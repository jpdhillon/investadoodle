import { useState, useEffect } from 'react';
import Head from 'next/head';
import { color } from '@mui/system';
import Image from 'next/image';

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [showAllArticles, setShowAllArticles] = useState(false);

  const allowedDomains = [
  'images.mktw.net',
  'image.cnbcfm.com',
  'media.zenfs.com',
  'static.seekingalpha.com',
  's.wsj.net',
  's.yimg.com',
  'images.barrons.com',
  'mw3.wsj.net',
  'static.reuters.com',
  'media.gettyimages.com',
  'pennystocks.com',
];

const recentNewsWithAllowedImages = news.filter((article) => {
  return article.image && allowedDomains.some((domain) => article.image.includes(domain));
}).slice(0, 4);

  const toggleShowAllArticles = () => {
    setShowAllArticles((prevState) => !prevState);
  };

  const displayedArticles = showAllArticles ? news : recentNewsWithAllowedImages;

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
      <div className="grid-container">
        {recentNewsWithAllowedImages.map((article, index) => (
          <div key={index} className="card">
            <div style={{ position: 'relative', height: '15rem' }}>
              <Image
                src={article.image ? article.image : '/logo.jpg'}
                alt={article.headline}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="container">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {`${article.source} - ${article.headline}`}
              </a>
              <p>{`${article.summary}`}</p>
            </div>
          </div>
        ))}
      </div>
      {showAllArticles && (
        <div className="articles-container">
          {displayedArticles.map((article, index) => (
            <article key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {`${article.source} - ${article.headline}`}
              </a>
            </article>
          ))}
        </div>
      )}
      {news.length > 4 && (
        <button onClick={toggleShowAllArticles}>
          {showAllArticles ? 'Show Less' : 'Show More'}
        </button>
      )} 
    </div>
  );
};

export default AllNews;






