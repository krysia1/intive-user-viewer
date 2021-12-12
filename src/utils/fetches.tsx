const URI = 'http://localhost:5000';

interface TypedResponse<T = any> extends Response {
  json(): Promise<T>;
}

const jsonHeaders = {
  'Content-Type': 'application/json',
};

export async function getAllUsers(): Promise<
  TypedResponse<Array<UserInterfaceContext>>
> {
  try {
    const response = await fetch(`${URI}/Users`, {
      method: 'GET',
      headers: jsonHeaders,
    });

    return response;
  } catch (err) {
    console.error(`Error during getUsersList fetch: ${err}`);
  }
  return Promise.reject();
}

export async function getUser(
  userId: string
): Promise<TypedResponse<UserInterfaceContext>> {
  try {
    const response = await fetch(`${URI}/Users/${userId}`, {
      method: 'GET',
      headers: jsonHeaders,
    });

    return response;
  } catch (err) {
    console.error(`Error during getUser fetch: ${err}`);
  }
  return Promise.reject();
}

export async function getAllHobbies(): Promise<
  TypedResponse<Array<HobbyInterface>>
> {
  try {
    const response = await fetch(`${URI}/Hobbies`, {
      method: 'GET',
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during getAllHobbies fetch: ${err}`);
  }
  return Promise.reject();
}

export async function updateUser(body: UserInterfaceDB): Promise<any> {
  try {
    const response = await fetch(`${URI}/Users/${body.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during updateUser fetch: ${err}`);
  }
  return Promise.reject();
}

export async function deleteUser(userId: string): Promise<any> {
  try {
    const response = await fetch(`${URI}/Users/${userId}`, {
      method: 'DELETE',
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during deleteUser fetch: ${err}`);
  }
  return Promise.reject();
}

export async function addUser(body: UserInterfaceDB): Promise<any> {
  try {
    const response = await fetch(`${URI}/Users`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: jsonHeaders,
    });
    return response;
  } catch (err) {
    console.error(`Error during addUser fetch: ${err}`);
  }
  return Promise.reject();
}
