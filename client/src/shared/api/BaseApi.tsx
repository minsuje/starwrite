/*
const tried = async () => {
  try {
    const data = await fs.readFile("./text.txt");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
tried();
*/

import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'http://52.79.228.200:8080/user/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  },
});
