export const getAppSettings = (): Promise<{
  theme: string;
  language: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        theme: 'dark',
        language: 'en',
      });
    }, 5000);
  });
};

export const getUserInfo = (): Promise<{
  name: string;
  email: string;
  age: number;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Wick',
        email: 'johnwick@test.com',
        age: 25,
      });
    }, 1000);
  });
};

export type User = {
  name: string;
  username: string;
  id: string;
  website: string;
};

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user = await response.json();
  return user;
}
