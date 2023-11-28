import { Row, Col, Card, Radio, notification, Pagination } from 'antd';
import ApplicationItem from '../components/Application/ApplicationItem';
import { useEffect, useState } from 'react';
import { get } from 'utils/APICaller';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    get({ endpoint: `/application/` })
      .then((res) => {
        const data = res.data;
        setApplications(data.rows)
        setTotalApplications(data.count);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const getPagedList = () => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return applications?.slice(start, end);
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
              title='Đơn Ứng tuyển'
              // extra={
              //   <>
              //     <Radio.Group onChange={onChange} defaultValue='all'>
              //       <Radio.Button value='sent'>Đã gửi</Radio.Button>
              //       <Radio.Button value='interview'>Phỏng vấn</Radio.Button>
              //       <Radio.Button value='declined'>Đã từ chối</Radio.Button>
              //       <Radio.Button value='approve'>Đã tuyển</Radio.Button>
              //     </Radio.Group>
              //   </>
              // }
            >
              <Row style={{ width: '100%' }}>
                {getPagedList()?.map((application) => { return <Col span={24} key={application.id}><ApplicationItem application={application} /></Col> })}
                <Col span={24}>
                <Pagination
                  current={page}
                  total={totalApplications}
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
