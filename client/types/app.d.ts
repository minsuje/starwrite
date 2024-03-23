// 자주사용되는 tpyes

export type Search = string;

export interface Category {
  name: string;
  categoryId: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Posts {
  postId: number;
  category_id: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  title: string;
  tmpSave: boolean;
  public: string;
  recentView: Date;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type RootState = import('../src/app/AppStore').RootState;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type AppDispatch = import('../src/app/AppStore').AppDispatch;
}
export {};
