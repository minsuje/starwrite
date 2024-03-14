import styled from 'styled-components';

const _headBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px 40px 10px;

  input {
    color: var(--color-zinc-100);
    background-color: var(--color-zinc-900);
    border: none;
    font-size: 20px;
    font-weight: 700;
    &:focus {
      outline: none; // 포커스 효과를 제거
    }
  }
`;

const _buttonBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;

  button {
    background-color: #3f3f3f;
    color: white;
    box-shadow: none;
  }
`;

const _CategoryNameInput = styled.input`
  position: absolute;
  left: 35%;
  z-index: 100;
`;

export { _headBox, _buttonBox, _CategoryNameInput };
