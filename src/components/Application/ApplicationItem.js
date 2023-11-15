import { NavLink } from 'react-router-dom';
import { Typography, Avatar, Descriptions, Row, Col, Divider } from "antd";
import { Trash } from "../icon/Icon";

const { Title, Text } = Typography;
const { Group } = Avatar
const face2 = "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5"

function ApplicationItem() {
   return (
      <>
         <Row style={{ padding: "10px 20px" }}>
            <Col span={24}>
               <NavLink
                  to="/freelancerProfile"
               >
                  <Group
                     style={{ display: "flex" }}
                  >
                     <Avatar
                        className="shape-avatar"
                        size={40}
                        src={face2}
                     />
                     <div className="avatar-info">
                        <Title level={4}>Cao Hong Hanh</Title>
                     </div>
                  </Group>
               </NavLink>
            </Col>
            <Col span={24}>
               <NavLink
                  to="/jobDetail"
               >
                  <Row>
                     <Col>
                        <Title style={{ margin: 0 }} level={5}>
                           Job:
                        </Title>
                     </Col>
                     <Col>
                        <Title level={5} style={{ margin: 0, marginLeft: 10 }} >
                           Javascript expert with Next.js and React.js expertise
                        </Title>
                     </Col>
                  </Row>
               </NavLink>
            </Col>
            <Col span={24}>
               <Descriptions>
                  <Descriptions.Item label="Sent Date">
                     <Text level={4}>
                        19/23/45
                     </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                     <Text level={4}>
                        Declined
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