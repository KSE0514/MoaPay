import { styled } from "styled-components";
import "../../assets/image/secondWave.png";
export const Wrapper = styled.div`
  width: 100%;
`;
export const Layout = styled.div`
  position: relative;
  width: 100%;
  .first-wave {
    position: absolute;
    background-color: rgba(86, 59, 237, 0.43);
    z-index: 2;
    border-radius: 50%;
    height: 500px;
    width: 1000px;
    top: -244px;
    left: -500px;
  }
`;
export const WaveDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  .second-wave {
    position: absolute;
    top: -20px;
    z-index: 1;
    background: url("/src/assets/image/secondWave.png") repeat-x;
    width: 3200px;
    height: 508px;
    animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    /* transform: translate3d(0, 0, 0); */
  }
  .last-wave {
    position: absolute;
    background: url("/src/assets/image/lastWave.png") repeat-x;
    z-index: 0;
    width: 3200px;
    height: 508px;
    animation: wave 5s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -3000px;
    }
  }

  @keyframes swell {
    0%,
    100% {
      transform: translate3d(0, -25px, 0);
    }
    50% {
      transform: translate3d(0, 5px, 0);
    }
  }
`;
