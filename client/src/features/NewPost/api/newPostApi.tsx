import axios from 'axios';

interface NewPost {
  category: string | undefined;
  user: string;
  post: {
    title: string | undefined;
    content: string | undefined;
    visible: string | undefined;
    category?: string | undefined;
    tmpSave?: boolean;
  };
  relatedPosts: string[];
}

// 글 저장 하기
export const newPostApi = async (data: NewPost) => {
  try {
    const response = await axios.post(
      `http://52.79.228.200:8080/user/post`,
      data,
    );
    console.log('newPostApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`newPostApi Error`, error);
    throw error;
  }
};
export const patchPostApi = async (data: NewPost) => {
  try {
    const response = await axios.patch(
      `http://52.79.228.200:8080/user/post`,
      data,
    );
    console.log('newPostApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`newPostApi Error`, error);
    throw error;
  }
};

// 글 임시저장 하기
export const newSavingApi = async (data: NewPost) => {
  try {
    const response = await axios.post(
      `http://52.79.228.200:8080/user/post/Save`,
      data,
    );
    console.log('newSavingApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`newSavingApi Error`, error);
    throw error;
  }
};
export const patchSavingApi = async (data: NewPost, postid: number) => {
  try {
    const response = await axios.patch(
      `http://52.79.228.200:8080/user/post/save/${postid}`,
      data,
    );
    console.log('patchSavingApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`patchSavingApi Error`, error);
    throw error;
  }
};

// 임시저장된 글 리스트 불러오기
export const savingsApi = async (nickname: string) => {
  try {
    const response = await axios.get(`http://52.79.228.200:8080/${nickname}`);
    console.log(`savingApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`savingsApi Error`, error);
    throw error;
  }
};

// 임시저장된 글 불러오기
export const getsavingApi = async (id: number) => {
  try {
    const response = await axios.get(
      `http://52.79.228.200:8080/user/post/홍길동/All/Save/${id}`,
    );
    console.log(`getsavingApi`, response);
    return response.data;
  } catch (error) {
    console.error(`getsavingApi Error`, error);
    throw error;
  }
};

//글 목록 불러오기
export const getTitleApi = async () => {
  try {
    const response = await axios.get(
      `http://52.79.228.200:8080/user/post/write`,
    );
    console.log(`getTitleApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`getTitleApi Error`, error);
    throw error;
  }
};
