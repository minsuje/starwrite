import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { SearchTypes } from '../../pages/NodeView/index';

export const SearchFeat = ({ onSearch }: SearchTypes) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function handleClick() {
    setInputVisible(!inputVisible);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm); // 입력된 검색어 상태 업데이트
    onSearch(newSearchTerm); // 입력된 검색어로 검색 수행
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            style={{
              paddingRight: '30px',
              position: 'relative',
              height: '40px',
              width: '500px',
              paddingLeft: '10px',
              background: '#212121',
              color: '#ffff',
            }}
            placeholder="노드를 입력해주세요"
          />
          <IoIosSearch
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#ffff',
            }}
          ></IoIosSearch>
        </div>
      </div>
    </>
  );
};
export default SearchFeat;
