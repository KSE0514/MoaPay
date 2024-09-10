import styled from "styled-components";
export const Layout = styled.div`
  position: relative;
  width: 100%;
  .first-wave {
    position: absolute;
    background-color: #a26eef;
    border: none;
    z-index: 2;
    border-radius: 50%;
    height: 500px;
    width: 1000px;
    top: -244px;
    left: -500px;
  }
`;
export const WaveDiv = styled.div`
  width: 100%;
  & > div {
    position: absolute;
    width: 20000px;
    height: 400px;
    transform: translate3d(0, 0, 0);
  }
  .second-wave {
    z-index: 1;
    background: url("/src/assets/image/secondWave.png") repeat-x;
    animation: first-wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }
  .last-wave {
    background: url("/src/assets/image/lastWave.png") repeat-x;
    z-index: 0;
    animation: second-wave 30s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }

  @keyframes first-wave {
    0% {
      margin-left: -10px;
    }
    100% {
      margin-left: -1600px;
    }
  }
  @keyframes second-wave {
    0% {
      margin-left: -10px;
    }
    100% {
      margin-left: -2733px;
    }
  }
`;
