export interface Category {
  name: string;
  categoryId: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Posts {
  postId: number;
  categoryId: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
  title: string;
  tmpSave: boolean;
  visible: string;
  recentView: Date;
  postTitle?: string;
  postIdentifier?: number;
  authorNickname?: string;
  originAuthor?: string;
  originAuthorId?: string;
  scrap?: boolean;
}

export interface Annotation {
  annotationId: number;
  content: string;
  createdAt: Date;
  nickName: string;
  parentAnnotation: number;
  position: string;
  type: string;
  updatedAt: Date;
  userId: string;
}
export interface PostDetail {
  annotations: Annotation[];
  authorNickname: string;
  authorUserId: string;
  categoryId: string;
  categoryName: string;
  content: string;
  createdAt: Date;
  img: string;
  postIdentifier: number;
  recentView: Date;
  title: string;
  tmpSave: boolean;
  updatedAt: Date;
  visible: string;
}
