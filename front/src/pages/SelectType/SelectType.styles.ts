import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--light-purple);
  height: 100%;
  width: 100%;
  display: flex;
  padding: 10% 0%;
  justify-content: center;
  & > div {
    width: 80%;
    background-color: white;
    border-radius: 50px;
    padding: 70px 10px 0px 10px;
  }
`;
export const Story = styled.div`
  flex: 1;
`;
export const SelectView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  button {
    width: 80%;
    padding: 10px 0px;
    font-size: 18px;
    border: none;
    font-weight: bold;
    border: 3px solid var(--light-purple);
    background-color: white;
    border-radius: 5px;
  }
`;
