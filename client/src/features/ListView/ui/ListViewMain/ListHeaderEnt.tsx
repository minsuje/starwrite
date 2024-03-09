import { useNavigate } from 'react-router';

function ListHeaderEnt() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate('/starwrite/writenewpost');
        }}
      >
        글 추가하기
      </button>
    </>
  );
}

export default ListHeaderEnt;
