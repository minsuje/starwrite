import styled from 'styled-components';
import { NewPostFeat } from '../../features/NewPost';

const _NewPostPage = styled.div`
  margin-top: 5%;
`;
function NewPostPage() {
  return (
    <>
      <_NewPostPage>
        <NewPostFeat />
      </_NewPostPage>
    </>
  );
}

export default NewPostPage;
