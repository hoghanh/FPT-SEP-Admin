import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import stackedBarChart from "./configs/stackedBarChart";

function StackedBarChart() {
   const { Title, Paragraph } = Typography;

   const items = [
      {
         Amount: "223",
         status: "Gửi đi",
      },
      {
         Amount: "128",
         status: "Từ chối",
      },
      {
         Amount: "75",
         status: "Phỏng vấn",
      },
      {
         Amount: "50",
         status: "Chấp thuận",
      },
   ];

   return (
      <>
         <div id="chart">
            <ReactApexChart
               className="bar-chart"
               options={stackedBarChart.options}
               series={stackedBarChart.series}
               type="bar"
               height={220}
            />
         </div>
         <div className="chart-vistior">
            <Title level={5}>Tổng đơn ứng tuyển</Title>
            <Paragraph className="lastweek">
               hơn tháng trước <span className="bnb2">+36</span>
            </Paragraph>
            <Row gutter>
               {items.map((v, index) => (
                  <Col xs={6} xl={6} sm={6} md={6} key={index}>
                     <div className="chart-visitor-count">
                        <Title level={4}>{v.Amount}</Title>
                        <span>{v.status}</span>
                     </div>
                  </Col>
               ))}
            </Row>
         </div>
      </>
   );
}

export default StackedBarChart;
