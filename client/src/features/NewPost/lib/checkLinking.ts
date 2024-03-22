export default function checkLinking(check: string | undefined) {
  const titleArray: number[] = [];

  if (check) {
    const array = JSON.parse(check);

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content?.length; j++) {
        if (array[i].content[j].type == 'mention') {
          if (!titleArray.includes(Number(array[i].content[j].props.postid))) {
            titleArray.push(Number(array[i].content[j].props.postid));
          }
        }
      }
    }
  }

  return titleArray;
}
