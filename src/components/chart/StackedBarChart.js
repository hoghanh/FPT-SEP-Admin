import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import stackedBarChart from "./configs/stackedBarChart";

function StackedBarChart() {
   const { Title, Paragraph } = Typography;

   const items = [
      {
         Amount: "223",
         status: "Sent",
      },
      {
         Amount: "128",
         status: "Declined",
      },
      {
         Amount: "75",
         status: "Interview",
      },
      {
         Amount: "50",
         status: "Approved",
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
            <Title level={5}>Posted Job</Title>
            <Paragraph className="lastweek">
               than last week <span className="bnb2">+10 jobs</span>
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
