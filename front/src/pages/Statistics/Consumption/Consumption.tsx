import { Top, Bottom, Month, Nav, Circle, Text } from "./Consumption.styles";
const Consumption = () => {
  return (
    <>
      <Top>
        <Month>2024.08</Month>
        <div>
          <Circle></Circle>
          <Text></Text>
        </div>
      </Top>
      <Bottom>
        <Nav></Nav>
      </Bottom>
    </>
  );
};
export default Consumption;
