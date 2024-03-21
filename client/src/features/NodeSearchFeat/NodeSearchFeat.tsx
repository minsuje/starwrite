import { useState, useRef } from 'react';
import { nodes } from '../../widgets/NodeView/index';
import { SearchIcon } from '../../shared/Search';
import './NodeSearchFeat.css';
import { CustomNode } from '../NodeViewFeat/model/Types';
export type SearchTypes = {
  onSearch: (newSearchTerm: string) => void; // 반환 타입을 void로 변경
  nodesData: CustomNode[]; // nodesData 속성 추가
};

export const NodeSearchFeat = ({ onSearch, nodesData }: SearchTypes) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false); // li 검색창
  const searchRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
    setToggleSearch(!!newSearchTerm.trim());
    // 검색어가 있고, 필터링된 결과가 있을 때만 목록을 표시
    if (
      newSearchTerm.trim() &&
      nodes.filter((node) =>
        node.label.toLowerCase().includes(newSearchTerm.toLowerCase()),
      ).length
    ) {
      setToggleSearch(true);
    } else {
      return (
        <li style={{ padding: '15px', color: '#ffff' }}>
          검색 결과가 없습니다.
        </li>
      );
    }
  };

  const handleItemClick = (label: string) => {
    setSearchTerm(label);
    setToggleSearch(false);
  };

  const handleInputClick = () => {
    setToggleSearch(true);
  };

  // 검색 로직을 nodesData.posts에 적용
  const filterSearch = nodesData.posts.filter((post) =>
    (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleInputClick}
          // onBlur={handleoutClick}
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
        <SearchIcon></SearchIcon>
        {toggleSearch && searchTerm.length != 0 && (
          <ul
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              overflow: 'auto',
              height: 'fit-content',
              maxHeight: '250px',
              zIndex: 1000,
              backgroundColor: `rgba(0, 0, 0, 0.8)`,
            }}
          >
            {filterSearch.length > 0 ? (
              filterSearch.map((item, index) => (
                <li
                  key={index}
                  style={{ padding: '15px', cursor: 'pointer', color: '#ffff' }}
                  onClick={() => {
                    handleItemClick(item.title);
                    onSearch(item.title);
                  }}
                  className="searchItem"
                >
                  {item.title}
                </li>
              ))
            ) : (
              <li style={{ padding: '15px', color: '#ffff' }}>
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
