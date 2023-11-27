import {
  Card,
  Col,
  Row,
  Typography,
  Avatar,
  Table,
  Space,
  notification
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

import {
  Money,
  Transactions,
  Deposit,
  Calender,
  Edit,
} from "../components/icon/Icon";
import LineChart from "../components/chart/LineChart";
import { useEffect, useState } from "react";
import { get } from "utils/APICaller";
import { FormatVND } from "components/formatter/format";

const { Title } = Typography;


const payments = [
  {
    "id": 1,
    "name": "VNP14136772",
    "description": "Thanh+toan+cho+ma+GD%3A09161839",
    "amount": 10000,
    "type": "-",
    "status": "1",
    "orderId": "24130914",
    "transDate": "20231024131004",
    "transType": "02",
    "createdAt": "2023-11-14T12:53:05.000Z",
    "updatedAt": "2023-11-14T12:53:07.000Z",
    "clientId": 1
  },
  {
    "id": 2,
    "name": "VNP14136772",
    "description": "Thanh+toan+cho+ma+GD%3A09161839",
    "amount": 10000,
    "type": "+",
    "status": "1",
    "orderId": "24130914",
    "transDate": "20231024131004",
    "transType": "02",
    "createdAt": "2023-11-14T12:53:18.000Z",
    "updatedAt": "2023-11-14T12:53:18.000Z",
    "clientId": 1
  },
  {
    "id": 3,
    "name": "VNP14136772",
    "description": "Thanh+toan+cho+ma+GD%3A09161839",
    "amount": 10000,
    "type": "+",
    "status": "1",
    "orderId": "24130914",
    "transDate": "20231024131004",
    "transType": "02",
    "createdAt": "2023-11-14T12:54:28.000Z",
    "updatedAt": "2023-11-14T12:54:30.000Z",
    "clientId": 1
  }
]

const columns = [
  {
    title: 'Loại',
    dataIndex: "type",
    key: "type",
    render: (type) => type === "+" ?
      <Avatar size="small" className="text-fill">
        <PlusOutlined />
      </Avatar>
      :
      <Avatar size="small" className="text-light-danger">
        <MinusOutlined />
      </Avatar>
  },
  {
    title: 'Ngày giao dịch',
    dataIndex: "createdAt",
    sorter: (a, b) => new Date(b.date) - new Date(a.date),
  },
  {
    title: 'Chi tiết',
    dataIndex: "description",
  },
  {
    title: 'Biến động',
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Người dùng',
    dataIndex: "clientId",
  }
];

const fee = '10,000';

function Billing() {
  const [revenue, setRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [amountRevenue, setAmountRevenue] = useState(0);
  const [deposit, setDeposit] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [amountDeposit, setAmountDeposit] = useState(0);

  useEffect(() => {
    get({ endpoint: `/payment/revenue` })
      .then((res) => {
        const data = res.data;
        setRevenue(data.payments)
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
        setRevenue(data.payments)
        setTotalDeposit(data.deposit);
        setAmountDeposit(data.total)

      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);


  
const count = [
  {
    today: 'Tổng giao dịch',
    title: `${amountRevenue}`,
    icon: <Transactions size={46} />,
  },
  {
    today: 'Tổng doanh Thu',
    title: `${FormatVND(totalRevenue ,'')}`,
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
    title: `${FormatVND(totalDeposit ,'')}`,
    persent: 'VND',
    icon: <Money size={46} />,
    bnb: 'bnb3',
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
                  <p className="bnb3" style={{ margin: 0 }}>
                    Phí: <span className="bnb2"> {fee} </span>
                  </p>
                  <Edit size={17} />
                </Space>
              }
            >
              <LineChart revenue={revenue} />
            </Card>
          </Col>
        </Row>

        <div className="tabled">
          <Row gutter={[24, 0]} justify="center">
            <Col span={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Các Giao dịch"
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={payments}
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