import styled from 'styled-components';
import ListViewWid from '../../widgets/ListView/ListViewWid';

const _ListViewPage = styled.div`
  margin: 5% 0;
  height: 85vh;
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
