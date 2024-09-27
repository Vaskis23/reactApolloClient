import React from "react";
import { Link } from "react-router-dom";
import {
  NewsWrapper,
  NewsTitle,
  NewsDescription,
  WrapperRightContent,
  NewsFooter,
  TimeBlock,
  CommentBlock
} from "./news_blok.style";

// Компонент отображает отдельный блок новости
const NewsBlock = ({ img, title, description, dates, counters, id }) => {
  return (
    <NewsWrapper>
      <img src={`https://i.simpalsmedia.com/point.md/news/370x194/${img}`} alt="" />
      <WrapperRightContent>
        <Link to={`/${id}`}>
          <NewsTitle>{title}</NewsTitle>
        </Link>
        <NewsDescription>{description}</NewsDescription>
        <NewsFooter>
          <TimeBlock>{dates}</TimeBlock>
          <img
            src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png"
            alt=""
          />
          <CommentBlock>{counters}</CommentBlock>
        </NewsFooter>
      </WrapperRightContent>
    </NewsWrapper>
  );
};

export default NewsBlock;
