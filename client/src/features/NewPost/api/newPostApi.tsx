import axios from 'axios';

export const newPostApi = async (data: string) => {
  try {
    const response = await axios.post(`localhost`, data);
    console.log('newPostApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`newPostApi Error`, error);
    throw error;
  }
};

export const saveApi = async (data: string) => {
  try {
    const response = await axios.post(`localhost`, data);
    console.log(`saveApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`saveApi Error`, error);
    throw error;
  }
};

export const savingsApi = async (nickname: string) => {
  try {
    const response = await axios.get(`localhost/${nickname}`);
    console.log(`savingApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`savingsApi Error`, error);
    throw error;
  }
};

export const getsavingApi = async (id: string) => {
  try {
    const response = await axios.get(`localhost/${id}`);
    console.log(`getsavingApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`getsavingApi Error`, error);
    throw error;
  }
};
