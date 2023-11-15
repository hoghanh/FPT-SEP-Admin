
import { Col, Row, Card } from "antd";
import JobInformation from './JobInformation';
import JobAppliaction from "./JobApplication";

function JobDetail() {
   return (
      <>
         <Row gutter={[24, 32]} justify="center">
            <Col md={24} xl={22}>
               <Card
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  style={{ padding: 20 }}
               >
                  <JobInformation />
               </Card>
            </Col>

            <Col md={24} xl={22}>
               <JobAppliaction />
            </Col>
         </Row>
      </>
   )
}

export default JobDetail;