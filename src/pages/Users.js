import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Button,
  Input,
  Avatar,
  notification,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { get, put, remove } from 'utils/APICaller';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const { Title } = Typography;

function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    get({ endpoint: `/accounts/` })
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => { });
  }, [dataUser]);

  const handleClick = (id, status) => {
    if (status) {
      remove({ endpoint: `/accounts/profile/${id}` })
        .then((res) => {
          notification.success({
            message: 'Tài khoản đã bị khoá',
          });
        })
        .catch((error) => {
          notification.error({
            message: 'Có lỗi xảy ra trong quá trình xoá',
          });
        });
    } else {
      put({ endpoint: `/accounts/active/${id}` })
        .then((res) => {
          notification.success({
            message: 'Tài khoản đã được kích hoạt',
          });
        })
        .catch((error) => {
          notification.error({
            message: 'Có lỗi xảy ra! Vui lòng thử lại',
          });
        });
    }
  };

  const filteredData = dataUser?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const accounts = [
    {
      title: 'Người dùng',
      dataIndex: 'image',
      width: '30%',
      ellipsis: true,
      render: (text, record) => {
        return (
          <Avatar.Group key={record.id}>
            <Avatar
              className='shape-avatar'
              shape='square'
              size={40}
              src={record.image}
            ></Avatar>
            <Link to={record.role === 'freelancer' ? '/user/profile-freelancer' : '/user/profile-client'}>
              <div className='avatar-info'>
                <Title level={5}>{record.name}</Title>
                <p>{record.email}</p>
              </div>
            </Link>
          </Avatar.Group>
        );
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'Freelancer',
          value: 'freelancer',
        },
        {
          text: 'Doanh nghiệp',
          value: 'client',
        },
      ],
      onFilter: (value, record) => record.role === value,
      render: (text, record) => {
        if (record.role === 'freelancer') {
          return <span>Freelancer</span>;
        } else if (record.role === 'client') {
          return <span>Doanh nghiệp đối tác</span>;
        } else {
          return text;
        }
      },
    },
    {
      title: 'Thao tác',
      key: 'status',
      render: (text, record) => (
        <Button
          key={record.id}
          type='primary'
          className='tag-primary'
          onClick={() => handleClick(record.id, record.status)}
          danger={record.status}
          style={{
            background: record.status ? '' : '#52c41a',
            border: 'none',
            width: '120px',
          }}
        >
          {record.status ? 'Vô hiệu hoá' : 'Kích hoạt'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]} justify='center'>
          <Col span={24}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              title='Người dùng'
              extra={
                <div className='header-control'>
                  <Input
                    className='header-search'
                    placeholder='Tìm kiếm theo tên'
                    prefix={<SearchOutlined />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              }
            >
              <div className='table-responsive'>
                <Table
                  columns={accounts}
                  dataSource={filteredData}
                  pagination={true}
                  className='ant-border-space'
                />
              </div>
              <div className='uploadfile pb-15 shadow-none'></div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Accounts;