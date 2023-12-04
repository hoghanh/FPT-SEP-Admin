import { NavLink } from 'react-router-dom';
import { Typography, Avatar, Row, Col, Divider, Descriptions } from "antd";
import { formatDate } from 'components/formatter/format';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Group } = Avatar

function ApplicationItem({ application }) {
   const [isTruncated, setIsTruncated] = useState(true);
   const text = application?.description;
   const resultString = isTruncated ? text.slice(0, 300) : text;

   const checkStatus = (status) => {
      let output = '';
      if (status === 'sent') {
         output = <span style={{ color: '#008ffb' }}>Đã gửi</span>
      } else if (status === 'interview') {
         output = <span style={{ color: '#00e396' }}>Phỏng vấn</span>
      } else if (status === 'approved') {
         output = <span style={{ color: '#feb019' }}>Nhận việc</span>
      } else if (status === 'declined') {
         output = <span style={{ color: '#ff4560' }}>Từ chối</span>
      }
      return output;
   }

   return (
      <>
         <Row style={{ padding: "10px 20px" }}>
            <Col span={24}>
               <NavLink to={`/user/profile-freelancer/${application?.freelancers.accounts.id}`}>
                  <Group
                     style={{ display: "flex" }}
                  >
                     <Avatar
                        className="shape-avatar"
                        size={40}
                        src={application?.freelancers.accounts.image}
                     />
                     <div className="avatar-info">
                        <Title level={4}>{application?.freelancers.accounts.name}</Title>
                     </div>
                  </Group>
               </NavLink>
            </Col>
            <Col span={24}>
               <NavLink
                  to={`/job/job-detail/${application?.jobId}`}
               >
                  <Title level={5} style={{ margin: 0 }} >
                     {application?.jobs.title}
                  </Title>

               </NavLink>
            </Col>
            <Col span={24}>
               <Paragraph className='mb-2' style={{ margin: 0 }}>
                  {resultString} {text.length > 300 && (
                     <span style={{ color: '#40a9ff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsTruncated(!isTruncated)}>
                        {isTruncated ? 'xem thêm' : 'thu gọn'}
                     </span>
                  )}
               </Paragraph>

            </Col>
            <Col span={24}>
               <Descriptions column={1}>
                  <Descriptions.Item label="Trạng thái">
                     <Text level={4}>
                        {checkStatus(application.status)}
                     </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày gửi">
                     <Text level={4}>
                        {formatDate(application.sendDate)}
                     </Text>
                  </Descriptions.Item>
               </Descriptions>
            </Col>
         </Row>
         <Divider />
      </>
   );
};

export default ApplicationItem;