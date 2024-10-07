import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthStore } from "../../store/AuthStore";
import { List, User, Wrapper } from "./Setting.styles";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Setting = () => {
  const { name } = useAuthStore();
  return (
    <Wrapper>
      <div className="view">
        <User>
          <FontAwesomeIcon
            style={{
              width: "30px",
              height: "30px",
              color: "white",
              border: "1px solid white",
              padding: "20px",
              borderRadius: "50%",
            }}
            icon={faUser}
          />
          <p>{name}</p>
        </User>
        <List>
          <div>내 카드 목록</div>
          <div>카드 등록하러가기</div>
          <div>간편 비밀번호 변경</div>
          <div>생체정보 등록/재등록</div>
        </List>
      </div>
    </Wrapper>
  );
};
export default Setting;
