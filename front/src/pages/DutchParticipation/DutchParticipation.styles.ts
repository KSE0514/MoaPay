import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 13% 0;

`

export const Title = styled.div`
  display:flex;
  align-items:center;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`

export const Process = styled.div`
`

export const Main = styled.div`
  position: relative;
  width: 85%;
  height: 100%;
  border: 3px solid black;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: rgba(255, 255, 255, 0.65);
  margin: 0 auto;
  padding: 20px 25px;
  z-index: 1;
`


export const BackImg = styled.div`
  // display: flex;
  z-index: -1;
  & > img {
    position: absolute;
  }

  & > img:nth-of-type(1) {
    bottom: -15px;
    left: -50%;
  }
  & > img:nth-of-type(2) {
    bottom: -17px;
    // left: -50%;
  }
  & > img:nth-of-type(3) {
    bottom: -15px;
    right: -50%;
  }
`