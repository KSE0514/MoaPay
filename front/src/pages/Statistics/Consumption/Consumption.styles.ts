import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Top = styled.div`
  * {
    position: relative;
    z-index: 10;
    color: white;
  }
`;
export const Bottom = styled.div``;
export const Month = styled.div`
  z-index: 20;
  padding-top: 20px;
  font-family: var(--day-font);
  @keyframes binggle {
   0%{
    transform: rotateZ(-180deg);
   }
   100%{
    transform: rotateZ(0deg);
   } 
  }
  @keyframes down {
    0%{
      max-height: 0px;
       padding: 0 20px 0 10px;
    }
    100%{
      max-height: 300px;
       padding: 10px 20px 15px 10px;
    }
  }
    @keyframes up{
    0%{
      max-height: 300px;
       padding: 10px 20px 15px 10px;
    }
    100%{
      max-height: 0px;
       padding: 0 20px 0 10px;
    }
  }
  .dropdown-btn{
    position: relative;
    font-size: 40px;
    display: flex;
    align-items: center;
    p{
      margin-right: 14px;
    }
  }
  .binggle{
    animation: binggle 0.8s linear;
  }
  .dropdown-menu{
    position: absolute;
    margin-top: 10px;
    width: fit-content;
    border-radius: 5px;
    background-color: white;
    font-size: 40px;
    max-height: 0;
    overflow: hidden;
    li{
      color: #a26eef; 
      width: fit-content;
      margin-bottom: 7px;
      border-bottom: 1.5px solid  #a26eef;
    }
    li:last-child{
      margin-bottom: 0px;
    }
  }

  .dropdown-menu.open{
      animation: down 1s forwards;
  }
  .dropdown-menu.close{
    animation: up 1s forwards;
  }
  
`;
export const DropDownIcon = styled(FontAwesomeIcon)`
  width: 20px;
`;

export const Info = styled.div`
  width: 100%;
  margin-top:36px;
  display: flex;
  align-items: center;
  justify-content:space-evenly;
`
export const Circle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: skyblue;
  margin-left: -5px;
`;
export const Text = styled.div`
  text-align: center;
  line-height: 61px;
  font-size: 28px;
  font-weight:600;
`;
export const Nav = styled.div``;
