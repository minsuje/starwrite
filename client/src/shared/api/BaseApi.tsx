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
  baseURL: 'localhost:5173/user/',
});
