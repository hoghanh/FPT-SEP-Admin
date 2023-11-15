import { NavLink } from 'react-router-dom';
import { Typography, Divider, Col, Row, Space } from "antd";

const { Title, Text, Paragraph } = Typography;

const Trash = ({ size = 20, color = '#EB4335' }) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox='0 0 25 25'
         fill={color}
         xmlns='http://www.w3.org/2000/svg'
      >
         <g id='trash' clipPath='url(#clip0_1168_3628)'>
            <path
               id='Vector'
               d='M18.625 1.25001H13.9375L13.5703 0.519538C13.4925 0.363372 13.3727 0.232008 13.2243 0.140225C13.076 0.0484421 12.9049 -0.00011828 12.7305 6.84872e-06H8.26563C8.09155 -0.000662313 7.92082 0.047717 7.77297 0.139602C7.62513 0.231487 7.50615 0.363161 7.42969 0.519538L7.0625 1.25001H2.375C2.20924 1.25001 2.05027 1.31585 1.93306 1.43307C1.81585 1.55028 1.75 1.70925 1.75 1.87501L1.75 3.12501C1.75 3.29077 1.81585 3.44974 1.93306 3.56695C2.05027 3.68416 2.20924 3.75001 2.375 3.75001H18.625C18.7908 3.75001 18.9497 3.68416 19.0669 3.56695C19.1842 3.44974 19.25 3.29077 19.25 3.12501V1.87501C19.25 1.70925 19.1842 1.55028 19.0669 1.43307C18.9497 1.31585 18.7908 1.25001 18.625 1.25001ZM3.82813 18.2422C3.85793 18.7182 4.06803 19.165 4.41565 19.4916C4.76326 19.8181 5.22227 19.9999 5.69922 20H15.3008C15.7777 19.9999 16.2367 19.8181 16.5844 19.4916C16.932 19.165 17.1421 18.7182 17.1719 18.2422L18 5.00001H3L3.82813 18.2422Z'
               fill={color}
            />
         </g>
         <defs>
            <clipPath id='clip0_1168_3628'>
               <rect width={size} height={size} fill={color} />
            </clipPath>
         </defs>
      </svg>
   );
};

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacus purus, interdum facilisis erat aliquam, pretium tempor quam. Cras hendrerit porta mi et rhoncus. Proin volutpat elit at mollis fermentum. Sed laoreet, turpis id cursus ullamcorper, nunc lacus volutpat urna, vitae vehicula dolor velit ac nisi. Pellentesque rutrum, augue vitae efficitur auctor, tellus augue convallis metus, at feugiat eros nulla at lectus. Sed in venenatis tortor. Proin eget sem sed mi egestas ullamcorper sed non metus. Integer tortor ante, efficitur vitae maximus quis, tincidunt in ipsum. Curabitur commodo sagittis tellus, sit amet facilisis arcu fermentum ac. Pellentesque euismod, ligula sit amet cursus finibus, quam ligula malesuada est, ut euismod purus lectus non neque. Nunc tempor dui sed elit tincidunt, consequat maximus metus molestie. Sed in efficitur lorem, non accumsan mauris."

function ClientJobItem() {
   return (
      <>
         <Space
            direction="vertical"
            style={{ padding: "0.25rem 0.5rem" }}
         >
            <Row justify="space-between">
               <Col>
                  <NavLink
                     to="/"
                  >
                     <Title style={{ margin: "0 5" }} level={5}>
                        Javascript expert with Next.js and React.js expertise
                     </Title>
                  </NavLink>
                  <Text level={4} style={{ marginLeft: "0.5rem" }}>
                     Payment: 100000 - 500000
                  </Text>
                  <Divider type="vertical" />
                  <Text level={4} style={{ color: "#828282" }}>
                     Open
                  </Text>
               </Col>
               <Trash />
            </Row>
            <Text level={5} style={{ marginLeft: "0.5rem" }}>
               Posted: 09/11/2023
            </Text>
            <Paragraph
               ellipsis={{ rows: 2 }}
               style={{ maxWidth: "70%", marginLeft: "0.5rem" }}
            >
               {description}
            </Paragraph>
         </Space>
         <Divider style={{ margin: "0.5rem 0" }} />
      </>
   );
};

export default ClientJobItem;