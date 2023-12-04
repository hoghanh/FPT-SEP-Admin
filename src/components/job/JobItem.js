import { NavLink } from 'react-router-dom';
import { Typography, Avatar, notification, Modal } from 'antd';
import { Trash } from '../icon/Icon';
import { FileTextFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { CalculateDaysLeft, formatDate } from 'components/formatter/format';
import { remove } from 'utils/APICaller';
import { useState } from 'react';

const { confirm } = Modal;
const { Title, Text } = Typography;
const { Group } = Avatar;

const showPropsConfirm = (id) => {
  function removeItem(id) {
    remove({ endpoint: `/job/detail/${id}` })
      .then((res) => {
        notification.success({
          message: 'Xoá bài viết thành công',
        });
        window.location.reload()
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

function JobItem({ data }) {
  const [isTruncated, setIsTruncated] = useState(true);
   const text = data?.description;
   const resultString = isTruncated ? text.slice(0, 400) : text;
  return (
    <>
      <div
        style={{
          padding: '10px 10px',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
        key={data?.id}
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
            <NavLink to={`/user/profile-client/${data?.clients?.accounts.id}`}>
              <Group style={{ display: 'flex' }}>
                <Avatar
                  className='shape-avatar'
                  size={40}
                  src={data?.clients?.accounts?.image}
                ></Avatar>
                <div className='avatar-info'>
                  <Title level={4}>{data?.clients?.accounts?.name}</Title>
                </div>
              </Group>
            </NavLink>
            <NavLink to={`/job/job-detail/${data?.id}`}>
              <Title style={{ margin: 0 }} level={5}>
                {data?.title}
              </Title>
            </NavLink>
          </div>
          <div style={{cursor: 'pointer'}} onClick={() => showPropsConfirm(data?.id)}>
            <Trash />
          </div>
        </div>
        <Text level={4}>
          Ngày đăng: {formatDate(data?.createdAt)} -{' '}
          {CalculateDaysLeft(data?.applicationSubmitDeadline)}
        </Text>
        <Typography.Paragraph className='mb-2' style={{ margin: 0 }}>
          {resultString} {text.length > 400 && (
            <span style={{ color: '#40a9ff', cursor: 'pointer', fontWeight:'bold' }} onClick={() => setIsTruncated(!isTruncated)}>
              {isTruncated ? 'xem thêm' : null}
            </span>
          )}
        </Typography.Paragraph>
        <Title level={5} style={{ margin: '5px 0' }}>
          {data?.applied === null || data?.applied === "" ? '0' : data?.applied} đã ứng tuyển <FileTextFilled />
        </Title>
      </div>
    </>
  );
}

export default JobItem;
