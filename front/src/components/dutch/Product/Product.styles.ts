import styled from "styled-components";

export const ProductCard = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  // display: flex;

  & > div:nth-of-type(1){
    height: 80px;
    width: 80px;
    border-radius: 8px;
    background-color: gray;
  }
`

export const ProductInfo = styled.div`
`