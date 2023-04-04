import { useState, useEffect } from 'react';
import Head from 'next/head';

const StockNews = ({ symbol }) => {
  const [articles, setArticles] = useState([]);

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
    <div>
      <Head>
        <title>{symbol} Stock News</title>
      </Head>
      <h1>{symbol} Stock News</h1>
      {articles.map(article => (
        <article key={article.id}>
          <img src={article.image ? article.image : "/logo.jpg"} alt={article.headline} width="50" height="50"/>
          <a href={article.url}>{article.source} - {article.headline}</a>
        </article>
      ))}
    </div>
  );
};

export default StockNews;



