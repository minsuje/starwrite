import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

export const SearchFeat = ({ onSearch }) => {
  // inputVisible 상태를 추가하여 입력 창의 표시 여부를 관리합니다.
  const [inputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 클릭 핸들러에서는 inputVisible 상태를 변경하여 입력 창을 표시하거나 숨깁니다.
  function handleClick() {
    setInputVisible(!inputVisible);
  }

  // // 사용자가 입력을 완료하고 Enter 키를 누르면 onSearch 함수를 호출합니다.
  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     onSearch(searchTerm);
  //     setInputVisible(true); // 선택적으로 검색 후 입력 창을 숨길 수 있습니다.
  //     // setSearchTerm('');
  //   }
  // };

  // 입력 창에 입력이 발생할 때마다 호출됩니다.
  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm); // 입력된 검색어 상태 업데이트
    onSearch(newSearchTerm); // 입력된 검색어로 검색 수행
  };
  return (
    <>
      <IoIosSearch onClick={handleClick} />
      {inputVisible && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleChange}
          autoFocus // 자동으로 입력 창에 포커스를 맞춥니다.
        />
      )}
    </>
  );
};

export default SearchFeat;
