import { Chart } from "./StatisticDonutChartText.styles";
type TextProps = {
  text: string;
};
const StatisticDonutChartText: React.FC<TextProps> = ({ text }) => {
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

export default StatisticDonutChartText;
