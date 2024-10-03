import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: auto;
  position: relative;
`

export const Top = styled.div`
  text-align: center;
  font-size: 29px;
  font-weight: 700;
  padding: 40px 0;
`

export const Main = styled.div`
  & > div {
    position: relative;
  }
`

export const EditMode = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 10px;

  & > div:nth-of-type(2){
   color: #8748F3;
  text-decoration-line: underline;
  text-decoration-color: #8748F3;
  }
`

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  font-size: 18px;
  position: relative; // 카드 내 이미지와 텍스트의 위치 제어를 위해 relative 추가

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    height: 90px;
    overflow: visible; // 요소가 잘리지 않도록 overflow를 visible로 설정
    user-select: none; // 드래그 방지
  }

  & > div > div {
    width: 100%;
    padding-left: 110px;
    overflow: visible; // 이미지와 텍스트가 카드 경계를 넘을 때 표시되도록 설정
    user-select: none; // 텍스트 드래그 방지
  }

  & > svg {
    margin-left: 15px;
    z-index: 1; // svg가 다른 요소에 가려지지 않게 z-index를 추가
  }

  & > input[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 100%;
    outline: none;
    cursor: pointer;
  }

  & > input[type='radio']:checked {
    background-color: #547cff;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #c7c7c7;
  }
`;


export const CardBackground = styled.div`
  background-color: #D6D9FF;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
  font-size: 20px;
  text-align: right;
  color: white;
  padding: 45px 30px;

`

export const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  z-index: 1000;
  left: 50%; /* 부모 요소의 너비 기준으로 50% 왼쪽으로 이동 */
  transform: translateX(-50%); /* 자기 자신의 너비의 절반만큼 왼쪽으로 이동해서 정확히 중앙 배치 */
  align-items: center;
  color: white;
  background-color: #547CFF;
  width: 70%;
  height: 60px;
  font-size: 22px;
  border: 2px solid black;
  border-radius: 10px;
`

// export const Bottom = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 15%;
//   bottom: 0;
// `

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  touch-action: none; /* 모바일 드래그 이벤트에 필요한 touch-action 비활성화 */
`;
