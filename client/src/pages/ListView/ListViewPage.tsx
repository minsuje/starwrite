import styled from 'styled-components';
import ListViewWid from '../../widgets/ListView/ListViewWid';

const _ListViewPage = styled.div`
  margin-top: 5%;
`;

function ListView({ content }: { content: string }) {
  return (
    <>
      <_ListViewPage>
        <ListViewWid content={content}></ListViewWid>
      </_ListViewPage>
    </>
  );
}

export default ListView;
