import styled from 'styled-components';
import { NewPostFeat } from '../../features/NewPost';

const _NewPostPage = styled.div`
  margin: 2% 10% 0;
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
