import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, List, Avatar, Space, notification, Pagination, Modal, Form, InputNumber, Select, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Echart from '../components/chart/EChart';
import LineChart from '../components/chart/LineChart';
import StackedBarChart from '../components/chart/StackedBarChart';
import {
  Documents,
  Edit,
  ListItem,
  User,
  Money,
} from '../components/icon/Icon';
import JobItem from '../components/job/JobItem';
import { get, put } from 'utils/APICaller';
import { FormatVND, formatDateTime } from 'components/formatter/format';
import { Link } from 'react-router-dom';

function Home() {
  const { Title, Text } = Typography;
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [applications, setApplications] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [lastRevenue, setLastRevenue] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUser] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commissionFee, setCommissionFee] = useState([]);
  const [postingFee, setPostingFee] = useState([]);
  const [flag, setFlag] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    get({ endpoint: `/application/` })
      .then((res) => {
        setApplications(res.data.rows);
        setTotalApplications(res.data.count);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
    get({ endpoint: `/accounts/` })
      .then((res) => {
        setTotalUser(res.data.length);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
    get({ endpoint: `/payment/revenue` })
      .then((res) => {
        const data = res.data;
        setRevenue(data.payments)
        data.payments?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const latestRevenues = data.payments?.slice(0, 15);
        setLastRevenue(latestRevenues)
        setTotalRevenue(data.revenue);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);


  useEffect(() => {
    get({ endpoint: `/job/` })
      .then((res) => {
        res.data.jobs.sort((a, b) => b.applied - a.applied);
        setJobList(res.data.jobs);
        setTotalPosts(res.data.jobs.length)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, [limit, page]);

  useEffect(() => {
    get({ endpoint: `/systemValue/fee` })
      .then((res) => {
        setCommissionFee(res.data.filter((i)=> i.name === 'commissionFee'))
        setPostingFee(res.data.filter((i)=> i.name === 'postingFee'))
        setFlag(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, [flag]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        put({
          endpoint: `/systemValue/fee`, 
          body: {
            feeName: values.feeName,
            value: values.value,
          }
        })
          .then((res) => {
            setFlag(true)
            notification.success({
              message: res.data.message,
            });
            setIsModalOpen(false);
          })
          .catch((error) => {
            notification.error({
              message: error.response.data.message,
            });
          });
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel  = () => {
    setIsModalOpen(false);
  }

  const count = [
    {
      today: 'Tổng bài đăng',
      title: `${totalPosts}`,
      icon: <ListItem />,
    },
    {
      today: 'Tổng số tài khoản',
      title: `${totalUsers}`,
      icon: <User color='#fff' />,
    },
    {
      today: 'Tổng đơn ứng tuyển',
      title: `${totalApplications}`,
      icon: <Documents color='#fff' />,
    },
    {
      today: 'Doanh thu',
      title: `${FormatVND(totalRevenue, '')}`,
      per: 'VND',
      icon: <Money size={46} />,
      bnb: "bnb3",
    },
  ];


  const newest = lastRevenue?.map((item) => ({
    id: item.id,
    avatar: <PlusOutlined style={{ fontSize: 10 }} />,
    title: item.clients.accounts.name,
    description: formatDateTime(item.createdAt),
    amount: `+ ${FormatVND(item.amount)}`,
    textclass: 'text-fill',
    amountcolor: 'text-success',
  }));


  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const filteredData = jobList?.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  const getPagedList = () => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredData?.slice(start, end);
  };



  return (
    <>
      <div className='layout-content'>
        <Row className='rowgap-vbox' gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={6}
              className='mb-24'
            >
              <Card bordered={false} className='criclebox '>
                <div className='number'>
                  <Row align='middle' gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.per}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className='icon-box'>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]} className='mb-24'>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <Echart jobList={jobList} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <StackedBarChart applications={applications} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]} className='mb-24'>
          <Col span={24}>
            <Card
              bordered={false}
              className="criclebox h-full"
              title={<Title level={4}>Doanh Thu</Title>}
              extra={
                <Space size={"large"}>
                  <Typography.Text>Phí nhận việc <span className="bnb2">{FormatVND(commissionFee[0]?.value)}</span> - Phí đăng bài: <span className="bnb2">{FormatVND(postingFee[0]?.value)}</span></Typography.Text>
                  <div style={{ cursor: 'pointer' }} onClick={showModal}><Edit size={17} /></div>
                </Space>
              }
            >
              <LineChart revenue={revenue} />
            </Card>

            <Modal title="Phí dịch vụ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Lưu' cancelText='Hủy bỏ'>
              <Form form={form} name='inputMoney'>
                <Typography.Text>Hiện tại | Phí nhận việc <span className="bnb2">{FormatVND(commissionFee[0]?.value)}</span> - Phí đăng bài: <span className="bnb2">{FormatVND(postingFee[0]?.value)}</span></Typography.Text>
                <Form.Item
                  name='feeName'
                  style={{ paddingTop: 20 }}
                  initialValue='commissionFee'
                >
                  <Select
                    style={{
                      width: 200,
                    }}
                    options={[
                      {
                        value: 'commissionFee',
                        label: 'Phí nhận việc',
                      },
                      {
                        value: 'postingFee',
                        label: 'Phí đăng bài',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name='value'
                  rules={[
                    {
                      required: true,
                      message: 'Không được để trống ô này!',
                    },
                    {
                      validator: (_, value) =>
                        value >= 0 ? Promise.resolve() : Promise.reject(new Error('Giá trị phải lớn hơn hoặc bằng 0!')),
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} step={10000} placeholder='10000' />
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} className='mb-24'>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách công việc"
              extra={<div className='header-control' style={{ marginBottom: 10 }}>
                <Input
                  className='header-search'
                  placeholder='Tìm kiếm theo tên'
                  prefix={<SearchOutlined />}
                  onChange={(e) => { setPage(1); setSearchTerm(e.target.value) }}
                />
              </div>}
            >
              <div className="table-responsive">
                {
                  getPagedList().map((jobItem, id) => {
                    return (<JobItem key={id} data={jobItem} />)
                  })
                }
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                <Pagination
                  current={page}
                  total={filteredData.length}
                  onChange={onChange}
                  pageSize={limit}
                  showSizeChanger={false}
                  style={{ padding: 20, display: "flex", justifyContent: "center" }}
                />
              </div>
              <div className="uploadfile pb-15 shadow-none">
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='timeline-box'>
                <Link to='/billing'><Title level={5}>Doanh thu gần đây</Title></Link>
                <List
                  className='transactions-list ant-newest'
                  itemLayout='horizontal'
                  dataSource={newest}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar size='small' className={item.textclass}>
                            {item.avatar}
                          </Avatar>
                        }
                        title={item.title}
                        description={item.description}
                      />
                      <div className='amount'>
                        <span className={item.amountcolor}>{item.amount}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
