import { useParams } from 'react-router';
import { ListHeaderEnt } from '../..';

function ListViewMainEnt() {
  // 여기에 글 리스트 불러오면 됨
  const { category } = useParams();
  console.log(category);
  return (
    <>
      {category} 카테고리 글 리스트
      <ListHeaderEnt />
    </>
  );
}

export default ListViewMainEnt;
