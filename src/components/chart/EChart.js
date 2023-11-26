import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Tổng bài viết đã đăng</Title>
        <Paragraph className="lastweek">
          hơn tháng trước <span className="bnb2">+10</span>
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
