import { Row, Col, Card, Radio, notification, Pagination } from 'antd';
import ApplicationItem from '../components/Application/ApplicationItem';
import { useEffect, useState } from 'react';
import { get } from 'utils/APICaller';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('all');

  useEffect(() => {
    get({ endpoint: `/application/` })
      .then((res) => {
        const data = res.data;
        setApplications(data.rows)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, [page]);

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onChangeOption = (e) => {
    setPage(1);
    setSortOption(e.target.value);
  };

  let sortedJobList = [...applications];

  if (sortOption === 'all') {
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'sent') {
    sortedJobList = sortedJobList.filter(item => item.status === 'sent');
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'interview') {
    sortedJobList = sortedJobList.filter(item => item.status === 'interview');
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'approved') {
    sortedJobList = sortedJobList.filter(item => item.status === 'approved');
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'declined') {
    sortedJobList = sortedJobList.filter(item => item.status === 'declined');
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  }
  

  const getPagedList = () => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return sortedJobList?.slice(start, end);
  };


  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]} justify='center'>
          <Col md={24} xl={22}>
            <Card
              bordered={false}
              className='criclebox tablespace mb-24'
              bodyStyle={{ marginTop: '10px' }}
              title='Đơn ứng tuyển'
              extra={
                <>
                  <Radio.Group onChange={onChangeOption} defaultValue='all'>
                    <Radio.Button value='all'>Tất cả</Radio.Button>
                    <Radio.Button value='sent'>Đã gửi</Radio.Button>
                    <Radio.Button value='interview'>Phỏng vấn</Radio.Button>
                    <Radio.Button value='approved'>Nhận việc</Radio.Button>
                    <Radio.Button value='declined'>Từ chối</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <Row style={{ width: '100%' }}>
                {getPagedList()?.map((application) => { return <Col span={24} key={application.id}><ApplicationItem application={application} /></Col> })}
                <Col span={24}>
                <Pagination
                  current={page}
                  total={sortedJobList.length}
                  onChange={onChange}
                  pageSize={limit}
                  showSizeChanger={false}
                  style={{ padding: 20, display: "flex", justifyContent: "center" }}
                />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Applications;
