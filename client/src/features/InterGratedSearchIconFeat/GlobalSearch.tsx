import { useState } from 'react';
import { InterGratedSearchIcon } from '../../shared/IntegratedSearchIcon';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { fetchDataGlobalSearch } from './api/GlobalSearch';
// import { Link } from 'react-router-dom';
import { _StyledLink } from '../../shared/CommonStyle';
import {
  _ModalBg,
  _GlobalModalBg,
  _GlobalSearchModal,
  _GlovalSearchBox,
  _GlovalSearchResult,
  _GlovalSearchTitle,
  _GlovalSearchContnet,
  _GlobalLink,
  _Globalname,
  _Globaldate,
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
            <div style={{ position: 'relative' }}>
              <_GlobalSearchModal
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={stopPropagation}
                value={searchTerm}
                placeholder="검색어를 입력하세요"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  paddingLeft: '10px',
                }}
              >
                <InterGratedSearchIcon />
              </div>
            </div>

            {searchResultBox && (
              <_GlovalSearchBox>
                <_Globalname>통합검색</_Globalname>
                {searchResults.map((result, id) => (
                  <_GlovalSearchResult key={id}>
                    <_GlobalLink
                      to={`/user/starwrite/listview/main/${result.nickName}/all/${result.searchPostId}`}
                    >
                      <div
                        style={{ backgroundColor: '#363535', padding: '20px' }}
                      >
                        <_GlovalSearchTitle>
                          {result.title}
                          <_Globaldate>
                            {format(
                              new Date(result.createdAt),
                              'yyyy-MM-dd EEEE',
                              { locale: ko },
                            )}
                          </_Globaldate>
                        </_GlovalSearchTitle>

                        <_GlovalSearchContnet>
                          {result.content}
                        </_GlovalSearchContnet>
                      </div>
                    </_GlobalLink>
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
