import { useEffect, useState } from 'react';

import { Card, Col, Row, Typography, List, Avatar, Space, notification, Pagination } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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
import { get } from 'utils/APICaller';
import { FormatVND, formatDate, formatDateTime } from 'components/formatter/format';

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
    get({ endpoint: `/job` })
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
      title: `${FormatVND(totalRevenue ,'')}`,
      per: 'VND',
      icon: <Money size={46} />,
      bnb: "bnb3",
    },
  ];
  // const newest = [
  //   {
  //     avatar: <MinusOutlined style={{ fontSize: 10 }} />,
  //     title: 'Cao Hong Hanh',
  //     description: '27 March 2021, at 12:30 PM',
  //     amount: '- 120,000',
  //     textclass: 'text-light-danger',
  //     amountcolor: 'text-danger',
  //   },
  //   {
  //     avatar: <PlusOutlined style={{ fontSize: 10 }} />,
  //     title: 'Cao Hong Hanh',
  //     description: '27 March 2021, at 04:30 AM',
  //     amount: '+ 200,000',
  //     textclass: 'text-fill',
  //     amountcolor: 'text-success',
  //   }]


  const newest = lastRevenue?.map((item) => ({
    id: item.id,
    avatar: <PlusOutlined style={{ fontSize: 10 }} />,
    title: item.name,
    description: formatDateTime(item.createdAt),
    amount: `+ ${FormatVND(item.amount)}`,
    textclass: 'text-fill',
    amountcolor: 'text-success',
  }));
    
  

  const onChange = (pageNumber) => {
    setPage(pageNumber);
};

const getPagedList = () => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return jobList?.slice(start, end);
};

  const fee = '10,000';

 
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
                  <p className="bnb3" style={{ margin: 0 }}>
                    Phí: <span className="bnb2"> {fee} </span>
                  </p>
                  <Edit size={17} />
                </Space>
              }
            >
              <LineChart revenue={revenue}/>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24'>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách công việc"

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
                  total={totalPosts}
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
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='timeline-box'>
                <Title level={5}>Giao dịch gần đây</Title>
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
