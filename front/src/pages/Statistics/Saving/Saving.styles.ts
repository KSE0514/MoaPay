import styled from "styled-components";

export const PreView = styled.div`
  z-index: 1000;
  width: 100%;
  height: 100%;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  /* background: linear-gradient(120deg, #f1e5ff 1%, #d1acf9 40%, #ffc6ff); */

  top: 0;
  header {
    padding: 40px 20px;
    div {
      width: 20px;
      height: 20px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .sub {
    width: 85%;
    border-radius: 30px;
    position: relative;
    /* background: linear-gradient(120deg, #f1e5ff 1%, #d1acf9 40%, #ffc6ff); */
    background-color: #f2f2f294;
    p {
      font-size: 17px;
      font-weight: 600;
      line-height: 20px;
    }
    .name {
      line-height: 17px;
      margin-bottom: 10px;
      font-weight: 300;
    }
  }
  .bottom {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 10%;
    button {
      width: 85%;
      padding: 17px 0px;
      border: none;
      border-radius: 20px;
      background-color: #a0b6f7;
      /* background: linear-gradient(120deg, #ead8ff 0.3%, #d1acf9 50%, #ffc6ff); */
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;
export const FirstStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  .title {
    padding-top: 5%;
    width: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    font-weight: 800;
  }
  .sub {
    margin-top: 200px;
    /* margin-top: 30px; */
    box-shadow: -1px 10px 15px rgba(0, 0, 0, 0.1);
    padding: 30px 20px;

    img {
      position: absolute;
      /* top: 200%;
      left: 73%; */
      top: -55%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      /* filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.1)); */
    }
  }
`;
export const SecondStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  .sub {
    width: 90%;
    margin-top: 50px;
    position: relative;
    padding: 30px 20px 20px 20px;
    border-radius: 20px;
    img {
      position: absolute;
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      top: -20%;
      left: 40px;
      transform: translate(-50%, -50%);
    }
  }
  .setting-price {
    width: 90%;
    padding: 0px 10px;
    margin-top: 20px;
    p {
      margin-bottom: 7px;
    }
    div {
      display: flex;
      align-items: center;
      width: 100%;
      display: flex;
      /* padding-bottom: 15px; */
      border-bottom: 1px solid #a0b6f7;
      input {
        border: none;
        flex: 1;
        height: 50px;
        font-size: 20px;
      }
      input:focus {
        outline: none;
      }
      span {
      }
    }
  }
  .bottom {
    button {
      width: 90%;
    }
  }
`;
export const LastStep = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding-top: 50%;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
  }
`;

//////////////////////////////////////////////////////////////////

export const Wrapper = styled.div``;
