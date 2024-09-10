import { Chart } from "./StatisticDounetChartText.styles";
type TextProps = {
  text: string;
};
const StatisticDounetChartText: React.FC<TextProps> = ({ text }) => {
  return (
    <Chart>
      {text.split("\n").map((line, index) => (
        <p style={{}} key={index}>
          {line}
          <br />
        </p>
      ))}
    </Chart>
  );
};

export default StatisticDounetChartText;
