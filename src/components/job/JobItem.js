import { NavLink } from 'react-router-dom';
import { Typography, Avatar } from "antd";
import { Trash } from "../icon/Icon";
import { FileTextFilled } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Group } = Avatar
const face2 = "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5"

function JobItem() {
   return (
      <>
         <div
            style={{
               padding: '10px 10px',
               alignItems: 'center',
               borderBottom: '1px solid #f0f0f0',
            }}
         >
            <div
               style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 15,
               }}
            >
               <div>
                  <NavLink
                     to="/clientProfile"
                  >
                     <Group
                        style={{ display: "flex" }}
                     >
                        <Avatar
                           className="shape-avatar"
                           size={40}
                           src={face2}
                        ></Avatar>
                        <div className="avatar-info">
                           <Title level={4}>Cao Hong Hanh</Title>
                        </div>
                     </Group>
                  </NavLink>
                  <NavLink
                     to="/jobDetail"
                  >
                     <Title style={{ margin: 0 }} level={5}>
                        Javascript expert with Next.js and React.js expertise
                     </Title>
                  </NavLink>
               </div>
               <Trash />
            </div>
            <Text level={4}>
               Ngày đăng: 09/11/2023 - 5 ngày còn lại
            </Text>
            <Title level={5} style={{ margin: "5px 0" }} >
               4 applied <FileTextFilled />
            </Title>
         </div>
      </>
   );
};

export default JobItem;