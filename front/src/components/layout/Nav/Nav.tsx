import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper, StyledIcon } from "./Nav.stlyes";
import wallet from "../../../assets/image/wallet.png";
import purpleWallet from "../../../assets/image/purple-wallet.png";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/path";

const Nav = () => {
  const navigate = useNavigate();
  const movePage = (page: string) => {
    navigate(page);
  };

  return (
    <Wrapper>
      <div onClick={() => movePage(PATH.HOME)}>
        <StyledIcon icon={faHouse} />
      </div>
      <div onClick={() => movePage(PATH.CARD_RECOMMEND)}>
        {true ? <img src={wallet} /> : <img src={purpleWallet} />}
      </div>
      <div
        onClick={() => movePage(PATH.STATISTICS + PATH.STATISTICS_CONSUMPTION)}
      >
        <StyledIcon icon={faChartSimple} />
      </div>
      <div onClick={() => movePage(PATH.SETTING)}>
        <StyledIcon icon={faGear} />
      </div>
    </Wrapper>
  );
};

export default Nav;
