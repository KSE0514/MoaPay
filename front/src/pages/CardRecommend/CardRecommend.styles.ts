import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 30px 45px 113.5px 45px;
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

export const Loading = styled.div``;

export const Layout = styled.div``;

export const CardView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .cardimg {
    position: relative;
    width: 132px;
    height: 84px;
    & > div {
      height: 100%;
      width: 100%;
      border-radius: 10px;
      border: 3px dotted black;
    }
    & > img {
      position: absolute;
      z-index: 20;
    }
    .delete-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 30;
      color: white;
      background-color: #ccd1ff;
      border: none;
      border-radius: 50%;
      right: -10px;
      top: -5px;
    }
  }
  & > div:nth-child(2) {
    margin: 20px;
  }
`;

export const ComparisonView = styled.div`
  .comparison-view-header {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid black;
    margin-top: 23px;
    margin-bottom: 34px;
  }
`;
export const ComparisonList = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid black;
  .notify {
    padding-bottom: 34px;
  }
  header,
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    width: 100%;
  }
  header {
    font-size: 16px;
    border-top: 1px solid #a097ff;
    border-bottom: 1px solid #a097ff;
    background: rgba(197, 202, 255, 0.86);
  }
  .row {
    & > p {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .benefit {
    height: fit-content;
    align-items: stretch;
    .benefit-row {
      padding: 34px 5px 34px 12px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
    .benefit-category {
      width: 100%;
      text-align: start;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 3px;
    }
    .benefit-explanation {
      width: 100%;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  .line {
    height: 100%;
    width: 1px;
    background-color: #a097ff;
  }
`;

export const Toggle = styled.div`
  border: 3px solid #ddc1fc;
  border-radius: 24px;
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 34px;
  p {
    position: relative;
    z-index: 20;
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 10px 0px;
    border-radius: 24px;
  }
  div {
    transition: all 0.4s ease;
    border-radius: 24px;
    height: 36px;
    width: 50%;
    background-color: #ddc1fc;
    position: absolute;
    z-index: 10;
  }
`;
