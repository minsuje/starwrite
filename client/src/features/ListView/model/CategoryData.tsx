// 카테고리 데이터
import { Category } from '../../../shared/types/app';

const initalList: Category[] = [
  { id: 'all', name: '전체' },
  { id: 'scrab', name: '스크랩' },
];
const categories: Category[] = [
  { id: 'mathid', name: '수학' },
  { id: 'scienceid', name: '과학' },
];
const list: Category[] = [...initalList, ...categories];

export { initalList, list, categories };
