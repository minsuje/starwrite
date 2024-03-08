import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 스타일
const OneCategory = styled.div`
  width: 80%;
  margin: 2px auto;
  text-align: center;
  padding: 15px 0px;
  background-color: #2c2c2c;

  &:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }
`;

const ListCategories = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #1c1c1c;
`;

// 타입
type Categories = string[];

function ListCategory({
  changeCategory,
}: {
  changeCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    setCategories(['전체', '스크랩', '임시저장', '과학', '사회', '국어']);
    console.log('category 바 마운트');
  }, []);
  const [categories, setCategories] = useState<Categories>([]);
  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((category) => {
            return (
              <OneCategory onClick={() => changeCategory(category)}>
                {category}
              </OneCategory>
            );
          })}
      </ListCategories>
    </>
  );
}

export default ListCategory;
