import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const BackImg = styled.div`
  position: absolute;
  z-index: -1;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding: 7% 0px;
`;

export const Month = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > div {
    font-size: 33px;
    font-weight: 700;
  }

  & > button {
    background-color: rgba(255, 255, 255, 0.62);
    border: 0;
    border-radius: 100%;
    width: 30px;
    height: 30px;
  }
`;

export const DateTag = styled.div`
  display: flex;
  gap: 10px;
`;

export const CardInfo = styled.div`
  display: flex;
  // gap: 30px;
  width: 100%;
  padding-left: 9%;
  padding-right: 5%;
  align-items: center;
  // justify-content: center;

  & > img {
    width: 30%;
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  }

  & > div {
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 16px;
    text-shadow: -1px 0 rgba(255, 255, 255, 0.5), 0 1px rgba(255, 255, 255, 0.5),
      1px 0 rgba(255, 255, 255, 0.5), 0 -1px rgba(255, 255, 255, 0.5);
  }

  & > div > div:nth-of-type(1) {
    font-weight: 700;
    font-size: 19px;
    padding-bottom: 10px;
    text-shadow: -1px 0 rgba(255, 255, 255, 0.7), 0 1px rgba(255, 255, 255, 0.7),
      1px 0 rgba(255, 255, 255, 0.7), 0 -1px rgba(255, 255, 255, 0.7);
  }
`;

export const Main = styled.div`
  height: 70%;
  padding: 7% 8%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #dbc5e9;
  border-radius: 20px;
  margin: 0px 25px;
`;

export const MainNoBorder = styled.div`
  height: 80%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #dbc5e9;
  margin: 0px 15px;
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 0;
`;

export const DateInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-around;
  padding: 20px 10px;
  align-items: center;
  font-size: 17px;

  & > input {
    width: 100px;
    height: 40px;
    text-align: center;
    border: 2px solid gray;
    border-radius: 10px;
    font-size: 17px;
  }
`;
