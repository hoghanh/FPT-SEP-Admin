
import { Col, Row, Card, notification } from "antd";
import JobInformation from './JobInformation';
import JobApplication from "./JobApplication";
import { useEffect, useState } from "react";
import { get } from "utils/APICaller";
import { useParams } from 'react-router-dom';

function JobDetail() {
   const [jobDetail, setJobDetail] = useState();
   const [arrayStatus, setArrayStatus] = useState([]);
   const { jobId } = useParams();

   useEffect(() => {
      get({ endpoint: `/job/detail/${jobId}` })
         .then((res) => {
            setJobDetail(res.data);
            const countSent = res.data.applications.filter(item => item.status === 'sent').length
            const countInterview = res.data.applications.filter(item => item.status === 'interview').length
            const countApproved = res.data.applications.filter(item => item.status === 'approved').length
            setArrayStatus([countSent, countInterview, countApproved])
         })
         .catch((error) => {
            notification.error({
               message: error.response.data.message,
            });
         });
   },[jobId])
   
   return (
      <>
         <Row gutter={[24, 32]} justify="center">
            <Col md={24} xl={22}>
               <Card
                  bordered={false}
                  bodyStyle={{ padding: 0 }}
                  style={{ padding: 20 }}
               >
                  <JobInformation jobDetail={jobDetail}/>
               </Card>
            </Col>

            <Col md={24} xl={22}>
               <JobApplication arrayStatus={arrayStatus}/>
            </Col>
         </Row>
      </>
   )
}

export default JobDetail;