export interface User {
  name: { first: string; last: string };
  location: { city: string; country: string };
  login: { username: string };
}

export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
