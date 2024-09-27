import styled from "styled-components";

export const NewsWrapper = styled.div`
  display: flex;
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
  img {
    width: 160px;
    height: 84px;
    border-radius: 3px;
  }
`;

export const NewsTitle = styled.h1`
  font-weight: bold;
  font-size: 17px;
  color: rgb(51, 121, 191);
  margin: 0;
`;

export const NewsDescription = styled.div`
  font-size: 15px;
  margin: 4px 0;
`;

export const WrapperRightContent = styled.div`
  line-height: 0.8;
  height: 100%;
  margin-left: 16px;
  display: flex;
  max-width: 100%;
  flex-direction: column;
`;

export const NewsFooter = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 17px;
    width: 17px;
    margin-left: 6px;
  }
`;

export const TimeBlock = styled.span`
  font-size: 14px;
`;

export const CommentBlock = styled.span`
  font-size: 14px;
  margin-left: 2px;
`;
