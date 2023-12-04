import { Row, Col, Card, Radio, notification, Pagination, Empty, Input } from 'antd';
import ApplicationItem from '../components/Application/ApplicationItem';
import { useEffect, useState } from 'react';
import { get } from 'utils/APICaller';
import { SearchOutlined } from '@ant-design/icons';


function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    sortedJobList.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
  } else if (sortOption === 'sent') {
    sortedJobList = sortedJobList.filter(item => item.status === 'sent');
    sortedJobList.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
  } else if (sortOption === 'interview') {
    sortedJobList = sortedJobList.filter(item => item.status === 'interview');
    sortedJobList.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
  } else if (sortOption === 'approved') {
    sortedJobList = sortedJobList.filter(item => item.status === 'approved');
    sortedJobList.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
  } else if (sortOption === 'declined') {
    sortedJobList = sortedJobList.filter(item => item.status === 'declined');
    sortedJobList.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate));
  }

  const filteredData = sortedJobList?.filter((item) =>
    item.jobs.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getPagedList = () => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filteredData?.slice(start, end);
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
                  <div className='header-control' style={{marginBottom: 10}}>
                    <Input
                      className='header-search'
                      placeholder='Tìm kiếm theo tên'
                      prefix={<SearchOutlined />}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
                {getPagedList().length === 0 || getPagedList() === null ? (
                  <Col span={24}>
                    <Empty description={<span>Dữ liệu trống</span>} />
                  </Col>
                ) : (getPagedList()?.map((application) => { return <Col span={24} key={application.id}><ApplicationItem application={application} /></Col> }))}
                <Col span={24}>
                <Pagination
                  current={page}
                  total={getPagedList().length}
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
