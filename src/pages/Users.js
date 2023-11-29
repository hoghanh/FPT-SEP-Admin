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
  Modal,
} from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { get, put, remove } from 'utils/APICaller';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';


const { Title } = Typography;
const { confirm } = Modal;

function Accounts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    get({ endpoint: `/accounts/` })
      .then((res) => {
        setDataUser(res.data);
        setFlag(true);
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
  }, [flag]);

  const handleClick = (id, status) => {
    if (status) {
      confirm({
        title: 'Cảnh báo!',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn chắc chắn muốn khóa tài khoản này?',
        okText: 'Khóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() { removeItem(id) },
      });
      function removeItem(id) {
        remove({ endpoint: `/accounts/profile/${id}` })
          .then((res) => {
            notification.success({
              message: res.data,
            });
            setFlag(false);
          })
          .catch((error) => {
            notification.error({
              message: 'Có lỗi xảy ra trong quá trình khóa',
            });
          });
      }
    } else {
      confirm({
        title: 'Cảnh báo!',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn chắc chắn muốn kích hoạt tài khoản này?',
        okText: 'Kích hoạt',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() { activeItem(id) },
      });
      function activeItem(id) {
        put({ endpoint: `/accounts/active/${id}` })
          .then((res) => {
            notification.success({
              message: res.data,
            });
            setFlag(false);
          })
          .catch((error) => {
            notification.error({
              message: 'Có lỗi xảy ra! Vui lòng thử lại',
            });
          });
      }
    };
  }

  const filteredData = dataUser?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const freelancer = [
    {
      title: 'Người dùng',
      dataIndex: 'image',
      key: 'image',
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
            <Link to={record.role === 'freelancer' ? `/user/profile-freelancer/${record.id}` : `/user/profile-client/${record.id}`}>
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
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
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
          return <span key={record.id}>Freelancer</span>;
        } else if (record.role === 'client') {
          return <span key={record.id}>Doanh nghiệp đối tác</span>;
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
                  rowKey={(record) => record.id}
                  columns={freelancer}
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