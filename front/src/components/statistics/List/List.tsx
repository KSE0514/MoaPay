import { Wrapper, ListItem } from "./List.styles";

interface data {
  img: string;
  cateory: string;
  money: number;
  per: number;
}

interface Props {
  consumptionList: data[]; // props로 받을 데이터 타입 지정
}

const List = ({ consumptionList }: Props) => {

  return (
    <Wrapper>
      {consumptionList.map((consumption: data, index: number) => (
        <ListItem key={index}>
          <img src={consumption.img} alt={consumption.cateory} />
          <p>카테고리: {consumption.cateory}</p>
          <p>금액: {consumption.money}원</p>
          <p>퍼센트: {consumption.per}%</p>
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default List;
