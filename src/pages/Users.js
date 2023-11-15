import {
   Row,
   Col,
   Card,
   Table,
   Typography,
   Button,
   Input,
   Avatar,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";

// import { ToTopOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

const { Title } = Typography;

const accounts = [
   {
      title: "User",
      dataIndex: "avatar",
      width: "30%",
      ellipsis: true,
   },
   {
      title: "PHONE",
      dataIndex: "phone",
   },
   {
      title: "ADDRESS",
      dataIndex: "address",
      ellipsis: true,
   },
   {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      filters: [
         {
            text: 'Freelancer',
            value: 'freelancer',
         },
         {
            text: 'Client',
            value: 'client',
         },
      ],
      onFilter: (value, record) => record.role === value,
   },
   {
      title: "",
      dataIndex: "button",
   }
];

const data = [
   {
      "id": 8,
      "name": "Cao Hong Hanh",
      "phone": "0865644163",
      "email": "hanh@gmail.com",
      "address": "123 Le Van Vietttt",
      "image": "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5",
      "password": "$2b$10$q4dAbAYR5QFTr7rOR1Gg6ek.vhVDctKCZKobNC2LszKIUoMHJ2.qy",
      "role": "client",
      "status": true,
      "createdAt": "2023-08-25T00:41:32.000Z",
      "updatedAt": "2023-10-18T15:29:55.000Z"
   },
   {
      "id": 25,
      "name": "aabb",
      "phone": "",
      "email": "1@hah.com",
      "address": "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
      "image": "",
      "password": "$2b$10$h/.fYuRf31ptzI9NZqoHD.dNcUcqE8.q.tbQ4LB9eQtnm85LKxCN.",
      "role": "client",
      "status": true,
      "createdAt": "2023-08-29T06:01:27.000Z",
      "updatedAt": "2023-08-29T06:01:27.000Z"
   },
   {
      "id": 26,
      "name": "jhjhjh",
      "phone": "",
      "email": "123@bn.aa",
      "address": "",
      "image": "",
      "password": "$10$YsAZFpJXgoj9xab.T3ADn.ZtJAeF7HGlbRm7Gtf5LUCUJD3hPdOZu",
      "role": "client",
      "status": true,
      "createdAt": "2023-08-29T06:03:35.000Z",
      "updatedAt": "2023-10-17T12:58:00.000Z"
   },
   {
      "id": 28,
      "name": "Vu Duc Anh",
      "phone": "01234567890",
      "email": "ducanh@gmail.com",
      "address": "123 Le Van Viet",
      "image": "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg",
      "password": "$2b$10$NaGoDpoWlbF8gd9HAME/8eHw1URQf3CAUkeQbashZMtYYmbUINcLi",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-01T09:58:20.000Z",
      "updatedAt": "2023-10-17T13:27:45.000Z"
   },
   {
      "id": 29,
      "name": "FPT",
      "phone": "",
      "email": "tuanpham.25201@gmail.com",
      "address": "",
      "image": "",
      "password": "$2b$10$XAEza5qgvVvy./UiQ8AJ4eI6Sb2LWCRUg0KsayeajbNLuSESG/OSa",
      "role": "client",
      "status": false,
      "createdAt": "2023-09-02T14:16:09.000Z",
      "updatedAt": "2023-09-02T14:16:09.000Z"
   },
   {
      "id": 30,
      "name": "Foddy",
      "phone": "",
      "email": "foody@gmail.com",
      "address": "",
      "image": "",
      "password": "$2b$10$rxAguWOTKTRQGv0.yzURI.ylfE9oluE/yHxm.bYIiJzOD7LsWg6lS",
      "role": "client",
      "status": false,
      "createdAt": "2023-09-04T03:17:29.000Z",
      "updatedAt": "2023-09-04T03:17:29.000Z"
   },
   {
      "id": 31,
      "name": "Vietcetera",
      "phone": "",
      "email": "vietcetera@gmail.com",
      "address": "",
      "image": "",
      "password": "$2b$10$UGt9/dc8TNLIJx.OE1BMNeAxv7hbJtyPNpoSIY1C4qFWs494gTyIm",
      "role": "client",
      "status": true,
      "createdAt": "2023-09-04T03:20:00.000Z",
      "updatedAt": "2023-09-04T03:20:00.000Z"
   },
   {
      "id": 32,
      "name": "Loship",
      "phone": "",
      "email": "loship@gmail.com",
      "address": "",
      "image": "",
      "password": "$2b$10$20FwGJuzDERKetfCYQa5ieSkCM5Ej.9jXXwll2kUS/NVqYjLyn0vi",
      "role": "client",
      "status": true,
      "createdAt": "2023-09-04T03:21:09.000Z",
      "updatedAt": "2023-10-18T01:44:52.000Z"
   },
   {
      "id": 33,
      "name": "Do Duy Anh (K16_HCM)",
      "phone": "",
      "email": "anhddse161412@fpt.edu.vn",
      "address": "",
      "image": "https://lh3.googleusercontent.com/a/AAcHTte0JdAYHAFSioCLXruXE_OPbd3HkPMOyc_bJz7C0cp4=s96-c",
      "password": "$2b$10$heD/f6QE7YP8gGLYf4Ix1upwFo3Ij51HMnx9atfIMYksdpSe5QFLi",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-07T19:50:10.000Z",
      "updatedAt": "2023-09-07T19:50:10.000Z"
   },
   {
      "id": 34,
      "name": "Cao Hong Hanh (K15 HCM)",
      "phone": "",
      "email": "hanhchse150754@fpt.edu.vn",
      "address": "",
      "image": "https://lh3.googleusercontent.com/a/AAcHTtcsa8YboLBRjEUmUrCXhhOO2jMIKp97R5TpKsfcAYkVl2Q=s96-c",
      "password": "$2b$10$tNCe.x2yYSx4il4pHwMzdeF1OaiIdMoyU4X41xg2Uw.zXKKfbMR/K",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-08T00:24:55.000Z",
      "updatedAt": "2023-09-08T00:24:55.000Z"
   },
   {
      "id": 35,
      "name": "ship123",
      "phone": "",
      "email": "ship123@gmail.com",
      "address": "",
      "image": "",
      "password": "$2b$10$ebS5stkZL8yPNBqlvENToeGvUWmYoHrfER.o6zOQwRxUeUUI.FbUK",
      "role": "client",
      "status": true,
      "createdAt": "2023-09-08T14:11:04.000Z",
      "updatedAt": "2023-09-08T14:11:04.000Z"
   },
   {
      "id": 36,
      "name": "Vu Duc Anh (K16_HCM)",
      "phone": "",
      "email": "anhvdse161410@fpt.edu.vn",
      "address": "",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocJgNu0hN2yS-0rqD2D5rkIXXgvDe3RPvFk7Lurcir6rQEI=s96-c",
      "password": "$2b$10$Z/IQLnTxlKlwGbcN5pTO3uTwoKYJMz3T01qaWUNoPst2P31yfQy6y",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-12T09:52:42.000Z",
      "updatedAt": "2023-09-12T09:52:42.000Z"
   },
   {
      "id": 37,
      "name": "DucAnh",
      "phone": "0123456780",
      "email": "ducanh@gmail.com",
      "address": "123 Le Vam Viet",
      "image": "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg",
      "password": "$2b$10$pdk40bOCLgPAllrZAAA1w.NmO8AhGgQEohBEuBwMcabwRdYZx5NCu",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-15T03:05:07.000Z",
      "updatedAt": "2023-09-28T16:14:04.000Z"
   },
   {
      "id": 38,
      "name": "Nguyễn Hữu Phạm Tuân",
      "phone": "0865644165",
      "email": "tuannhpse150570@fpt.edu.vn",
      "address": "458 Tân Lập",
      "image": "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl\=1",
      "password": "$2b$10$kjLs.Z.orX0eo0.Fmh5A1uL6xCRTOg6RU/HmF/iEioFyU6yFqfE/O",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-29T00:19:47.000Z",
      "updatedAt": "2023-11-01T07:27:33.000Z"
   },
   {
      "id": 39,
      "name": "tester",
      "phone": "123",
      "email": "shironekoyuun@gmail.com",
      "address": "not thing here",
      "image": null,
      "password": "$2b$10$TY3.H0kGg/SQ2/7rsK/b6ehwawPsxvbNEduSKZEQ4BuBtx5H9CtDq",
      "role": "freelancer",
      "status": true,
      "createdAt": "2023-09-29T00:19:47.000Z",
      "updatedAt": "2023-10-15T15:07:11.000Z"
   }
];

const DeactiveButton = ({ status }) => {
   if (status === false) {
      return (
         <Button type="primary" className="tag-primary">
            Activate
         </Button>
      )
   } else {
      return (
         <Button type="primary" className="tag-primary">
            Deactivate
         </Button>
      )
   }
};

const UserAvatar = ({ user }) => {
   return (
      <>
         <Avatar.Group>
            <Avatar
               className="shape-avatar"
               shape="square"
               size={40}
               src={user.image}
            ></Avatar>
            <div className="avatar-info">
               <Title level={5}>{user.name}</Title>
               <p>{user.email}</p>
            </div>
         </Avatar.Group>{" "}
      </>
   )
}

data.forEach(account => {
   account.button = (<DeactiveButton status={account.status} />)
   account.avatar = (<UserAvatar user={account} />)
})

function Accounts() {

   return (
      <>
         <div className="tabled">
            <Row gutter={[24, 0]} justify="center">
               <Col span={24}>
                  <Card
                     bordered={false}
                     className="criclebox tablespace mb-24"
                     title="Users"
                     extra={
                        <div className="header-control">
                           <Input
                              className="header-search"
                              placeholder="Type here..."
                              prefix={<SearchOutlined />}
                           />
                        </div>
                     }
                  >
                     <div className="table-responsive">
                        <Table
                           columns={accounts}
                           dataSource={data}
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
      </>
   );
}

export default Accounts;