import axios from 'axios';

const base_url = "http://localhost:4000/api/v1/users";

export async function checkLoginStatus() {
  try {
    const response = await axios.get(base_url + "/status", { withCredentials: true });
    return { "isLoggedIn": true, "user": response.data };
  } catch (error) {
    console.error('Check status error:', error.response?.data || error.message);
    return { "isLoggedIn": false, "user": null };
  }
}

export async function logout() {
  try {
    await axios.post(base_url + '/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Logout error:', error);
  }
}