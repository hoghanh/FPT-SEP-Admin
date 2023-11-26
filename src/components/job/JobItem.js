import { NavLink } from 'react-router-dom';
import { Typography, Avatar, notification } from 'antd';
import { Trash } from '../icon/Icon';
import { FileTextFilled } from '@ant-design/icons';
import { CalculateDaysLeft, formatDate } from 'components/formatter/format';
import { remove } from 'utils/APICaller';

const { Title, Text } = Typography;
const { Group } = Avatar;
const face2 =
  'https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Fapricot.jpg?alt=media&token=bb762da7-2a30-4b81-be24-a7ec528f45d5';

function JobItem({ data }) {
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
            <NavLink to='/clientProfile'>
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
            <NavLink to='/jobDetail'>
              <Title style={{ margin: 0 }} level={5}>
                {data?.title}
              </Title>
            </NavLink>
          </div>
          <div onClick={() => removeItem(data?.id)}>
            <Trash  />
          </div>
        </div>
        <Text level={4}>
          Ngày đăng: {formatDate(data?.createdAt)} -{' '}
          {CalculateDaysLeft(data?.applicationSubmitDeadline)}
        </Text>
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expandable: false,
          }}
        >
          {data?.description}
        </Typography.Paragraph>
        <Title level={5} style={{ margin: '5px 0' }}>
          {data?.applied} đã ứng tuyển <FileTextFilled />
        </Title>
      </div>
    </>
  );
}

export default JobItem;
