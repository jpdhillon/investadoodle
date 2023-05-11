import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

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
    <div className="news-container">
      <Head>
        <title>{symbol} Stock News</title>
      </Head>
      <h1>{symbol} Stock News</h1>
      {articles.map(article => (
        <article key={article.id}>
          {/* <img src={article.image ? article.image : "/logo.jpg"} alt={article.headline} width="125" height="125"/> */}
          <Image
            src={article.image ? article.image : "/logo.jpg"}
            alt={article.headline}
            width={125}
            height={125}
          />
          <a href={article.url}>{article.source} - {article.headline}</a>
          <p>{`${article.summary}`}</p>
        </article>
      ))}
    </div>
  );
};

export default StockNews;



