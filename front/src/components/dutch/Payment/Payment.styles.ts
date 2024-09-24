import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  position: relative;
`


export const Price = styled.div`
  color: white;
  text-align: center;
  padding: 20px 0 5px 0;
  font-size: 18px;
  font-weight: 700;
`

export const Card = styled.div`
  & > div:nth-of-type(2) {
    color: #383444;
    text-decoration: underline;
    text-align: center;
  }
`

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 30px 10px;
  gap: 15px;
  text-shadow: -1px 0 rgba(255, 255, 255, 0.8), 0 1px rgba(255, 255, 255, 0.8), 1px 0 rgba(255, 255, 255, 0.8), 0 -1px rgba(255, 255, 255, 0.8);
`

export const Bottom = styled.div`
  position: absolute;
  // bottom: 150px;
`

export const Btn = styled.button`
  background-color: white;
  // width: 95%;
  height: 7%;
  font-size: 19px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`