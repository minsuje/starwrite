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
//'http://54.180.103.144:8080/user/',
import axios from 'axios';
//Minsu's
export const baseApi = axios.create({
  baseURL: 'http://localhost:8080/user/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  },
});

export const commonApi = axios.create({
  baseURL: 'http://localhost:8080/',
});

//Seejin's
// export const baseApi = axios.create({
//   baseURL: 'http://52.79.228.200:8080/user/',
//   headers: {
//     Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//   },
// });
