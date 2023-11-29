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
   Radio,
   notification,
   Pagination,
} from "antd";
import { CalculateDaysLeft, formatDate } from "components/formatter/format";
import { useEffect, useState } from "react";
import { get } from "utils/APICaller";
import { NavLink, useParams } from 'react-router-dom';


const { Title, Text } = Typography;
const { Group } = Avatar;


function JobItem({ data }) {
   return (
     <>
       <div
         style={{
           padding: '10px 10px',
           alignItems: 'center',
           borderBottom: '1px solid #f0f0f0',
         }}
         key={data?.id}
       >
         <div
           style={{
             display: 'flex',
             alignItems: 'flex-start',
             justifyContent: 'space-between',
             gap: 15,
           }}
         >
           <div>
             <NavLink to='/clientProfile'>
               <Group style={{ display: 'flex' }}>
                 <div className='avatar-info'>
                   <Title level={4}>{data?.jobs?.clients?.accounts?.name}</Title>
                 </div>
               </Group>
             </NavLink>
             <NavLink to='/jobDetail'>
               <Title style={{ margin: 0 }} level={5}>
                 {data?.title}
               </Title>
             </NavLink>
           </div>
         </div>
         <Text level={4}>
           Ngày đăng: {formatDate(data?.createdAt)} -{' '}
           {CalculateDaysLeft(data?.applicationSubmitDeadline)}
         </Text>
         <Typography.Paragraph
           ellipsis={{
             rows: 3,
             expandable: false,
           }}
         >
           {data?.description}
         </Typography.Paragraph>
       </div>
     </>
   );
 }

function FreelancerProfile() {
   const [user, setUser] = useState();
   const [page, setPage] = useState(1);
   const [jobList, setJobList] = useState([]);
   const [pageSize] = useState(10);
   const { accountId } = useParams();

   useEffect(() => {
      get({ endpoint: `/freelancer/profile/${accountId}` })
         .then((res) => {
            setUser(res.data);
            get({ endpoint: `/application/freelancer/${res.data.id}` })
               .then((res) => {
                  setJobList(res.data);
               })
               .catch((error) => {
                  notification.error({
                     message: error.response.data.message,
                  });
               });
         })
         .catch((err) => {
            notification.error({
               message: err.response.data.message,
            });
         });
   }, [accountId]);

   const onChange = (pageNumber) => {
      setPage(pageNumber);
   };

   const onChangeSort = (e) => {
      console.log(e.target.value)
   };
   const getPagedList = () => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return jobList?.slice(start, end);
   };


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
                                 gutter: [15,10]
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
                           {user?.certificates?.length === 0 || user?.certificates === null ? (
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
                                          <Typography.Link href={certificate.credentialUrl} target="_blank">
                                             <Image
                                                src={
                                                   'https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/resources%2Fimage%2Fcertificate-1.png?alt=media&token=c69c8ae7-24df-4b50-92fa-37b5cc9439e1'
                                                }
                                                preview={false}
                                                alt="certificate"
                                             />
                                          </Typography.Link>
                                       </Col>
                                       <Col span={24} sm={{ span: 20 }}>
                                          <Row>
                                             <Col span={23}>
                                                <Row>
                                                   <Col span={24}>
                                                      <Typography.Link href={certificate.credentialUrl} target="_blank">
                                                         <Typography.Title level={3} style={{ margin: 0 }}>
                                                            {certificate.name}
                                                         </Typography.Title>
                                                      </Typography.Link>
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
                     className="criclebox tablespace mb-24"
                     title="Danh sách công việc"
                     extra={
                        <>
                           <Radio.Group onChange={onChangeSort} defaultValue="all">
                              <Radio.Button value="all">Tất cả</Radio.Button>
                              <Radio.Button value="open">Còn hạn</Radio.Button>
                              <Radio.Button value="close">Hết hạn</Radio.Button>
                           </Radio.Group>
                        </>
                     }
                  >
                     <div className="table-responsive">
                        {
                           getPagedList()?.map((jobItem, id) => {
                              return (<JobItem key={id} data={jobItem} />)
                           })
                        }
                     </div>
                     <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                        <Pagination
                           current={page}
                           total={jobList?.length}
                           onChange={onChange}
                           pageSize={pageSize}
                           showSizeChanger={false}
                           style={{ padding: 20, display: "flex", justifyContent: "center" }}
                        />
                     </div>
                     <div className="uploadfile pb-15 shadow-none">
                     </div>
                  </Card>
               </Col>
            </Row>
         </div>
      </>
   );
}

export default FreelancerProfile;