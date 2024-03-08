import styled from 'styled-components';

import { useState } from 'react';
import { ListCategory, ListViewMainEnt } from '../../entities/ListView';
import ListViewContentWid from './ListViewContentWid';

//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
`;

const _CategoryBar = styled.div`
  width: 30%;
`;
const _CategoryContent = styled.div`
  width: 100%;
  background-color: #540000;
`;

function ListViewWid({ content }: { content: string }) {
  const [selected, setSelected] = useState<string>('전체');
  console.log(selected);
  if (content === 'main') {
    return (
      <_ListViewBox>
        <_CategoryBar>
          <ListCategory changeCategory={setSelected}></ListCategory>
        </_CategoryBar>

        <_CategoryContent>
          <ListViewContentWid selected={selected} />
        </_CategoryContent>
      </_ListViewBox>
    );
  }
}

export default ListViewWid;
