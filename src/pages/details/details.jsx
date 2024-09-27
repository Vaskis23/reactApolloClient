import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ContainerArticle = styled.div`
  max-width: 825px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: max-content;
  background-color: rgb(255, 255, 255);
  text-align: left;
  padding: 24px;
  border-radius: 5px;
  overflow-wrap: break-word;
  overflow-x: hidden;
`;

const ArticleTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ArticleSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ArticleText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify; /* Выравнивание текста по ширине */
  margin-bottom: 20px;
`;

const ArticleDate = styled.p`
  font-size: 0.8rem;
  color: #888;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const GET_NEWS_DETAILS = gql`
  query Content($id: String!) {
    content(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1",
      id: $id
    ) {
      title {
        long
      }
      description {
        intro
        long  
      }
      thumbnail
      dates {
        postedDMYH: posted(format: "2 $$January$$ 2006, 15:04", lang: "ru")
      }
      counters {
        comment
        view
        like
      }
    }
  }
`;

const NewsDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_NEWS_DETAILS, {
    variables: { id }
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const { title, description, thumbnail, dates } = data?.content;

  return (
    <ContainerArticle>
      <ArticleDate>{dates?.postedDMYH}</ArticleDate>
      <ArticleTitle>{title?.short}</ArticleTitle>
      {title?.long && <ArticleSubtitle>{title.long}</ArticleSubtitle>}
      <ArticleText>{description?.intro}</ArticleText>
      {thumbnail && <ArticleImage src={`https://i.simpalsmedia.com/point.md/news/370x194/${thumbnail}`} alt="Новостное изображение" />}
      {description?.long && <ArticleText>{description.long}</ArticleText>}
    </ContainerArticle>
  );
};

export default NewsDetailsPage;
