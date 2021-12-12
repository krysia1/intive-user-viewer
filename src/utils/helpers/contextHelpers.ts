// Function that deletes user from UsersContext
export const deleteFromUsersList = (
  listOfUsers: Array<UserInterfaceContext>,
  userId: string
) => {
  const removeId = listOfUsers.findIndex((user) => user.id === userId);
  listOfUsers.splice(removeId, 1);
};

//Function that adds user to UsersContext
export const addToUsersList = (
  listOfUsers: Array<UserInterfaceContext>,
  user: UserInterfaceContext
) => {
  listOfUsers.push(user);
};

//Function that updates user in UserContext
export const updateUsersList = (
  listOfUsers: Array<UserInterfaceContext>,
  userToUpdate: UserInterfaceContext
) => {
  deleteFromUsersList(listOfUsers, userToUpdate.id);
  addToUsersList(listOfUsers, userToUpdate);
};

//Function that finds user in UsersContext by Id
export const findUserById = (
  listOfUsers: Array<UserInterfaceContext>,
  userId: string | undefined
) => {
  const wantedUser = listOfUsers.find((user) => user.id === userId);
  return wantedUser;
};
