// 자주사용되는 tpyes

export type Search = string;

export interface Category {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Posts {
  id: string;
  category_id: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  title: string;
  tmpSave: boolean;
  public: string;
  recentView: Date;
}
