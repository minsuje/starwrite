// 자주사용되는 tpyes

export type Search = string;

export interface Category {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Posts {
  id: number;
  category_id: number;
  writer: string;
  holder: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}
