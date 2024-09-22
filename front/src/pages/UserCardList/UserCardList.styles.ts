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

  & >input[type='radio'] {
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거 
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  width: 18px;
  height: 18px;
  border: 2px solid #ccc; // 체크되지 않았을 때의 테두리 색상
  border-radius: 100%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거
  cursor: pointer;
}

// 체크될 시에, 변화되는 스타일 설정
& > input[type='radio']:checked {
  background-color: #547CFF; // 체크 시 내부 원으로 표시될 색상
  border: 2px solid white; // 테두리가 아닌, 테두리와 원 사이의 색상
  box-shadow: 0 0 0 2px #C7C7C7; // 얘가 테두리가 됨
  // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
  // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
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