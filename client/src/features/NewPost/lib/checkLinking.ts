import Titles from '../model/Titles';
export default function checkLinking(check: string | undefined) {
  const titleArray: string[] = [];
  const postIdArray: string[] = [];
  // 제목부터 배열에 저장
  if (check) {
    const array = JSON.parse(check);
    console.log('array', array);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content.length; j++) {
        if (array[i].content[j].type == 'mention') {
          if (!titleArray.includes(array[i].content[j].props.name)) {
            titleArray.push(array[i].content[j].props.name);
          }
        }
      }
    }
    console.log('titleArray', titleArray);
  } else {
    console.log('글이 없어요');
  }

  // 해당 배열 가지고 와서 postId 찾기
  for (let i = 0; i < Titles.length; i++) {
    if (titleArray.includes(Titles[i].name)) {
      postIdArray.push(Titles[i].id);
    }
  }
  console.log('idarray', postIdArray);
  return postIdArray;
}
