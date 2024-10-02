import styled from "styled-components";

//보라색 바탕 부분
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dcbefc;
  padding: 100px 10% 130px 10%;
`;
// 흰색 바탕 부분
export const CheckoutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 15px;
  padding: 80px 30px 0px 30px;
`;

// 카드 부분
export const CreditCardBox = styled.div`
  width: 80%;
  height: 100px;
  background-color: var(--light-purple);
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Flip = styled.div`
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
`;

//카드 앞면
export const CardFront = styled.div`
  z-index: 2;
  transform: rotateY(0deg);
`;

//카드 뒷면
export const CardBack = styled.div`
  transform: rotateY(180deg);
`;

export const CardLogo = styled.div`
  position: absolute;
  top: 9px;
  right: 20px;
  width: 60px;
  svg {
    width: 100%;
    height: auto;
    fill: #fff;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  color: hsl(0, 0, 20);
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  outline: none !important;
  border: 1px solid black;
`;

export const CardForm = styled.form`
  .card-number-view {
    display: flex;
    gap: 10px;
  }
  .label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  & > div {
    margin-bottom: 15px;
  }
  .second-input-box {
    display: flex;
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > div:nth-child(1) {
      flex: 1;
      width: 100%;
      div {
        display: flex;
        gap: 5px;
      }
      div select {
        width: 35%;
        height: 38px;
        border-radius: 5px;
        border: 1px solid black;
      }
    }
    & > div:nth-child(2) {
      width: 30%;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  font-size: 18px;
  padding: 15px 0px;
  border-radius: 10px;
  background-color: var(--light-purple);
  color: white;
  font-weight: bold;
  border: none;
  outline: none !important;
`;
