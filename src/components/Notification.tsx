import { Button, notification } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { addUser } from '../utils/fetches';
import { userToPost } from '../utils/helpers/userHelpers';
import { addToUsersList } from '../utils/helpers/contextHelpers';
import { isOk } from '../utils/helpers/httpHelpers';

const undoDelete = async (
  key: string,
  user: UserInterfaceContext,
  setSelectedUsers: (newArray: Array<UserInterfaceContext>) => void,
  usersContext: any
) => {
  const data = await addUser(userToPost(user));
  if (isOk(data.status)) {
    addToUsersList(usersContext.listOfUsers, user);
    openNotification(
      'Successfuly added user:',
      4.5,
      user,
      false,
      false,
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
  notification.close(key);
};

export const openNotification = (
  message: string,
  time: number,
  user: UserInterfaceContext,
  error: boolean,
  undo: boolean,
  usersContext: any,
  setSelectedUsers: (newArray: Array<UserInterfaceContext>) => void
) => {
  const key = `open${Date.now()}`;
  const btn = undo ? (
    <Button
      className='btn-brown'
      type='primary'
      size='small'
      onClick={() => {
        undoDelete(key, user, setSelectedUsers, usersContext);
      }}
    >
      Undo
    </Button>
  ) : null;
  const args = {
    className: 'notification-box',
    message: `${message}`,
    description: error ? null : (
      <p>
        {user.name} {user.lastName}
      </p>
    ),
    duration: time,
    icon: error ? (
      <CloseCircleTwoTone twoToneColor='#e9474c' />
    ) : (
      <CheckCircleTwoTone twoToneColor='#52c41a' />
    ),
    btn,
    key,
    onClose: () => {
      setSelectedUsers([]);
    },
  };
  notification.open(args);
};
