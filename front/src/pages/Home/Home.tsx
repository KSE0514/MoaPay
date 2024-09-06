import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Bottom,
  BarcordArea,
  Barcord,
  Time,
  ButtonArea,
} from "./Home.styles";
const Home = () => {
  return (
    <>
      <Top>
        <BarcordArea>
          <Barcord></Barcord>
          <Time>
            <div>2:04</div>
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </Time>
        </BarcordArea>
        <ButtonArea>
          <button>QR 인식하기</button>
          <button>결제코드 입력하기</button>
        </ButtonArea>
      </Top>
      <Bottom></Bottom>
    </>
  );
};
export default Home;
