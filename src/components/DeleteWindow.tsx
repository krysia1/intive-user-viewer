import React, { useContext } from 'react';
import { Modal } from 'antd';
import { deleteUser } from '../utils/fetches';
import { deleteFromUsersList } from '../utils/helpers/contextHelpers';
import { openNotification } from './Notification';
import { isOk } from '../utils/helpers/httpHelpers';
import UsersContext from '../contexts/UsersContext';

interface DeleteWindowProps {
  selectedUsers: Array<UserInterfaceContext>;
  setSelectedUsers: (newArray: Array<UserInterfaceContext>) => void;
  visible: boolean;
  setVisible: (newVal: boolean) => void;
  setSelectedRowKeys: (newTable: []) => void;
}

const DeleteWindow = ({
  selectedUsers,
  setSelectedUsers,
  visible,
  setVisible,
  setSelectedRowKeys,
}: DeleteWindowProps) => {
  const usersContext = useContext(UsersContext);

  const handleOk = () => {
    selectedUsers.map(async (user: UserInterfaceContext) => {
      const data = await deleteUser(user.id);
      if (isOk(data.status)) {
        deleteFromUsersList(usersContext.listOfUsers, user.id);
        cleanStates();
        openNotification(
          'Successfuly deleted user:',
          0,
          user,
          false,
          true,
          usersContext,
          setSelectedUsers
        );
      } else {
        openNotification(
          'Ups! Something went wrong',
          4.5,
          user,
          true,
          false,
          usersContext,
          setSelectedUsers
        );
      }
    });
  };

  const cleanStates = () => {
    setSelectedRowKeys([]);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title='Are you sure you want to delete: '
      width={'32rem'}
      okText='Delete'
      okButtonProps={{ className: 'btn-red' }}
      onOk={handleOk}
      cancelButtonProps={{ className: 'btn-brown-white' }}
      onCancel={cleanStates}
    >
      {selectedUsers.map((user: UserInterfaceContext, key: any) => {
        return (
          <p key={key}>
            {user.name} {user.lastName}
          </p>
        );
      })}
    </Modal>
  );
};

export default DeleteWindow;
