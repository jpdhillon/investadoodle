import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const StockNews = ({ symbol }) => {
  const [articles, setArticles] = useState([]);
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

const recentNewsWithAllowedImages = articles.filter((article) => {
  return article.image && allowedDomains.some((domain) => article.image.includes(domain));
}).slice(0, 4);

  const toggleShowAllArticles = () => {
    setShowAllArticles((prevState) => !prevState);
  };

  const displayedArticles = showAllArticles ? articles : recentNewsWithAllowedImages;

  useEffect(() => {
    const currentDate = new Date();
    const to = currentDate.toISOString().slice(0, 10);
    currentDate.setDate(currentDate.getDate() - 90);
    const from = currentDate.toISOString().slice(0, 10);

    fetch(`/api/symbolNews?symbol=${symbol}&from=${from}&to=${to}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 20) {
          setArticles(data.slice(0, 20));
        } else {
          setArticles(data);
        }
      })
      .catch(error => console.error(error));
  }, [symbol]);

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
      {articles.length > 4 && (
        <button onClick={toggleShowAllArticles}>
          {showAllArticles ? 'Show Less' : 'Show More'}
        </button>
      )} 
    </div>
  );
};

export default StockNews;



