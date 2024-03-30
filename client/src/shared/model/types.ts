export interface Category {
  name: string;
  categoryId: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Posts {
  categoryId?: string;
  categoryName?: string;
  content: string;
  createdAt: Date;
  img?: string;
  originAuthor?: string;
  originAuthorId?: string;
  postId?: number;
  postIdentifier?: number;
  postTitle?: string;
  recentView: Date;
  scrap?: boolean;
  updatedAt: Date;
  userId: string;
  userNickname?: string;
  visible: string;
  title?: string;
  nickname?: string;
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
