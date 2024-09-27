import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import NewsBlock from './NewsBlock'; // Импорт компонента NewsBlock

// GraphQL запрос для получения статей
const GET_ARTICLES = gql`
  query Articles($skip: Int!, $take: Int!) {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1",
      lang: "ru",
      skip: $skip,
      take: $take
    ) {
      id
      title {
        short
        long
      }
      description {
        intro
      }
      dates {
        dateT: posted(lang: "ru", getDiff: true)
      }
      counters {
        comment
      }
      thumbnail
    }
  }
`;

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data, fetchMore } = useQuery(GET_ARTICLES, {
    variables: { skip, take: 10 },
  });

  // Когда новые данные загружаются, они добавляются в список статей
  useEffect(() => {
    if (data?.contents) {
      setArticles((prevArticles) => [...prevArticles, ...data.contents]);
    }
  }, [data]);

  // Функция для загрузки новых статей при прокрутке страницы
  const handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && !error) {
      setLoading(true);
      try {
        const { data: newData } = await fetchMore({
          variables: { skip: skip + 10 },
        });
        setArticles((prevArticles) => [...prevArticles, ...newData.contents]);
        setSkip(skip + 10);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Добавляем обработчик события прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, error]);

  if (loading) return <p>Загрузка новостей...</p>;
  if (error) return <p>Ошибка загрузки новостей: {error.message}</p>;

  return (
    <div>
      {articles.map((article) => (
        <NewsBlock key={article.id} {...article} />
      ))}
    </div>
  );
};

export default NewsList;
