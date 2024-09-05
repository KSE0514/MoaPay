import styled from "styled-components";
export const Wrapper = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  background-color: var(--light-purple);
  padding: 30% 10% 0% 10%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.5s forwards;
`;
export const Nav = styled.div``;
export const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  padding: 20px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Ment = styled.div`
  text-align: center;
  color: black;
  line-height: 30px;
  font-size: 20px;
  font-weight: 560;
  padding-top: 40px;
`;
export const PasswordView = styled.div`
  @keyframes ddiyoung {
    0% {
    }
    50% {
    }
    100% {
    }
  }
  padding: 40px 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  div {
    color: var(--light-gray);
    margin-right: 10px;
  }
  .full {
    color: var(--light-purple);
    animation: ddiyoung 1s forwards;
  }
`;
export const KeyPad = styled.div`
  width: 100%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  place-items: center;
  button {
    width: 75px;
    height: 75px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 800;
  }
  button:hover {
    background-color: var(--light-purple);
    color: white;
  }
`;
