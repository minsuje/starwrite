import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';

function SelectCategory({ close }: { close: () => void }) {
  return (
    <>
      <_ModalBg onClick={close}>
        <_Modal>
          <p>안녕</p>
          {/* <button onClick={close}>닫기</button> */}
          <select>
            <option>안녕</option>
          </select>
        </_Modal>
      </_ModalBg>
    </>
  );
}

export default SelectCategory;
