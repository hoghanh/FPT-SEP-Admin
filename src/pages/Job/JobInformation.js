import {
   Row,
   Col,
   List,
   Typography,
   Divider,
} from "antd";
import { Clockicon, PaperClipOutlined, Trash } from "../../components/icon/Icon";
import { NavLink } from "react-router-dom";

const { Title, Text } = Typography;

const job = {
   "id": 6,
   "title": "Neque porro ui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit 2",
   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum libero leo, volutpat at augue ut, fringilla sagittis arcu. Ut tristique vulputate iaculis. Nullam pellentesque id metus in scelerisque. Nam laoreet urna ante, ut auctor orci faucibus eu. Aenean posuere, sapien at sollicitudin porta, libero augue mattis lorem, non pulvinar augue risus sit amet eros. Sed eu metus nec turpis pulvinar eleifend ac pretium turpis. Donec sit amet neque purus. Donec nec massa id erat tempor ullamcorper ac vitae justo. Nam vel nisl eu arcu fringilla elementum eget sit amet risus. Curabitur at odio nulla. Integer lobortis quam sit amet quam convallis ultricies. Etiam vel dapibus nibh, id tempus neque.",
   "fileAttachment": "",
   "applicationSubmitDeadline": "2023-11-20T12:00:00.000Z",
   "lowestIncome": "500000",
   "highestIncome": "700000",
   "applied": "6",
   "status": "open",
   "createdAt": "2023-08-20T14:40:00.000Z",
   "updatedAt": "2023-10-30T02:04:18.000Z",
   "clientId": 1,
   "subcategories": [
      {
         "name": "Lập trình Ứng Dụng",
         "categories": {
            "name": "Công nghệ và lập trình"
         },
         "jobsubcategory": {
            "jobSubcategoryId": 14,
            "jobId": 6,
            "subcategoryId": 7
         }
      },
      {
         "name": "DevOPs & Clouds",
         "categories": {
            "name": "Công nghệ và lập trình"
         },
         "jobsubcategory": {
            "jobSubcategoryId": 29,
            "jobId": 6,
            "subcategoryId": 13
         }
      }
   ],
   "clients": {
      "id": 1,
      "accounts": {
         "name": "Cao Hong Hanh",
         "image": "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5"
      }
   },
   "skills": [
      {
         "id": 3,
         "name": ".NET Core",
         "description": "description",
         "jobskill": {
            "jobSkillId": 58,
            "level": "Basic",
            "jobId": 6,
            "skillId": 3
         }
      },
      {
         "id": 4,
         "name": "Java 8",
         "description": "description",
         "jobskill": {
            "jobSkillId": 60,
            "level": "Intermediate",
            "jobId": 6,
            "skillId": 4
         }
      },
      {
         "id": 12,
         "name": "Vue.js",
         "description": "description",
         "jobskill": {
            "jobSkillId": 63,
            "level": "Basic",
            "jobId": 6,
            "skillId": 12
         }
      },
      {
         "id": 15,
         "name": "Ember.js",
         "description": "description",
         "jobskill": {
            "jobSkillId": 62,
            "level": "Basic",
            "jobId": 6,
            "skillId": 15
         }
      },
      {
         "id": 24,
         "name": "AJAX",
         "description": "description",
         "jobskill": {
            "jobSkillId": 59,
            "level": "Basic",
            "jobId": 6,
            "skillId": 24
         }
      },
      {
         "id": 31,
         "name": "Bootstrap",
         "description": "description",
         "jobskill": {
            "jobSkillId": 61,
            "level": "Basic",
            "jobId": 6,
            "skillId": 31
         }
      }
   ]
}

const toDate = (string) => {
   const temp = new Date(string);
   return temp.toLocaleDateString()
}

function JobInformation() {
   return (
      <>
         <Row>
            <Col sm={{ span: 22 }} >
               <Row justify="space-between">
                  <Col md={24} xl={16}>
                     <Title level={3} style={{ margin: 0 }}>
                        {job.title}
                     </Title>
                     <Title level={4} style={{ margin: 0 }}>
                        Belong to: <NavLink to="/clientProfile">
                           {job.clients.accounts.name}
                        </NavLink>
                     </Title>
                  </Col>
                  <Col xs={0} md={0} xl={8} >
                     <Title level={4} style={{ textAlign: "end" }}>
                        {job.lowestIncome} VND - {job.highestIncome} VND
                     </Title>
                     <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "flex-end" }}>
                        <Clockicon />
                        <Text style={{ marginLeft: 10 }}>
                           Posted: {toDate(job.createdAt)}
                        </Text>
                     </div>
                  </Col>
                  <Col md={24} xl={0}>
                     <Title level={4} >
                        {job.lowestIncome} VND - {job.highestIncome} VND
                     </Title>
                     <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center" }}>
                        <Clockicon />
                        <Text style={{ marginLeft: 10 }}>
                           Posted: {toDate(job.createdAt)}
                        </Text>
                     </div>
                  </Col>
               </Row>
            </Col>
            <Col style={{ display: "flex", placeContent: "center", flexWrap: "wrap" }} xl={2} md={1}>
               <Trash size={30} />
            </Col>
         </Row>

         <Divider />

         <Row>
            <Col span={24}>
               <Row gutter={[0, 20]}>
                  <Col span={24}>
                     <Text>{job.description}</Text>
                  </Col>
               </Row>
            </Col>
         </Row>

         <Divider />

         <Row>
            <Col span={24}>
               <Title level={5}>
                  Tệp tin đính kèm
               </Title>
            </Col>
            <Col span={24} style={{ display: 'flex' }}>
               <PaperClipOutlined />
               <Text underline={true} >
                  fileAttachment.pdf
               </Text>
            </Col>
         </Row>

         <Divider />

         <Row gutter={[0, 10]}>
            <Col span={24}>
               <Title level={5} style={{ margin: 0 }}>
                  Yêu cầu kỹ năng
               </Title>
            </Col>
            <Col span={24}>
               <List
                  grid={{
                     gutter: 15,
                  }}
                  dataSource={job.skills}
                  renderItem={(item, index) => (
                     <List.Item
                        key={index}
                        style={{
                           fontWeight: 700,
                           fontSize: 14,
                           padding: '5px 10px',
                           backgroundColor: "#89DBE9",
                           borderRadius: 25,
                           whiteSpace: 'nowrap',
                        }}
                     >
                        {item.name}
                     </List.Item>
                  )}
               />
            </Col>
         </Row>
      </>
   )
};

export default JobInformation;