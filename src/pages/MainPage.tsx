import React, { useContext, useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { getAllUsers } from '../utils/fetches';
import { Spin, Layout } from 'antd';
import UsersContext from '../contexts/UsersContext';

const { Content } = Layout;

const MainPage = () => {
  const [showLoader, setShowLoader] = useState(true);
  const usersContext = useContext(UsersContext);

  useEffect(() => {
    (async () => {
      const users = await getAllUsers();
      const parsedUsers = await users.json();
      usersContext.setListOfUsers(parsedUsers);

      setShowLoader(false);
    })();
  }, []);

  return (
    <Layout className='page-wrapper'>
      <Content className='page-wrapper__content'>
        {showLoader ? <Spin className='align-self-center' /> : <UsersTable />}
      </Content>
    </Layout>
  );
};

export default MainPage;
