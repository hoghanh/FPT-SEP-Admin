import React from 'react';
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from 'antd';
import { post } from 'utils/APICaller';
import useAuthActions from 'recoil/action';
import { useHistory } from 'react-router-dom';
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignIn() {
  const { login } = useAuthActions();

  const history = useHistory();

  const onFinish = (values) => {
    post({
      endpoint: `/accounts/login`,
      body: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        login(res.data.token);

        notification.success({
          message: 'Đăng nhập thành công',
        });
        window.location.href = "/dashboard";

        // history.push('/dashboard');
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <>
      <Layout className='layout-default layout-signin'>
        <Header>
          <div className='header-col header-brand'>
            <h5>FPT-SEP QTV</h5>
          </div>
        </Header>
        <Content className='signin'>
          <Row justify='space-around'>
            <Col xs={{ span: 24 }} md={{ span: 10 }}>
              <Title className='mb-15'>Đăng nhập</Title>
              <Title className='font-regular text-muted' level={5}>
                Nhập tài khoản và mật khẩu để đăng nhập
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='vertical'
                className='row-col'
              >
                <Form.Item
                  className='username'
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tài khoản của bạn!',
                    },
                  ]}
                >
                  <Input placeholder='Tài khoản của bạn...' />
                </Form.Item>

                <Form.Item
                  className='username'
                  label='Password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu của bạn',
                    },
                  ]}
                >
                  <Input type='password' placeholder='Mật khẩu' />
                </Form.Item>

                <Form.Item
                  name='remember'
                  className='aligin-center'
                  valuePropName='checked'
                >
                  <Switch defaultChecked onChange={onChange} />
                  Nhớ tài khoản
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    style={{ width: '100%' }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
        <Footer>
          <p className='copyright'>
            {' '}
            © 2023 FPT Student-Enterprise Connection Platform.
          </p>
        </Footer>
      </Layout>
    </>
  );
}
