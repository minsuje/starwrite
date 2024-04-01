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
  // baseURL: 'http://54.180.103.144:8080/user/',
  baseURL: 'http://localhost:8080/user/',
});

baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const commonApi = axios.create({
  // baseURL: 'http://54.180.103.144:8080/',
  baseURL: 'http://localhost:8080/',
});

//Seejin's
// export const baseApi = axios.create({
//   baseURL: 'http://52.79.228.200:8080/user/',
//   headers: {
//     Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//   },
// });
