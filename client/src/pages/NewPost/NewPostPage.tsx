import NewPostWid from '../../widgets/NewPost/NewPostWid';
import styled from 'styled-components';

const _NewPostPage = styled.div`
  margin-top: 5%;
`;
function NewPostPage() {
  return (
    <>
      <_NewPostPage>
        <NewPostWid />
      </_NewPostPage>
    </>
  );
}

export default NewPostPage;
