import {
   Row,
   Col,
   Card,
   Descriptions,
   Avatar,
   Typography,
   Radio,
   Pagination,
   Divider,
   Tag
} from "antd";

import ClientJobItem from "./ClientJobItem";
import color from "../../../assets/styles/color";

const { Title, Text } = Typography;
const { Group } = Avatar;

const user = {
   "id": 1,
   "status": true,
   "taxCode": "12312312",
   "companyWebsite": "HongHanh.com",
   "introduction": "introduction hehe",
   "currency": 10000,
   "accountId": 8,
   "accounts": {
      "id": 8,
      "name": "Cao Hong Hanh",
      "phone": "0865644163",
      "email": "hanh@gmail.com",
      "address": "Lầu G, Tòa nhà Jabes 1, số 244 đường Cống Quỳnh, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      "image": "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5",
      "password": "$2b$10$q4dAbAYR5QFTr7rOR1Gg6ek.vhVDctKCZKobNC2LszKIUoMHJ2.qy",
      "role": "client",
      "status": true
   }
}

function ClientProfile() {
   const onChange = (e) => console.log(`radio checked:${e.target.value}`);

   return (
      <>
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
                              src={user.accounts.image}
                           />
                           <Title level={3} style={{ marginLeft: 10 }}>
                              {user.accounts.name}
                           </Title>
                        </Group>
                        <Col style={{ padding: "10px 20px" }} >
                           <Title level={5} style={{ display: "inline-block" }}>Role: </Title>
                           <Tag color={color.colorPrimary} style={{ marginLeft: "1rem" }}>{user.accounts.role}</Tag>
                        </Col>
                        <Col style={{ padding: 20 }}>
                           <Title level={4}>Introduciton</Title>
                           <Text level={3}>{user.introduction}</Text>
                        </Col>
                     </Col>
                     <Col md={1} xs={0}>
                        <Divider type="vertical" style={{ height: "100%" }} />
                     </Col>
                     <Col md={0} xs={24}>
                        <Divider />
                     </Col>
                     <Col md={8} style={{ padding: 20 }}>
                        <Title level={4}>Client Information</Title>
                        <Descriptions column={1}>
                           <Descriptions.Item label='Email'>
                              {user.accounts.email}
                           </Descriptions.Item>
                           <Descriptions.Item label='Số điện thoại'>
                              {user.accounts.phone}
                           </Descriptions.Item>
                           <Descriptions.Item label='Website'>
                              {user.companyWebsite}
                           </Descriptions.Item>
                           <Descriptions.Item label='Mã số thuế'>
                              {user.taxCode}
                           </Descriptions.Item>
                        </Descriptions>
                        <Descriptions layout="vertical">
                           <Descriptions.Item label='Địa chỉ' layout="vertical">
                              {user.accounts.address}
                           </Descriptions.Item>
                        </Descriptions>
                     </Col>
                  </Row>
               </Card>

               <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title='Posted Jobs'
                  extra={
                     <>
                        <Radio.Group onChange={onChange} defaultValue="all">
                           <Radio.Button value="open">Open</Radio.Button>
                           <Radio.Button value="close">Close</Radio.Button>
                        </Radio.Group>
                     </>
                  }
               >
                  <div className="table-responsive">
                     <ClientJobItem />
                     <ClientJobItem />
                     <ClientJobItem />
                     <ClientJobItem />
                     <ClientJobItem />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                     <Pagination />
                  </div>
                  <div className="uploadfile pb-15 shadow-none">
                  </div>
               </Card>
            </Col>
         </Row >
      </>
   )
}
export default ClientProfile;
