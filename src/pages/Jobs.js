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
   const [sortOption, setSortOption] = useState('all');
   const today = new Date();


   useEffect(() => {
      get({ endpoint: `/job` })
      .then((res) => {
        setJobList(res.data.jobs);
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

  let sortedJobList = [...jobList];

  if (sortOption === 'all') {
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'open') {
   const list = [];
   for (const job of jobList) {
      const applicationSubmitDeadline = new Date(job.applicationSubmitDeadline);
      if (applicationSubmitDeadline > today) {
         list.push(job);
      }
    }
    sortedJobList = list
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } else if (sortOption === 'close') {
   const list = [];
   for (const job of jobList) {
      const applicationSubmitDeadline = new Date(job.applicationSubmitDeadline);
      if (applicationSubmitDeadline < today) {
         list.push(job);
      }
    }
    sortedJobList = list
    sortedJobList.sort((a, b) => new Date(a.sentDate) - new Date(b.sentDate));
  } 

  const getPagedList = () => {
   const start = (page - 1) * limit;
   const end = start + limit;
   return sortedJobList?.slice(start, end);
 };

   
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
                           <Radio.Group onChange={onChangeOption} defaultValue="all">
                              <Radio.Button value="all">Tất cả</Radio.Button>
                              <Radio.Button value="open">Còn hạn</Radio.Button>
                              <Radio.Button value="close">Hết hạn</Radio.Button>
                           </Radio.Group>
                        </>
                     }
                  >
                     <div className="table-responsive">
                        {
                           getPagedList().map((jobItem, id) => {
                              return (<JobItem key={id} data={jobItem} />)
                           })
                        }
                     </div>
                     <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                        <Pagination
                           current={page}
                           total={sortedJobList.length}
                           onChange={onChange}
                           pageSize={limit}
                           showSizeChanger={false}
                           style={{ padding: 20, display: "flex", justifyContent: "center" }}
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