import { newPostApi, patchPostApi } from '../api/newPostApi';

export function publishPost() {
  const postData = {
    title: title,
    content: content,
    public: isPublic,
    category: category,
    tmpSave: false,
  };
  if (postId) {
    patchPostApi(postData);
  } else {
    newPostApi(postData);
  }
}

export function savePost() {
  const postData = {
    title: title,
    content: content,
    public: isPublic,
    category: category,
    tmpSave: true,
  };
  if (postId) {
    patchPostApi(postData);
  } else {
    newPostApi(postData);
  }
}
