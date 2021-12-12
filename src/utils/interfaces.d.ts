interface HobbyInterface {
  id: string;
  name: string;
}

interface UserInterfaceBase {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

interface UserInterfaceTable extends UserInterfaceBase {
  fullName: string;
  hobbies: string[];
}

interface UserInterfaceDB extends UserInterfaceBase {
  hobbies: string[];
}

interface UserInterfaceContext extends UserInterfaceBase {
  hobbies: Array<HobbyInterface>;
}

