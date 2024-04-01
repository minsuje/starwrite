import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { fetchDataGlobalSearch } from './api/GlobalSearch';
import {
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
import { IoIosSearch } from 'react-icons/io';

interface SearchResult {
  nickName: string;
  title: string;
  createdAt: string; // 또는 Date 타입
  searchPostId: string;
  content: string;
}

export function GlobalSearch() {
  const [modal, setModal] = useState(false); // 모달 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [, setSearchResultBox] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // 검색이 수행되었는지 여부

  function handleGlobalSearch() {
    setModal(!modal);
  }

  function closeModal() {
    setModal(false);
    setSearchTerm(''); // 검색창의 내용 초기화
    setSearchPerformed(false); // 검색상태 상태도 초기화할 수 있습니다.
    setSearchResultBox(false); // 검색 결과 박스 표시 상태도 초기화
    setSearchResults([]); // 검색 결과 목록도 초기화
  }

  function stopPropagation(event: React.SyntheticEvent) {
    event.stopPropagation();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setSearchPerformed(true); // 검색이 수행되었음 나타냄.
      if (!searchTerm.trim()) {
        setSearchResultBox(false);
        return;
      }
      const getGlobalSearch = async () => {
        try {
          const GlobalDataResponse = await fetchDataGlobalSearch(searchTerm);
          setSearchResults(GlobalDataResponse);
          const isMatch = GlobalDataResponse.length > 0;
          setSearchResultBox(isMatch);

          if (!isMatch) {
            //console.log('존재하지 않은 게시글');
            setSearchResultBox(false);
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
      <div onClick={handleGlobalSearch} style={{ cursor: 'pointer' }}>
        <IoIosSearch size={24} />
        {/* <InterGratedSearchIcon /> */}
      </div>
      {modal && (
        <_GlobalModalBg
          transition={{ duration: 0.2, ease: 'easeOut' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              <_GlobalSearchModal
                transition={{ duration: 0.2, ease: 'easeOut' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={stopPropagation}
                value={searchTerm}
                placeholder="검색어를 입력하세요"
              ></_GlobalSearchModal>
              <IoIosSearch
                size={24}
                style={{ position: 'absolute', marginRight: '14px' }}
              />

              {/* <InterGratedSearchIcon /> */}
            </div>
            {searchPerformed && (
              <_GlovalSearchBox>
                <_Globalname>모든 게시글 검색</_Globalname>
                {searchResults.length > 0 ? (
                  searchResults.map((result, id) => (
                    <_GlovalSearchResult key={id}>
                      <_GlobalLink
                        to={`/user/starwrite/listview/main/${result.nickName}/all/${result.searchPostId}`}
                      >
                        <div
                          style={{
                            backgroundColor: '#363535',
                            padding: '20px',
                            width: '100%',
                            borderRadius: '4px',
                            // display: 'flex',
                          }}
                        >
                          <_GlovalSearchTitle>
                            <div style={{ width: '100%' }}>{result.title}</div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'end',
                                width: '100%',
                                marginLeft: '10px',
                                fontSize: '12px',
                              }}
                            >
                              {result.nickName}
                            </div>

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
                  ))
                ) : (
                  <div>검색 결과가 없습니다.</div>
                )}
              </_GlovalSearchBox>
            )}
          </div>
        </_GlobalModalBg>
      )}
    </>
  );
}
