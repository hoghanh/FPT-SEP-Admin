import {
   Row,
   Col,
   List,
   Typography,
   Divider,
   notification,
   Modal,
} from "antd";
import { Clockicon, PaperClipOutlined, Trash } from "../../components/icon/Icon";
import { NavLink } from "react-router-dom";
import { FormatVND, formatDate } from "components/formatter/format";
import { remove } from "utils/APICaller";
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;


const { Title, Text } = Typography;

function JobInformation({jobDetail}) {
   
   const showPropsConfirm = (id) => {
      function removeItem(id) {
        remove({ endpoint: `/job/detail/${id}` })
          .then((res) => {
            notification.success({
              message: 'Xoá bài viết thành công',
            });
            window.location.href = "/job";
         })
          .catch((error) => {
            notification.error({
              message: 'Có lỗi xảy ra trong quá trình xoá',
            });
          });
      }
      confirm({
        title: 'Cảnh báo xóa!',
        icon: <ExclamationCircleFilled />,
        content: 'Bạn chắc chắn muốn xóa bài đăng này?',
        okText: 'Chấp nhận',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() {
          removeItem(id)
        },
      });
    };
   return (
      <>
         <Row>
            <Col sm={{ span: 22 }} >
               <Row justify="space-between">
                  <Col md={24} xl={16}>
                     <Title level={3} style={{ margin: 0 }} className="mb-2">
                        {jobDetail?.title}
                     </Title>
                     <Title level={4} style={{ margin: 0 }}>
                        Bài đăng của: <NavLink to={`/user/profile-client/${jobDetail?.clients.accounts.id}`}>
                           {jobDetail?.clients.accounts.name}
                        </NavLink>
                     </Title>
                  </Col>
                  <Col xs={0} md={0} xl={8} >
                     <Title level={4} style={{ textAlign: "end" }}>
                        {FormatVND(jobDetail?.lowestIncome)} - {FormatVND(jobDetail?.highestIncome)}
                     </Title>
                     <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "flex-end" }}>
                        <Clockicon />
                        <Text style={{ marginLeft: 10 }}>
                           Đăng ngày: {formatDate(jobDetail?.createdAt)}
                        </Text>
                     </div>
                  </Col>
                  <Col md={24} xl={0}>
                     <Title level={4} >
                        {FormatVND(jobDetail?.lowestIncome)} - {FormatVND(jobDetail?.highestIncome)}
                     </Title>
                     <div style={{ display: "flex", flexWrap: "wrap", alignContent: "center" }}>
                        <Clockicon />
                        <Text style={{ marginLeft: 10 }}>
                           Đăng ngày: {formatDate(jobDetail?.createdAt)}
                        </Text>
                     </div>
                  </Col>
               </Row>
            </Col>
            <Col style={{ display: "flex", placeContent: "center", flexWrap: "wrap", cursor: 'pointer' }} xl={2} md={1} onClick={() => showPropsConfirm(jobDetail?.id)}>
               <Trash size={30} />
            </Col>
         </Row>

         <Divider />

         <Row>
            <Col span={24}>
               <Row gutter={[0, 20]}>
                  <Col span={24}>
                     <p className='mb-2' style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: jobDetail?.description }} />
                  </Col>
               </Row>
            </Col>
         </Row>

         <Divider />
         {jobDetail?.fileAttachment ? (
            <>
               <Row>
                  <Col span={24}>
                     <Title level={5}>
                        Tệp tin đính kèm
                     </Title>
                  </Col>
                  <Col span={24} style={{ display: 'flex' }}>
                     <Typography.Link href={jobDetail?.fileAttachment} target="_blank">
                        <PaperClipOutlined />
                        <Text underline={true} >
                           Tệp đính kèm .pdf
                        </Text>
                     </Typography.Link>
                  </Col>
               </Row>

               <Divider />
            </>) : null}

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
                  dataSource={jobDetail?.skills}
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
                        {item.name} - {item.jobskill.level}
                     </List.Item>
                  )}
               />
            </Col>
         </Row>
      </>
   )
};

export default JobInformation;