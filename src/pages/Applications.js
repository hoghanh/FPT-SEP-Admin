import { Row, Col, Card, Radio, Typography } from "antd";

import ApplicationItem from "../components/Application/ApplicationItem";

const { Title, Text } = Typography;

function Applications() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]} justify="center">
          <Col md={24} xl={22}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              bodyStyle={{ marginTop: "10px" }}
              title="Applications"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="Sent">Sent</Radio.Button>
                    <Radio.Button value="interview">Interview</Radio.Button>
                    <Radio.Button value="declined">Declined</Radio.Button>
                    <Radio.Button value="approve">Approve</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <ApplicationItem />
                <ApplicationItem />
              </div>
              <div className="uploadfile pb-15 shadow-none"></div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Applications;
