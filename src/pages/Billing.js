import {
  Card,
  Col,
  Row,
  Typography,
  Table,
  Space,
  notification,
  Radio,
  Modal, Form, InputNumber, Select, Button
} from "antd";
import {
  Money,
  Transactions,
  Deposit,
  Edit,
} from "../components/icon/Icon";
import LineChart from "../components/chart/LineChart";
import { useEffect, useState } from "react";
import { get, put } from "utils/APICaller";
import { FormatVND, formatDateTime } from "components/formatter/format";

const { Title } = Typography;
const { confirm } = Modal;


function Billing() {
  const [revenue, setRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [amountRevenue, setAmountRevenue] = useState(0);
  const [deposit, setDeposit] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [amountDeposit, setAmountDeposit] = useState(0);
  const [refund, setRefund] = useState([]);
  const [refundApproved, setRefundApproved] = useState([]);
  const [option, setOption] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commissionFee, setCommissionFee] = useState([]);
  const [postingFee, setPostingFee] = useState([]);
  const [flag, setFlag] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    get({ endpoint: `/payment/revenue` })
      .then((res) => {
        const data = res.data;
        setRevenue(data.payments.filter((i) => i.status !== '0'))
        setTotalRevenue(data.revenue);
        setAmountRevenue(data.total)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
    get({ endpoint: `/payment/deposit` })
      .then((res) => {
        const data = res.data;
        setDeposit(data.payments)
        setTotalDeposit(data.deposit);
        setAmountDeposit(data.total)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
      get({ endpoint: `/payment/refund` })
      .then((res) => {
        const data = res.data;
        setRefund(data.payment)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
      get({ endpoint: `/payment/refund/approved` })
      .then((res) => {
        const data = res.data;
        setRefundApproved(data.payment)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);

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
      get({ endpoint: `/payment/refund` })
      .then((res) => {
        const data = res.data;
        setRefund(data.payment)
        setFlag(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
      get({ endpoint: `/payment/refund/approved` })
      .then((res) => {
        const data = res.data;
        setRefundApproved(data.payment)
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

  const handleClick = (id) => {
    confirm({
      title: 'Cảnh báo!',
      content: 'Cho phép rút hết tiền từ tài khoản doanh nghiệp này?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() { acceptItem(id) },
    });
    function acceptItem(id) {
      put({ endpoint: `/payment/refund/approve/${id}` })
        .then((res) => {
          notification.success({
            message: 'rút tiền thành công',
          });
          setFlag(true);
        })
        .catch((error) => {
          notification.error({
            message: error.response.data.message,
          });
        });
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const count = [
    {
      today: 'Tổng giao dịch',
      title: `${amountRevenue}`,
      icon: <Transactions size={46} />,
    },
    {
      today: 'Tổng doanh Thu',
      title: `${FormatVND(totalRevenue, '')}`,
      persent: 'VND',
      icon: <Money size={46} />,
      bnb: 'bnb3',
    },
    {
      today: 'Số lần nạp tiền',
      title: `${amountDeposit}`,
      icon: <Deposit size={38} />,
    },
    {
      today: 'Tổng tiền nạp vào',
      title: `${FormatVND(totalDeposit, '')}`,
      persent: 'VND',
      icon: <Money size={46} />,
      bnb: 'bnb3',
    },
  ];

  const onChange = (e) => {
    setOption(e.target.value);
  };


  const columns = [
    {
      title: 'Ngày giao dịch',
      dataIndex: "createdAt",
      width: '20%',
      fixed: 'left',
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
      render: (_, record) => {
        return <Typography.Paragraph>{formatDateTime(record.createdAt)}</Typography.Paragraph>
      },
    },
    {
      title: 'Tài khoản',
      dataIndex: "clients",
      key: "clients",
      fixed: 'left',
      width: '18%',
      ellipsis: true,
      render: (_, record) => {
        return <Typography.Paragraph>{record.clients?.accounts.name}</Typography.Paragraph>
      },
    },
    {
      title: 'Chi tiết',
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (_, record) => {
        return <Typography.Paragraph>{record?.description}</Typography.Paragraph>
      },
    },
    {
      title: 'Biến động',
      dataIndex: "amount",
      width: '15%',
      fixed: 'right',
      sorter: (a, b) => a.amount - b.amount,
      render: (_, record) => { return <span style={{color: option === 'refund' || option === 'refund-approved' ? 'red' : '#52c41a'}}>{FormatVND(record.amount, '')}</span> }
    },
    {
      title: option === 'refund' ? 'Xử lý': null,
      dataIndex: "amount",
      width: option !== 'refund' ? '0' : '15%',
      fixed: 'right',
      render: (_, record) => { return option === 'refund' ? <Button type="primary" onClick={()=>{handleClick(record.id)}}>Xác nhận</Button> : null }
    },
  ];


  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]} className="mb-24">
          <Col xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={6}
            className="mb-24"
          >
            <Row className="rowgap-vbox" gutter={[24, 0]}>
              {count.map((c, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={24}
                  className="mb-24"
                >
                  <Card bordered={false} className="criclebox ">
                    <div className="number">
                      <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                          <span>{c.today}</span>
                          <Title level={3}>
                            {c.title} <small className={c.bnb}>{c.persent}</small>
                          </Title>
                        </Col>
                        <Col xs={6}>
                          <div className="icon-box">{c.icon}</div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={18}
            className="mb-24"
          >
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
            </Card>
          </Col>
        </Row>

        <div className="tabled">
          <Row gutter={[24, 0]} justify="center">
            <Col span={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Danh sách giao dịch"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="revenue">
                      <Radio.Button value="revenue">Doanh thu</Radio.Button>
                      <Radio.Button value="refund">Yêu cầu rút tiền</Radio.Button>
                      <Radio.Button value="refund-approved">Rút tiền</Radio.Button>
                      <Radio.Button value="deposit">Nạp tiền</Radio.Button>
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={option === 'refund' ? refund : option === 'refund-approved' ? refundApproved : option === 'deposit' ? deposit : revenue}
                    pagination={true}
                    className="ant-border-space"
                  />
                </div>
                <div className="uploadfile pb-15 shadow-none">
                </div>
              </Card>
            </Col>
          </Row>
        </div>

      </div>
    </>
  )
};

export default Billing;