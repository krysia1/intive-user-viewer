import React, { useContext, useState } from 'react';
import { Table, Button, Space } from 'antd';
import 'antd/dist/antd.css';
import {
  MoreOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteWindow from './DeleteWindow';
import UsersContext from '../contexts/UsersContext';
import { getColumnSearchProps } from './SearchBox';
import { getParagraph } from './Paragraph';
import { usersToDisplay } from '../utils/helpers/userHelpers';

const UsersTable = () => {
  const [selectedUsers, setSelectedUsers] = useState(
    [] as Array<UserInterfaceContext>
  );
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const usersContext = useContext(UsersContext);

  const deleteAction = (userIds: string[]) => {
    let users = usersContext.listOfUsers;
    const pickedUsers = users.filter((user: UserInterfaceContext) =>
      userIds.includes(user.id)
    );
    setSelectedUsers(pickedUsers);
    setDeleteWindow(true);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columnTitles = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'name',
      ...getColumnSearchProps(
        'fullName',
        'name',
        'column-md column-name',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
      sorter: (a: UserInterfaceTable, b: UserInterfaceTable) =>
        a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps(
        'email',
        'email',
        'column-md',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
      sorter: (a: UserInterfaceTable, b: UserInterfaceTable) =>
        a.email.localeCompare(b.email),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text: string) => getParagraph(text, 'column-sm'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: UserInterfaceTable, b: UserInterfaceTable) => a.age - b.age,
      ...getColumnSearchProps(
        'age',
        'age',
        'column-sm',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
    },
    {
      title: 'Hobbies',
      dataIndex: 'hobbies',
      key: 'hobbies',
      ...getColumnSearchProps(
        'hobbies',
        'hobbies',
        'column-md',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
    },
    {
      title: 'Date of birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      sorter: (a: UserInterfaceTable, b: UserInterfaceTable) =>
        moment(a.dateOfBirth).diff(moment(b.dateOfBirth)),
      ...getColumnSearchProps(
        'dateOfBirth',
        'dateOfBirth',
        'column-md',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps(
        'address',
        'address',
        'column-md',
        searchedColumn,
        setSearchedColumn,
        searchText,
        setSearchText
      ),
      sorter: (a: UserInterfaceTable, b: UserInterfaceTable) =>
        a.address.localeCompare(b.address),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (text: string) => getParagraph(text, 'column-md'),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (text: string, record: any) => (
        <Space className='column-lg'>
          <Link to={`/user/${record.id}`}>
            <Button
              type='link'
              icon={<MoreOutlined />}
              className='btn-brown-link'
            >
              Details
            </Button>
          </Link>
          <Button
            type='link'
            icon={<DeleteOutlined />}
            className='btn-red-link'
            onClick={() => deleteAction([`${record.id}`])}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {deleteWindow === true ? (
        <div className='overlay align-self-center'>
          <DeleteWindow
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            visible={deleteWindow}
            setVisible={setDeleteWindow}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        </div>
      ) : null}
      <div>
        <Button
          className='btn-red btn-mrg-bottom'
          type='primary'
          onClick={() => {
            deleteAction(selectedRowKeys);
          }}
          disabled={!hasSelected}
        >
          Delete selected
        </Button>
        <Table
          rowKey='id'
          className='column-ellipsis table'
          rowSelection={rowSelection}
          columns={columnTitles}
          dataSource={usersToDisplay(usersContext.listOfUsers)}
        />
      </div>
    </>
  );
};

export default UsersTable;
