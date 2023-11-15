import {
   Row,
   Col,
   Card,
   Radio,
   Typography,
   Pagination,
} from "antd";

import JobItem from "../components/job/JobItem";

function Jobs() {
   const onChange = (e) => console.log(`radio checked:${e.target.value}`);

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
                     title="jobs"
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
                        <JobItem />
                        <JobItem />
                        <JobItem />
                        <JobItem />
                        <JobItem />
                     </div>
                     <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem" }}>
                        <Pagination />
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