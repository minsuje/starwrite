export default function checkLinking(check: string | undefined) {
  const titleArray: number[] = [];

  // 제목부터 배열에 저장
  if (check) {
    const array = JSON.parse(check);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content.length; j++) {
        if (array[i].content[j].type == 'mention') {
          console.log('mention  찾았다');
          console.log('찾은 mention', array[i].content[j]);
          if (!titleArray.includes(array[i].content[j].props.postid)) {
            titleArray.push(Number(array[i].content[j].props.postid));
          }
        }
      }
    }
    console.log('titleArray', titleArray);
  }

  return titleArray;
}
