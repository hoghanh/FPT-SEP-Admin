import { Row, Col, Card, Radio } from 'antd';

import ApplicationItem from '../components/Application/ApplicationItem';

function Applications() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue='all'>
                    <Radio.Button value='Sent'>Đã gửi</Radio.Button>
                    <Radio.Button value='interview'>Phỏng vấn</Radio.Button>
                    <Radio.Button value='declined'>Đã từ chối</Radio.Button>
                    <Radio.Button value='approve'>Đã tuyển</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className='table-responsive'>
                <ApplicationItem />
                <ApplicationItem />
              </div>
              <div className='uploadfile pb-15 shadow-none'></div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Applications;
