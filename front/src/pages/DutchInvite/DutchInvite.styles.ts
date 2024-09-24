import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  background-color: #B6BCFF;
  position: relative;

`

export const Top = styled.div`
height: 211px;
& > div {
    padding: 30px;
    padding-top: 35px;
    position: absolute;
    z-index: 1;

  }
  & > div * {
  
  }

  & > img{
    position: absolute;
    z-index: 0;
  }
`

export const Main = styled.div`
  height: 100%;
  padding: 40% 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 190%;
  font-weight: 700;
  color: white;
  gap: 35px;
  align-items: center;

  & > div:nth-of-type(4){
    padding-top: 13%;
    display: flex;
    gap: 40px;
  } 
  & > div > button {
    border: 2px solid black;
    border-radius:50px;
    padding: 7px 10px;
    width: 100px;
    font-size: 20px;
    font-weight: 700;
  }
  & > div> button:nth-of-type(1){
    background-color: #625F68;
    color: white;
  }
  & > div> button:nth-of-type(2){
    background-color: white;
    color: #625F68;
  }
`