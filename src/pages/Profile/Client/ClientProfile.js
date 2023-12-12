import {
   Row,
   Col,
   Card,
   Divider,
   Avatar,
   Descriptions,
   Typography,
   Tag,
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
   const [isTruncated, setIsTruncated] = useState(true);
   const text = data?.description;
   const resultString = isTruncated ? text.slice(0, 300) : text;
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
                  <Group style={{ display: 'flex' }}>
                     <div className='avatar-info'>
                        <Title level={4}>{data?.jobs?.clients?.accounts?.name}</Title>
                     </div>
                  </Group>
                  <NavLink to={`/job/job-detail/${data.id}`}>
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
         <p className='mb-2' style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: resultString }} />
            {text.length > 300 && (
               <span style={{ color: '#40a9ff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsTruncated(!isTruncated)}>
                  {isTruncated ? 'xem thêm' : null}
               </span>
            )}
       </div>
     </>
   );
 }

function ClientProfile() {
   const [user, setUser] = useState();
   const [page, setPage] = useState(1);
   const [jobList, setJobList] = useState([]);
   const [pageSize] = useState(10);
   const [sortOption, setSortOption] = useState('all');
   const { accountId } = useParams();

   useEffect(() => {
      get({ endpoint: `/client/profile/${accountId}` })
         .then((res) => {
            setUser(res.data);
            get({ endpoint: `/job/client/${res.data.id}` })
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
   }, []);

   const onChange = (pageNumber) => {
      setPage(pageNumber);
   };

   const onChangeOption = (e) => {
      setSortOption(e.target.value);
   };

   let sortedJobList = [...jobList];


   if (sortOption === 'all') {
      sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
   } else if (sortOption === 'open') {
      const list = [];
      for (const job of jobList) {
         if (job.status === 'open') {
            list.push(job);
         }
      }
      sortedJobList = list
      sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
   } else if (sortOption === 'close') {
      const list = [];
      for (const job of jobList) {
         if (job.status === 'close') {
            list.push(job);
         }
      }
      sortedJobList = list
      sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
   }


   const getPagedList = () => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return sortedJobList?.slice(start, end);
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
                                 src={user?.accounts?.image}
                              />
                              <Title level={3} style={{ marginLeft: 10 }}>
                                 {user?.accounts?.name}
                              </Title>
                           </Group>
                           <Col style={{ padding: "10px 20px" }} >
                              <Title level={5} style={{ display: "inline-block" }}>Vai trò: </Title>
                              <Tag color="#87d068" style={{ marginLeft: "1rem" }}>{user?.accounts.role==='client' ? 'Doanh nghiệp' : 'Freelancer'}</Tag>
                           </Col>
                           <Col style={{ padding: 20 }}>
                              <Title level={4}>{user?.title}</Title>
                              <p dangerouslySetInnerHTML={{ __html: user?.introduction }}/>
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
                              <Descriptions.Item label='Website'>
                                 {user?.companyWebsite}
                              </Descriptions.Item>
                              <Descriptions.Item label='Mã số thuế'>
                                 {user?.taxCode}
                              </Descriptions.Item>
                           </Descriptions>
                           <Descriptions layout="vertical">
                              <Descriptions.Item label='Địa chỉ' layout="vertical">
                                 {user?.accounts.address}
                              </Descriptions.Item>
                           </Descriptions>
                        </Col>
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
                           <Radio.Group onChange={onChangeOption} defaultValue="all">
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
                           total={sortedJobList.length}
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

export default ClientProfile;