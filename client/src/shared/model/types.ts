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
