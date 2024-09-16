import styled from "styled-components";

// rotate 속성을 받아 회전 여부에 따라 다른 스타일을 적용할 수 있습니다.
export const CardInfo = styled.div`
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  width: 100%;
  height: 110px;
  align-items: center;
  div {
    width: 40%;
    position: relative;
  }
  h3 {
    width: 60%;
  }
  img {
    object-fit: cover; // 이미지가 잘리지 않고 잘 맞도록 조정
  }
`;
