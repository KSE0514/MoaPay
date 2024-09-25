import {
  faHouse,
  faGear,
  faChartSimple,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper, StyledIcon } from "./Nav.stlyes";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { PATH } from "../../../constants/path";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴
  const matchStatistics = useMatch(`${PATH.STATISTICS}/*`);
  const matchBringCard = useMatch(`${PATH.BRING_CARD}/*`);

  const match = matchStatistics || matchBringCard;
  const movePage = (page: string) => {
    navigate(page);
  };

  return (
    <Wrapper style={{ display: match ? "none" : "flex" }}>
      <div
        onClick={() => movePage(PATH.HOME)}
        className={location.pathname === PATH.HOME ? "active" : ""}>
        <StyledIcon icon={faHouse} />
        <p>Home</p>
      </div>
      <div
        onClick={() => movePage(PATH.CARD_RECOMMEND)}
        className={location.pathname === PATH.CARD_RECOMMEND ? "active" : ""}>
        <StyledIcon icon={faCreditCard} />
        <p>카드추천</p>
      </div>
      <div
        onClick={() => movePage(PATH.STATISTICS + PATH.STATISTICS_CONSUMPTION)}
        className={match ? "active" : ""}>
        <StyledIcon icon={faChartSimple} />
        <p>통계</p>
      </div>
      <div
        onClick={() => movePage(PATH.SETTING)}
        className={location.pathname === PATH.SETTING ? "active" : ""}>
        <StyledIcon icon={faGear} />
        <p>설정</p>
      </div>
    </Wrapper>
  );
};

export default Nav;
