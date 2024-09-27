import React, { useCallback, useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import NewsBlock from "../../components/news_blok/news_blok";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";

const GET_NEWS = gql`
  query Contents($skip: Int!, $take: Int!) {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      skip: $skip
      take: $take
      lang: "ru"
    ) {
      id
      title {
        short
      }
      description {
        intro
      }
      thumbnail
      dates {
        dateT: posted(lang: "ru", getDiff: true)
      }
      counters {
        comment
      }
    }
  }
`;

const NewsContainer = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 825px;
  margin: 0 auto;
  height: max-content;
  background-color: rgb(255, 255, 255);
`;

const NewsItem = styled.div`
  padding: 0px;
`;

const HomePage = () => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [dataList, setDataList] = useState([]);

  const { data, fetchMore, loading, error } = useQuery(GET_NEWS, {
    variables: { skip, take },
    fetchPolicy: "network-only",
    onCompleted: (newData) => {
      if (newData.contents.length === 0) {
        setHasMore(false);
      }
      setDataList(prevData => [...prevData, ...newData.contents]);
    }
  });

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;
    fetchMore({
      variables: {
        skip: skip + take,
        take
      }
    }).then(() => {
      setSkip(prevSkip => prevSkip + take);
    });
  }, [loading, hasMore, fetchMore, skip, take]);

  const loadMorePreviousData = useCallback(() => {
    if (loading || !hasMore) return;
    fetchMore({
      variables: {
        skip: Math.max(skip - take, 0),
        take
      }
    }).then(() => {
      setSkip(prevSkip => Math.max(prevSkip - take, 0));
    });
  }, [loading, hasMore, fetchMore, skip, take]);

  return (
    <NewsContainer>
      {error && <p>Error: {error.message}</p>}
      <List
        height={window.innerHeight}
        itemCount={dataList.length}
        itemSize={100} // Размер элемента
        width="100%"
        onScroll={({ scrollOffset }) => {
          if (scrollOffset === 0 && hasMore) {
            loadMorePreviousData(); // Загрузка старых данных при прокрутке вверх
          } else if (scrollOffset + window.innerHeight >= document.body.scrollHeight) {
            loadMoreData(); // Загрузка новых данных при прокрутке вниз
          }
        }}
      >
        {({ index, style }) => (
          <NewsItem style={style} key={dataList[index].id}>
            <NewsBlock
              img={dataList[index].thumbnail}
              title={dataList[index].title.short}
              description={dataList[index].description.intro}
              dates={dataList[index].dates.dateT}
              counters={dataList[index].counters.comment}
              id={dataList[index].id}
            />
          </NewsItem>
        )}
      </List>
    </NewsContainer>
  );
};

export default HomePage;
