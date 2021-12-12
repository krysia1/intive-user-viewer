import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, PageHeader } from 'antd';
import UserForm from '../components/UserForm';

const { Content } = Layout;

const UserPage = () => {
  const [user, setUser] = useState({} as UserInterfaceTable);
  const navigate = useNavigate();

  return (
    <Layout className='page-wrapper'>
      <PageHeader onBack={() => navigate('/')} title='Back' />
      <Content className='page-wrapper__content'>
        {user !== undefined ? <UserForm user={user} setUser={setUser} /> : null}
      </Content>
    </Layout>
  );
};

export default UserPage;
