import styled from "styled-components";

export const Wrapper = styled.div``;
export const MessageAuthenticationForm = styled.div`
  padding: 30% 40px 30% 40px;
`;
export const Header = styled.div`
  font-size: 28px;
  line-height: 35px;
  margin-bottom: 30px;
`;
export const BoldText = styled.span`
  font-weight: bold;
`;
export const Form = styled.div`
  width: 100%;
  .form-row {
    width: 100%;
    height: 60px;
    margin-bottom: 18px;
    input,
    select {
      font-size: 15px;
      padding-left: 15px;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 2px solid rgb(217, 217, 217);
    }
  }
  //생년월일 파트
  .form-row:nth-child(2) {
    display: flex;
    //주민번호 앞자리와 뒷자리 파트가 40% 60%의 크기를 각자 가져감
    & > *:nth-child(1) {
      width: 40%;
    }
    & > *:nth-child(2) {
      width: 60%;
    }
    //주민번호 뒷자리 파트
    & > div:nth-child(2) {
      display: flex;
      input {
        width: 35px;
        padding-left: 3px;
        text-align: center;
      }
      .masking-part {
        display: flex;
        align-items: center;
        & > div {
          border-radius: 50%;
          height: 17px;
          width: 17px;
          margin-left: 5px;
          background-color: rgb(217, 217, 217);
        }
      }
      .line {
        background-color: rgb(217, 217, 217);
        width: 15px;
        height: 2px;
        margin: 0px 10px;
        align-self: center;
      }
    }
  }
  //인증번호 파트
  .form-row:nth-child(5) {
    display: flex;
    & > button {
      border-radius: 10px;
      border: none;
      width: 50%;
      margin-left: 10px;
      font-weight: 800;
      color: white;
      background-color: #c473f6;
    }
  }
  //확인버튼
  .ready-btn,
  .join-btn {
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: gray;
  }
  .join-btn {
    background-color: #c473f6;
    color: white;
  }
`;
