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

export const Card = styled.div`

  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  font-size: 18px;

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    height: 90px;
  }

  & > div > div{
    width: 100%;
    // overflow: hidden;
    padding-left: 110px;
  }

  & > svg{
    margin-left: 15px;
  }
`

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