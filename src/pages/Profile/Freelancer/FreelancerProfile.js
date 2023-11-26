import {
   Row,
   Col,
   Card,
   Divider,
   Avatar,
   Descriptions,
   Typography,
   Tag,
   List,
   Empty,
   Image,
} from "antd";
import { formatDate } from "components/formatter/format";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { get } from "utils/APICaller";

const { Title, Text } = Typography;
const { Group } = Avatar;

function FreelancerProfile() {
   const [user, setUser] = useState();

   useEffect(() => {
      get({ endpoint: `/freelancer/profile/38` })
         .then((res) => {
            setUser(res.data);
         })
         .catch((err) => { });
   }, []);

   console.log(user);
   return (
      <>
         <div className="tabled" >
            <Row gutter={[24, 0]} justify="center">
               <Col md={24} xl={22}>
                  <Card
                     bordered={false}
                     bodyStyle={{ padding: 0 }}
                     style={{ padding: 20 }}
                     className="mb-24"
                  >
                     <Row gutter={[24, 0]}>
                        <Col md={15} xs={24} style={{ padding: 20 }}>
                           <Group>
                              <Avatar
                                 size={80}
                                 shape='circle'
                                 src={user?.accounts.image}
                              />
                              <Title level={3} style={{ marginLeft: 10 }}>
                                 {user?.accounts.name}
                              </Title>
                           </Group>
                           <Col style={{ padding: "10px 20px" }} >
                              <Title level={5} style={{ display: "inline-block" }}>Vai trò: </Title>
                              <Tag color="#87d068" style={{ marginLeft: "1rem" }}>{user?.accounts.role}</Tag>
                           </Col>
                           <Col style={{ padding: 20 }}>
                              <Title level={4}>{user?.title}</Title>
                              <Text level={3}>{user?.introduction}</Text>
                           </Col>
                        </Col>
                        <Col md={1} xs={0}>
                           <Divider type="vertical" style={{ height: "100%" }} />
                        </Col>
                        <Col md={0} xs={24}>
                           <Divider />
                        </Col>
                        <Col md={8} style={{ padding: 20 }}>
                           <Title level={4}>Thông tin người dùng</Title>
                           <Descriptions column={1}>
                              <Descriptions.Item label='Email'>
                                 {user?.accounts.email}
                              </Descriptions.Item>
                              <Descriptions.Item label='Số điện thoại'>
                                 {user?.accounts.phone}
                              </Descriptions.Item>
                              <Descriptions.Item label='Chuyên ngành'>
                                 {user?.major}
                              </Descriptions.Item>
                              <Descriptions.Item label='Thời gian làm việc'>
                                 {user?.hoursPerWeek}
                              </Descriptions.Item>
                           </Descriptions>
                           <Descriptions layout="vertical">
                              <Descriptions.Item label='Địa chỉ' layout="vertical">
                                 {user?.accounts.address}
                              </Descriptions.Item>
                           </Descriptions>
                        </Col>
                     </Row>
                     <Divider style={{ margin: 0 }} />
                     <Row>
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                              Kỹ năng
                           </Title>
                        </Col>
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <List
                              grid={{
                                 gutter: 15,
                              }}
                              dataSource={user?.skills}
                              renderItem={(item) => (
                                 <List.Item
                                    style={{
                                       fontWeight: 700,
                                       padding: '5px 10px',
                                       backgroundColor: "#89DBE9",
                                       borderRadius: 25,
                                       margin: 0
                                    }}
                                 >
                                    {item.name} - {item.freelancerskill.level}
                                 </List.Item>
                              )}
                           />
                        </Col>
                        <Divider style={{ margin: "10px 0" }} />
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                              Ngôn ngữ
                           </Title>
                        </Col>
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <Descriptions column={2}>
                              {user?.language.map((item, index) => {
                                 return (<Descriptions.Item label={item.name}>{item.level}</Descriptions.Item>)
                              })}
                           </Descriptions>
                        </Col>
                     </Row>
                  </Card>
               </Col>
               <Col md={24} xl={22}>
                  <Card
                     bordered={false}
                     bodyStyle={{ padding: 0 }}
                     style={{ padding: 20 }}
                     className="mb-24"
                  >
                     <Row>
                        <Col span={24} style={{ padding: 20 }}>
                           <Title level={4} style={{ margin: 0 }}>
                              Chứng chỉ
                           </Title>
                        </Col>

                        <Row style={{ marginRight: 30, marginLeft: 30 }}>
                           {user?.certificates.length === 0 || user?.certificates === null ? (
                              <Col span={24}>
                                 <Empty />
                              </Col>
                           ) : (user?.certificates.map((certificate, index) => (
                              <div key={certificate.id} style={{ width: '100%' }}>
                                 <Col span={24}>
                                    <Row
                                       style={{ padding: '20px 30px' }}
                                       align={'middle'}
                                    >
                                       <Col span={0} sm={{ span: 4 }} style={{ paddingRight: 20 }}>
                                          <Link to={certificate.credentialUrl} target="_blank">
                                             <Image
                                                src={
                                                   'https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/resources%2Fimage%2Fcertificate-1.png?alt=media&token=c69c8ae7-24df-4b50-92fa-37b5cc9439e1'
                                                }
                                                preview={false}
                                                alt="certificate"
                                             />
                                          </Link>
                                       </Col>
                                       <Col span={24} sm={{ span: 20 }}>
                                          <Row>
                                             <Col span={23}>
                                                <Row>
                                                   <Col span={24}>
                                                      <Link to={certificate.credentialUrl} >
                                                         <Typography.Title level={3} style={{ margin: 0 }}>
                                                            {certificate.name}
                                                         </Typography.Title>
                                                      </Link>
                                                   </Col>
                                                   <Col span={24}>
                                                      <Typography.Text>

                                                         Tổ chức: {certificate.issuingOrganization}
                                                      </Typography.Text>
                                                   </Col>
                                                   <Col span={24}>
                                                      <Typography.Text>
                                                         Ngày phát hành: {formatDate(certificate.issueDate)}
                                                      </Typography.Text>
                                                   </Col>
                                                   <Col
                                                      span={24}
                                                      style={{
                                                         display: certificate.expirationDate
                                                            ? 'block'
                                                            : 'none',
                                                      }}
                                                   >
                                                      <Typography.Text>
                                                         Ngày hết hạn: {formatDate(certificate.expirationDate)}
                                                      </Typography.Text>
                                                   </Col>
                                                </Row>
                                             </Col>
                                          </Row>
                                       </Col>
                                    </Row>
                                 </Col>
                                 {user?.certificates.length === index + 1 ? null : (
                                    <Divider />
                                 )}
                              </div>
                           )))}



                        </Row>
                     </Row>
                  </Card>
               </Col>
               <Col md={24} xl={22}>
                  <Card
                     bordered={false}
                     bodyStyle={{ padding: 0 }}
                     style={{ padding: 20 }}
                  >
                     <Row>
                        <Col span={24} style={{ padding: 20 }}>
                           <Title level={4} style={{ margin: 0 }}>
                              Dự án từng làm
                           </Title>
                        </Col>

                        <Col span={24} style={{ paddingRight: 30, paddingLeft: 30 }}>
                           <Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                              Javascript expert with Next.js and React.js expertise
                           </Title>
                           <Text style={{ color: "#828282" }}>
                              Jul 8, 2020 - Mar 8, 2023
                           </Text>
                        </Col>

                        <Divider />
                        <Col span={24} style={{ paddingRight: 30, paddingLeft: 30 }}>
                           <Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                              Javascript expert with Next.js and React.js expertise
                           </Title>
                           <Text style={{ color: "#828282" }}>
                              Jul 8, 2020 - Mar 8, 2023
                           </Text>
                        </Col>

                        <Divider />
                        <Col span={24} style={{ paddingRight: 30, paddingLeft: 30 }}>
                           <Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                              Javascript expert with Next.js and React.js expertise
                           </Title>
                           <Text style={{ color: "#828282" }}>
                              Jul 8, 2020 - Mar 8, 2023
                           </Text>
                        </Col>
                        <Divider />
                     </Row>
                  </Card>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default FreelancerProfile;