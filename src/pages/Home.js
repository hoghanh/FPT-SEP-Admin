import { useState } from 'react';

import { Card, Col, Row, Typography, List, Avatar, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';

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

function Home() {
  const { Title, Text } = Typography;
  const count = [
    {
      today: 'Tổng bài đăng',
      title: '105',
      icon: <ListItem />,
    },
    {
      today: 'Total Users',
      title: '45',
      icon: <User color='#fff' />,
    },
    {
      today: 'Tổng đơn ứng tuyển',
      title: '235',
      icon: <Documents color='#fff' />,
    },
    {
      today: 'Doanh thu',
      title: '130,000',
      persent: 'VND',
      icon: <Money size={46} />,
      bnb: "bnb3",
    },
  ];

  const newest = [
    {
      avatar: <MinusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 12:30 PM',
      amount: '- 120,000',
      textclass: 'text-light-danger',
      amountcolor: 'text-danger',
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 04:30 AM',
      amount: '+ 200,000',
      textclass: 'text-fill',
      amountcolor: 'text-success',
    },
    {
      avatar: <MinusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 12:30 PM',
      amount: '- 120,000',
      textclass: 'text-light-danger',
      amountcolor: 'text-danger',
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 04:30 AM',
      amount: '+ 200,000',
      textclass: 'text-fill',
      amountcolor: 'text-success',
    },
    {
      avatar: <MinusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 12:30 PM',
      amount: '- 120,000',
      textclass: 'text-light-danger',
      amountcolor: 'text-danger',
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Cao Hong Hanh',
      description: '27 March 2021, at 04:30 AM',
      amount: '+ 200,000',
      textclass: 'text-fill',
      amountcolor: 'text-success',
    },
  ];

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
                        {c.title} <small className={c.bnb}>{c.persent}</small>
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
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <StackedBarChart />
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
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24'>
            <Card bordered={false} className='criclebox cardbody h-full'>
              <div className='project-ant'>
                <div>
                  <Title level={5}>Danh sách công việc</Title>
                  <Paragraph className='lastweek'>
                    Ứng tuyển nhiều nhất
                  </Paragraph>
                </div>
              </div>
              <div className='ant-list-box table-responsive'>
                <JobItem />
                <JobItem />
                <JobItem />
                <JobItem />
              </div>
              <div className='uploadfile shadow-none'>
                {/* <Upload {...uploadProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    <span className="click">Click to Upload</span>
                  </Button>
                </Upload> */}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <div className='timeline-box'>
                <Title level={5}>Giao dịch</Title>
                <Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                  Tháng này
                </Paragraph>
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
