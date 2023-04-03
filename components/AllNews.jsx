import { useState, useEffect } from 'react';

const AllNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch('https://finnhub.io/api/v1/news?category=general&token=cfkkko1r01qokcgl3of0cfkkko1r01qokcgl3ofg');
      const data = await response.json();
      setNews(data.slice(0, 10)); // take only the first 10 news articles
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Market News:</h1>
      {news.map((article, index) => (
        <article key={index}>
          <img src={article.image} alt={article.headline} width="50" height="50" />
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {`${article.source} - ${article.headline}`}
          </a>
        </article>
      ))}
    </div>
  );
};

export default AllNews;
