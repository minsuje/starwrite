export default function checkLinking(check: string | undefined) {
  const titleArray: number[] = [];
  console.log('check', check);

  // 제목부터 배열에 저장
  if (check) {
    const array = JSON.parse(check);
    console.log(array);
    console.log('block 수: ', array.length);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].content?.length; j++) {
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

// [{"id":"b876e226-6922-4e55-9808-d94e0cf7563d","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"잘 들어가나요~~~","styles":{}}],"children":[]},

// {"id":"d672f650-8d03-4b00-94f4-5fa7efd49196","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"\n","styles":{}},{"type":"mention","props":{"title":"둘","postid":"4"}},{"type":"text","text":" ","styles":{}}],"children":[]},

// {"id":"2268f5fc-0911-4aee-bb75-790a57961198","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"\n\n","styles":{}}],"children":[]},

// {"id":"2f4e819c-97e0-44b1-ae5a-f78407e5f718","type":"image","props":{"backgroundColor":"default","textAlignment":"left","url":"data:image/jpeg;base64,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","caption":"","width":512},"children":[]},

// {"id":"fa3e44de-ebe2-4a99-8fd0-a26b52279ec8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]},

// {"id":"b94b5b51-9871-409f-a99e-6f5e36f59aa1","type":"paragraph","props":{"textColor":"default","backgroundColor":"red","textAlignment":"left"},"content":[{"type":"text","text":"~~~~추가~~~~","styles":{}}],"children":[]},

// {"id":"57490479-27a9-40bd-9e2a-be3aac27eed4","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"\n","styles":{}}],"children":[]},

// {"id":"56b5b1ad-c046-48e6-9be3-23f25c47a4ff","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}

// ]
