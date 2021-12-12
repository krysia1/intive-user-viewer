// Parse users so it's usable by the <Table /> component
export const usersToDisplay = (listOfUsers: Array<UserInterfaceContext>) => {
  const users = listOfUsers.map((user) => {
    const userHobbyNames = user.hobbies.map((hobby) => hobby.name + ' ');
    return {
      ...user,
      hobbies: userHobbyNames,
      fullName: `${user.name} ${user.lastName}`,
    };
  });
  return users;
};

// Parse user so its usable by the <Form /> component
export const userToDisplay = (user: UserInterfaceContext) => {
  const userHobbyNames = user.hobbies.map(
    (hobby: HobbyInterface) => hobby.name
  );
  const parsedUser = {
    ...user,
    hobbies: userHobbyNames,
    fullName: `${user.name} ${user.lastName}`,
  };
  return parsedUser;
};

// Parse user to POST him to database
export const userToPost = (user: UserInterfaceContext) => {
  const userHobbyIds = user.hobbies.map((hobby: HobbyInterface) => hobby.id);
  const parsedUser = { ...user, hobbies: userHobbyIds };
  return parsedUser;
};

//Parse user hobbies from names to objects
export const hobbiesNamesToObjects = (
  hobbies: string[],
  hobbiesObjects: Array<HobbyInterface>
) => {
  const userHobbyObjects = hobbiesObjects.filter((hobby: HobbyInterface) =>
    hobbies.includes(hobby.name)
  );

  return userHobbyObjects;
};
