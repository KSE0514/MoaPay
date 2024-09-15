import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 10px;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  font-size: 22px;
  .Col:first-child {
    & > div {
      width: 70px;
      height: 70px;
      background-color: pink;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .Col:last-child {
    padding-left: 19px;
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    color: gray;
    p:first-child {
      margin-top: 5px;
      font-size: 20px;
    }
    p:last-child {
      font-weight: 600;
      font-size: 25px;
      margin-top: 5px;
    }
  }
`;
