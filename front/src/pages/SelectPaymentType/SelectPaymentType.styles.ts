import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background: linear-gradient(120deg, #f1e5ff 6%, #dcbefc 50%, #ffc6ff);
  padding: 33% 10%;
`;
export const SelectView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  .type-btn {
    width: 100%;
    padding: 20px 10%;
    background-color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
  }
`;
export const Title = styled.div`
  position: absolute;
  top: -20px;
  font-size: 40px;
  font-weight: 800;
`;
export const Button = styled.div`
  width: 100%;
`;
