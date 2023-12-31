import {
   Row,
   Col,
   Typography,
   Card,
} from "antd";
import color from "../../assets/styles/color"
import { File } from "../../components/icon/Icon";

const { Title, Text } = Typography;
function JobApplication({ arrayStatus }) {
   return (
      <>
         <Card
            bordered={false}
            bodyStyle={{ padding: 0 }}
            style={{ padding: 20 }}
            className="criclebox tablespace mb-24"
            title={"Thư ứng tuyển"}
         >
            <Row justify={'space-between'} gutter={[40, 40]} style={{ padding: '20px 20px' }}>
               <Col span={24} sm={{ span: 6 }}>
                  <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
                     <Row align={'middle'} gutter={[0, 10]} style={{ flexDirection: 'column' }}>
                        <Col>
                           <File />
                        </Col>
                        <Col>
                           <Typography.Title level={5} style={{ margin: 0, textAlign: 'center' }}>{arrayStatus[0]} Ứng tuyển</Typography.Title>
                        </Col>
                     </Row>
                  </Card>
               </Col>
               <Col span={24} sm={{ span: 6 }}>
                  <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
                     <Row align={'middle'} gutter={[0, 10]} style={{ flexDirection: 'column' }}>
                        <Col>
                           <File />
                        </Col>
                        <Col>
                           <Title level={5} style={{ margin: 0, textAlign: 'center' }}>{arrayStatus[1]} Phỏng vấn</Title>
                        </Col>
                     </Row>
                  </Card>
               </Col>
               <Col span={24} sm={{ span: 6 }}>
                  <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
                     <Row align={'middle'} gutter={[0, 10]} style={{ flexDirection: 'column' }}>
                        <Col>
                           <File />
                        </Col>
                        <Col>
                           <Title level={5} style={{ margin: 0, textAlign: 'center' }}>{arrayStatus[2]} Nhận việc</Title>
                        </Col>
                     </Row>
                  </Card>
               </Col>
               <Col span={24} sm={{ span: 6 }}>
                  <Card style={{ padding: 20, borderRadius: 20, backgroundColor: color.colorLightGray }}>
                     <Row align={'middle'} gutter={[0, 10]} style={{ flexDirection: 'column' }}>
                        <Col>
                           <File />
                        </Col>
                        <Col>
                           <Title level={5} style={{ margin: 0, textAlign: 'center' }}>{arrayStatus[3]} Từ chối</Title>
                        </Col>
                     </Row>
                  </Card>
               </Col>
            </Row>
         </Card>
      </>
   )
};

export default JobApplication;