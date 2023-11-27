import {
   Row,
   Col,
   Card,
   Radio,
   Pagination,
   notification,
} from "antd";
import { useEffect, useState } from "react";
import { get } from "utils/APICaller";

import JobItem from "../components/job/JobItem";

function Jobs() {
   const [limit, setLimit] = useState(10);
   const [page, setPage] = useState(1);
   const [jobList, setJobList] = useState([]);
   const [pagination, setPagination] = useState(0);

   const onChange = (pageNumber) => {
        setPage(pageNumber);
    };

   useEffect(() => {
      get({ endpoint: `/job?limit=${limit}&page=${page}` })
      .then((res) => {
        setJobList(res.data.jobs);
        setPagination(res.data.pagination);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
    }, [page]);
   
   return (
      <>
         <div className="tabled">
            <Row gutter={[24, 0]} justify="center">
               <Col md={24} xl={22}
                  style={{ width: "100%" }}
               >
                  <Card
                     bordered={false}
                     className="criclebox tablespace mb-24"
                     title="Danh sách công việc"
                     extra={
                        <>
                           <Radio.Group onChange={onChange} defaultValue="all">
                              <Radio.Button value="open">Open</Radio.Button>
                              <Radio.Button value="close">Close</Radio.Button>
                           </Radio.Group>
                        </>
                     }
                  >
                     <div className="table-responsive">
                        {
                           jobList.map((jobItem, id) => {
                              return (<JobItem key={id} data={jobItem} />)
                           })
                        }
                     </div>
                     <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                     <Pagination
                        current={pagination?.currentPage}
                        total={pagination?.totalItems}
                        onChange={onChange}
                        showSizeChanger={false}
                        style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
                     />
                     </div>
                     <div className="uploadfile pb-15 shadow-none">
                     </div>
                  </Card>
               </Col>
            </Row>
         </div >
      </>
   );
}

export default Jobs;