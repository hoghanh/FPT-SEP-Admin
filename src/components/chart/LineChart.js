import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div style={{ marginTop: "1rem" }}>

        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="area"
          height={350}
          width={"100%"}
        />
      </div>
    </>
  );
}

export default LineChart;
