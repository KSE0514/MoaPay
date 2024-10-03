import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: linear-gradient(120deg, #f1e5ff 5%, #dcbefc 50%, #ffc6ff);
  padding: 20% 10% 100px 10%;
  & > p {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 30px;
  }
  & > p > span {
    font-weight: bold;
  }
`;

export const SelectView = styled.div`
  justify-items: end;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    height: 50%;
    padding: 10px 30px;
    font-size: 18px;
    border: none;
    font-weight: bold;
    background-color: white;
    border-radius: 20px;
  }
  div {
  }
`;

export const EndButton = styled.div`
  margin-top: 30px;
  background-color: #ab2dff;
  width: 100%;
  padding: 20px 0px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 20px;
`;
