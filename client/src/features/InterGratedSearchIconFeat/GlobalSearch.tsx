import { useState } from 'react';
import { InterGratedSearchIcon } from '../../shared/IntegratedSearchIcon';

import { fetchDataGlobalSearch } from './api/GlobalSearch';
import {
  _ModalBg,
  _GlobalModalBg,
  _GlobalSearchModal,
  _GlovalSearchBox,
  _GlovalSearchResult,
  _GlovalSearchTitle,
  _GlovalSearchContnet,
} from '../../shared/Modal/ModalStyle';

export function GlobalSearch() {
  const [modal, setModal] = useState(false); // 모달 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultBox, setSearchResultBox] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  function handleGlobalSearch() {
    setModal(!modal);
  }

  function closeModal() {
    setModal(false);
  }

  // 부모 엘리먼트로의 이벤트 전달을 막아주는 함수
  function stopPropagation(event) {
    event.stopPropagation();
  }

  function searchTarget(e) {
    const query = e.target.value;
    setSearchTerm(query);
    // if (query === searchTerm) {
    //   setSearchResultBox(true);
    // } else {
    //   setSearchResultBox(false);
    // }
  }

  //listview/main/:nickname/:category:/:postId
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const getGlobalSearch = async () => {
        try {
          const GlobalDataResponse = await fetchDataGlobalSearch(searchTerm);
          setSearchResults(GlobalDataResponse);
          console.log('>>>>>>>>>>>>>서버통합검색 결과', GlobalDataResponse);
          // 검색 결과 처리 로직
          const isMatch = GlobalDataResponse.some((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          setSearchResultBox(isMatch);
          if (isMatch) {
            console.log(GlobalDataResponse);
          } else {
            setSearchResultBox(isMatch);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getGlobalSearch();
    }
  }
  return (
    <>
      <div onClick={handleGlobalSearch}>
        <InterGratedSearchIcon />
      </div>
      {modal && (
        <_GlobalModalBg onClick={closeModal}>
          <div style={{ width: '60%' }}>
            <_GlobalSearchModal
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={stopPropagation}
              value={searchTerm}
            />
            {searchResultBox && (
              <_GlovalSearchBox>
                {searchResults.map((result, id) => (
                  <_GlovalSearchResult key={result.id}>
                    <div
                      style={{ backgroundColor: '#363535', padding: '20px' }}
                    >
                      <_GlovalSearchTitle>{result.title}</_GlovalSearchTitle>
                      <_GlovalSearchContnet>
                        {result.content}
                      </_GlovalSearchContnet>
                    </div>
                  </_GlovalSearchResult>
                ))}
              </_GlovalSearchBox>
            )}
          </div>
        </_GlobalModalBg>
      )}
    </>
  );
}
