import { useState, useRef } from 'react';
// import { nodes } from '../../widgets/NodeView/index';
import './NodeSearchFeat.css';
import { NodeViewProps } from '../../pages/NodeView/NodeViewPage';
import { useParams } from 'react-router';

export const NodeSearchFeat: React.FC<NodeViewProps> = ({
  onSearch,
  nodesData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false); // li 검색창
  const searchRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
    setToggleSearch(!!newSearchTerm.trim());
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
  const { nickname } = useParams();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '20px',
          }}
        >
          {nickname} 님의 노드뷰
        </div>
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
          placeholder="검색할 노드를 입력해주세요"
        />

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
