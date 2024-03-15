export function savePost(content: string) {
  console.log('postContent:', content);
}

export function savePostInfo(
  title: string,
  category: string,
  tmpSave: boolean,
  isPublic: string,
) {
  console.log('postInfo: ', title, category, tmpSave, isPublic);
}
