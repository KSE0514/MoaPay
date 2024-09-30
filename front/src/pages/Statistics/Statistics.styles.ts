import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/image/secondWave.png";
import MediaQuery from "../../constants/styles";
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  height: 100%;
  padding: 0px 20px var(--padding-bottom) 20px;
  ${MediaQuery.small},${MediaQuery.medium} {
    padding-bottom: var(--padding-bottom-small);
  }
  font-family: "Reem Kufi Ink";
`;

export const Top = styled.div`
  margin-top: 10px;
  height: 250.75px;
  * {
    position: relative;
    z-index: 10;
    color: white;
  }
`;

export const Bottom = styled.div`
  width: 100%;
  margin-top: 90px;
  /* height: calc(100vh - 550px); */
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 소비 + 혜택 디자인
export const Month = styled.div`
  z-index: 20;
  padding-top: 20px;
  padding-left: 15px;
  font-family: var(--day-font);
  @keyframes binggle {
    0% {
      transform: rotateZ(-180deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  @keyframes down {
    0% {
      max-height: 0px;
      padding: 0 20px 0 10px;
    }
    100% {
      max-height: 300px;
      padding: 10px 20px 15px 10px;
    }
  }
  @keyframes up {
    0% {
      max-height: 300px;
      padding: 10px 20px 15px 10px;
    }
    100% {
      max-height: 0px;
      padding: 0 20px 0 10px;
    }
  }
  .dropdown-btn {
    position: relative;
    font-size: 30px;
    display: flex;
    align-items: center;
    p {
      margin-right: 14px;
    }
  }
  .binggle {
    animation: binggle 0.8s linear;
  }
  .dropdown-menu {
    position: absolute;
    margin-top: 10px;
    width: fit-content;
    border-radius: 5px;
    background-color: white;
    font-size: 30px;
    max-height: 0;
    overflow: hidden;
    li {
      color: #a26eef;
      width: fit-content;
      margin-bottom: 7px;
      border-bottom: 1.5px solid #a26eef;
    }
    li:last-child {
      margin-bottom: 0px;
    }
  }

  .dropdown-menu.open {
    animation: down 1s forwards;
  }
  .dropdown-menu.close {
    animation: up 1s forwards;
  }
  .month {
    display: flex;
    font-size: 25px;
    p {
      margin: 0px 15px;
    }
  }
`;
export const DropDownIcon = styled(FontAwesomeIcon)`
  width: 20px;
`;

export const Info = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

// 통계
export const TopWrapper = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  animation: fadeIn 2s;
`;
export const NowDate = styled.div`
  font-size: 25px;
`;
export const ImageBox = styled.div`
  margin: 25px 0px 11px 0px;
  img {
    width: 200px;
    height: 100px;
  }
`;
export const TextBox = styled.div`
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;
