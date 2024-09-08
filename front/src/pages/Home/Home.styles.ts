import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--light-purple);
`
export const Top = styled.div`
  height: 28%;
  padding: 51px 41px;
  & button {
    border: none;
    background-color: white;
  }
`;

export const BarcordArea = styled.div`
  margin-bottom: 19px;
  padding:18px 14px 10px 14px;
  background-color: white;
  border-radius: 19px;
`;
export const Barcord = styled.div`
  img{
    width: 100%;
    height: 87px;
  }
`;
export const Time = styled.div`
  padding-top:10px;
  display: flex;
  justify-content: center;
  gap: 5px;
`;
export const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
  button{
    width: 45%;
    border-radius: 10px;
    padding:6px 23px;
  }
`;


export const Bottom = styled.div`
position: relative;
padding: 20px 40px 113.5px 40px;
/* height:100%; */
overflow: hidden;
border-top-left-radius: 48px;
border-top-right-radius: 48px;
flex: auto;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
.edit-card{
  width: 100%;
  display: flex;
  align-items: center;
  gap:10px;
  color:#6C6C6C;
  margin-bottom: 32px;
}
.remaining-performance{
  width: 80%;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  padding:5px 31px;
  background-color: rgba(214, 125, 249, 0.62);
  border-radius: 21px;
  margin: 32px 0px 55px 0px ;
}
.tri{
  position: absolute;
  bottom: 100.5px;
  width: 0;
  height: 0;
  border-bottom: 100px solid rgba(84,98,255,0.24);
  border-top: 100px solid transparent;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  }
  .tri-left{
    left: -100px;
  }
  .tri-right{
    right: -100px;
  }
`;

export const CardList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective:100px;
  transform-style: preserve-3d;
  flex: 1;
  height: 500px;
  width: 100%;
    /* overflow-y: scroll; */
    .container{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      width:100%;
    }
    .card{
      width: 336px;
      height: 212px;
      transition:0.5s;
      position:absolute;
      &>img{
      width: 100%;
      height: 100%;
      }
    }
    .card:nth-of-type(1){  
      transform:translateY(-75px) translateZ(-0.2px);
      width: 88%;
    }
    .card:nth-of-type(2){  
      z-index: 10;
    }
    .card:nth-of-type(3){
      transform:translateY(75px) translateZ(-0.2px);
      width: 88%;
    }
    .card:nth-of-type(n+4) {
      display: none;
    }

   .add-card{
    background-color:white;
    color:rgba(125, 136, 255, 0.86);
    border:3px dotted rgba(125, 136, 255, 0.86);
    border-radius: 33px;
    display: flex;
    justify-content: center;
    padding:25px 0px 0px 0px;
    font-size: 20px;
    p{
      margin-top: 5px;
    }
  }
  /* 두 번째 .add-card에 스타일 적용 */
  .card:nth-of-type(2).add-card {
    font-size: 25px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      margin-top: 0px;
    }
  }
  
`
export const PlusIcon = styled(FontAwesomeIcon)`
  height: 13px;
  width: 13px;
  border: 3px dotted rgba(125, 136, 255, 0.86);
  margin-right: 5px;
  border-radius: 50%;
  padding:5px 5px;
`