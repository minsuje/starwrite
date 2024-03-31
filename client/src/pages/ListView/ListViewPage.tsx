import styled from 'styled-components';
import ListViewWid from '../../widgets/ListView/ListViewWid';

const _ListViewPage = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  /* background-color: #c00808; */
  border-radius: 8px;
  overflow-y: scroll;
`;

function ListView() {
  return (
    <>
      <_ListViewPage>
        <ListViewWid></ListViewWid>
      </_ListViewPage>
    </>
  );
}

export default ListView;
