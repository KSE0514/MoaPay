import { useNavigate } from "react-router-dom";
import { SelectView, Wrapper, Button, Title } from "./selectPaymentType.styles";
import { PATH } from "../../constants/path";

const SelectPaymentType = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SelectView>
        <Title>MoA Pay</Title>
        <div>단일결제</div>
        <div>추천결제</div>
        <div
          onClick={() => {
            navigate(PATH.DUTCHOPEN);
          }}
        >
          더치페이
        </div>
        {/* <Button>결제하기</Button> */}
      </SelectView>
    </Wrapper>
  );
};
export default SelectPaymentType;