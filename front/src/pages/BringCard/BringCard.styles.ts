import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  background: linear-gradient(120deg, #f1e5ff 6%, #dcbefc 50%, #ffc6ff);
  padding: 33% 10%;
`;
export const Title = styled.div`
  font-size: 22px;
  font-weight: 900;
  line-height: 30px;
  span {
    font-weight: 800;
  }
`;
export const ImageView = styled.div`
  margin-top: 20%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const Button = styled.div`
  width: 100%;
  text-align: center;
  font-size: 19px;
  background-color: var(--light-purple);
  color: white;
  font-weight: 800;
  margin-top: 30px;
  padding: 20px 0px;
  border-radius: 15px;
`;
