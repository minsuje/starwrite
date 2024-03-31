export default function checkLinking(check: string | undefined) {
  const titleArray: number[] = [];

  type Props = {
    postid?: string;
    textColor?: string;
    backgroundColor?: string;
    textAlignment?: string;
  };

  type ContentObject = {
    type: string;
    props: Props;
  };

  type ArrayObject = {
    id: string;
    type: string;
    props: Props;
    content: ContentObject[];
    children: ArrayObject[];
  };

  if (check) {
    const array = JSON.parse(check) as ArrayObject[];
    console.log('array >>>>>>>>>> ', array);

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content?.length; j++) {
        if (
          array[i].content[j].type === 'mention' &&
          array[i].content[j].props.postid
        ) {
          const postId = Number(array[i].content[j].props.postid);
          if (!titleArray.includes(postId)) {
            titleArray.push(postId);
          }
        }
      }
    }
  }

  return titleArray;
}
