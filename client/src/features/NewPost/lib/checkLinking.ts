export default function checkLinking(check: string | undefined) {
  const titleArray: number[] = [];
  console.log('check', check);

  if (check) {
    const array = JSON.parse(check);
    console.log('block 수: ', array.length);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content?.length; j++) {
        if (array[i].content[j].type == 'mention') {
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
