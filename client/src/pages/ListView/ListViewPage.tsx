import styled from 'styled-components';
import ListViewWid from '../../widgets/ListView/ListViewWid';

const _ListViewPage = styled.div`
  margin-top: 5%;
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
