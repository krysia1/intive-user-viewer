import React from 'react';

interface UsersContextInterface {
  listOfUsers: Array<UserInterfaceContext>,
  setListOfUsers: (newList: Array<UserInterfaceContext>) => void
}

const UsersContext = React.createContext({} as UsersContextInterface)

export default UsersContext;