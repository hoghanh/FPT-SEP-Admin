import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();

  const handleMove = () => {
    history.push('/dashboard');
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>404 - Not Found</h1>
        <p>Chết rồi, không có trang này bạn ơi</p>
        <Button type='primary' onClick={() => handleMove()}>
          Quay lại thôi
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
