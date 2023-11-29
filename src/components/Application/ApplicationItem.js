import { NavLink } from 'react-router-dom';
import { Typography, Avatar, Row, Col, Divider } from "antd";
import { formatDate } from 'components/formatter/format';

const { Title, Text } = Typography;
const { Group } = Avatar

function ApplicationItem({application}) {

   const checkStatus = (status)=>{
      let output ='';
      if(status === 'sent'){
         output = <span style={{color: '#008ffb'}}>Đã gửi</span>
      } else if(status === 'interview'){
         output = <span style={{color: '#00e396'}}>Phỏng vấn</span>
      } else if(status === 'approved'){
         output = <span style={{color: '#feb019'}}>Nhận việc</span>
      } else if(status === 'interview'){
         output = <span style={{color: '#ff4560'}}>Từ chối</span>
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
                     Javascript expert with Next.js and React.js expertise
                  </Title>

               </NavLink>
            </Col>
            <Col span={24}>
               <Text level={5} style={{ margin: 0 }} ellipsis>
                  {application?.description}
               </Text>
            </Col>
            <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Text>
                  Ngày gửi: {formatDate(application.sendDate)}
               </Text>
               <Text>
                  Trạng thái: {checkStatus(application.status)}
               </Text>
            </Col>
         </Row>
         <Divider />
      </>
   );
};

export default ApplicationItem;