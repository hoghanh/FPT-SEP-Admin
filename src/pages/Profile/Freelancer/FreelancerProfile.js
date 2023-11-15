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
} from "antd";

const { Title, Text } = Typography;
const { Group } = Avatar;

const user = {
   "id": 10,
   "status": true,
   "cvFile": "",
   "hoursPerWeek": "Ít hơn 30h / tuần",
   "introduction": "I’m a developer with experience in building websites for small and medium sized businesses. Whether you’re trying to win work, list your services or even create a whole online store – I can help! I’m experienced in HTML and CSS 3, JavaScipt, ReactJS and React Native Regular communication is really important to me, so let’s keep in touch!",
   "major": "Thiết kế đồ họa",
   "title": "Software Engineer | Javascript",
   "createdAt": "2023-09-28T17:19:48.000Z",
   "updatedAt": "2023-11-13T06:24:12.000Z",
   "accountId": 38,
   "accounts": {
      "id": 38,
      "name": "Nguyễn Hữu Phạm Tuân",
      "phone": "0865644162",
      "email": "tuannhpse150570@fpt.edu.vn",
      "address": "458 Tân Lập",
      "image": "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl\=1",
      "password": "$2b$10$kjLs.Z.orX0eo0.Fmh5A1uL6xCRTOg6RU/HmF/iEioFyU6yFqfE/O",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-28T17:19:47.000Z",
      "updatedAt": "2023-11-13T00:48:45.000Z"
   },
   "skills": [
      {
         "id": 1,
         "name": ".NET",
         "freelancerskill": {
            "freelancerSkillId": 22,
            "level": "Thông thạo",
            "createdAt": "2023-11-13T03:23:57.000Z",
            "updatedAt": "2023-11-13T03:24:35.000Z",
            "freelancerId": 10,
            "skillId": 1
         }
      },
      {
         "id": 6,
         "name": "PHP",
         "freelancerskill": {
            "freelancerSkillId": 67,
            "level": "Trung cấp",
            "createdAt": "2023-11-14T16:04:59.000Z",
            "updatedAt": "2023-11-14T16:05:29.000Z",
            "freelancerId": 10,
            "skillId": 6
         }
      }
   ],
   "certificates": [
      {
         "id": 1,
         "name": "Chứng chỉ MOS 2017",
         "issuingOrganization": "Microsoft",
         "issueDate": "2023-11-07T00:00:00.000Z",
         "expirationDate": null,
         "credentialId": "1234567890",
         "credentialUrl": "https://www.microsoft.com/en-us/learning/certifications/mos-2019",
         "createdAt": "2023-11-13T00:49:32.000Z",
         "updatedAt": "2023-11-14T11:04:41.000Z",
         "freelancerId": 10
      },
      {
         "id": 2,
         "name": "Chứng chỉ MOS 2021",
         "issuingOrganization": "Microsoft",
         "issueDate": "2023-11-12T17:00:00.000Z",
         "expirationDate": null,
         "credentialId": "12345678910",
         "credentialUrl": "https://www.microsoft.com/en-us/learning/certifications/mos-2021",
         "createdAt": "2023-11-13T00:50:17.000Z",
         "updatedAt": "2023-11-13T05:54:06.000Z",
         "freelancerId": 10
      }
   ],
   "language": [
      {
         "id": 1,
         "name": "Tiếng Pháp",
         "level": "Trung cấp",
         "createdAt": "2023-11-13T00:49:01.000Z",
         "updatedAt": "2023-11-13T00:49:01.000Z",
         "freelancerId": 10
      }
   ]
};

function FreelancerProfile() {
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
                                 src={user.accounts.image}
                              />
                              <Title level={3} style={{ marginLeft: 10 }}>
                                 {user.accounts.name}
                              </Title>
                           </Group>
                           <Col style={{ padding: "10px 20px" }} >
                              <Title level={5} style={{ display: "inline-block" }}>Role: </Title>
                              <Tag color="#87d068" style={{ marginLeft: "1rem" }}>{user.accounts.role}</Tag>
                           </Col>
                           <Col style={{ padding: 20 }}>
                              <Title level={4}>{user.title}</Title>
                              <Text level={3}>{user.introduction}</Text>
                           </Col>
                        </Col>
                        <Col md={1} xs={0}>
                           <Divider type="vertical" style={{ height: "100%" }} />
                        </Col>
                        <Col md={0} xs={24}>
                           <Divider />
                        </Col>
                        <Col md={8} style={{ padding: 20 }}>
                           <Title level={4}>Freelancer Information</Title>
                           <Descriptions column={1}>
                              <Descriptions.Item label='Email'>
                                 {user.accounts.email}
                              </Descriptions.Item>
                              <Descriptions.Item label='Số điện thoại'>
                                 {user.accounts.phone}
                              </Descriptions.Item>
                              <Descriptions.Item label='Major'>
                                 {user.major}
                              </Descriptions.Item>
                              <Descriptions.Item label='HoursPerWeek'>
                                 {user.hoursPerWeek}
                              </Descriptions.Item>
                           </Descriptions>
                           <Descriptions layout="vertical">
                              <Descriptions.Item label='Địa chỉ' layout="vertical">
                                 {user.accounts.address}
                              </Descriptions.Item>
                           </Descriptions>
                        </Col>
                     </Row>
                     <Divider style={{ margin: 0 }} />

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

                  <Card
                     bordered={false}
                     bodyStyle={{ padding: 0 }}
                     style={{ padding: 20 }}
                     title={<Title level={3}>Additional Information</Title>}
                  >
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
                              dataSource={user.skills}
                              renderItem={(item, index) => (
                                 <List.Item
                                    style={{
                                       fontWeight: 700,
                                       padding: '5px 10px',
                                       backgroundColor: "#89DBE9",
                                       borderRadius: 25,
                                       margin: 0
                                    }}
                                 >
                                    {item.name}
                                 </List.Item>
                              )}
                           />
                        </Col>
                     </Row>

                     <Divider style={{ margin: "10px 0" }} />
                     <Row>
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                              Language
                           </Title>
                        </Col>
                        <Col span={24} style={{ padding: "10px 20px" }}>
                           <Descriptions column={2}>
                              {user.language.map((item, index) => {
                                 return (<Descriptions.Item label={item.name}>{item.level}</Descriptions.Item>)
                              })}
                           </Descriptions>
                        </Col>
                     </Row>

                     <Divider style={{ margin: "10px 0" }} />
                  </Card>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default FreelancerProfile;