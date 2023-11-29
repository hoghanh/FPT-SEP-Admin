import { NavLink } from 'react-router-dom';
import { Typography, Avatar, notification, Modal } from 'antd';
import { Trash } from '../icon/Icon';
import { FileTextFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { CalculateDaysLeft, formatDate } from 'components/formatter/format';
import { remove } from 'utils/APICaller';

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
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            expandable: false,
          }}
        >
          {data?.description}
        </Typography.Paragraph>
        <Title level={5} style={{ margin: '5px 0' }}>
          {data?.applied !== null ? data?.applied : '0'} đã ứng tuyển <FileTextFilled />
        </Title>
      </div>
    </>
  );
}

export default JobItem;
