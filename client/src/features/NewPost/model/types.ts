export interface Titles {
  postid: number;
  title: string;
}
export interface Saving {
  categoryid: string;
  posts: {
    category: string | null;
    content: string;
    createdAt: Date;
    img: string;
    postId: null;
    recentView: null;
    relatedPost: null;
    title: string;
    tmpSave: boolean;
    updatedAt: Date;
    users: null;
    visible: string;
  };
  postid: null;
  usersRelationType: null;
}

export interface NewPost {
  category: string | undefined;
  post: {
    title: string | undefined;
    content: string | undefined;
    visible: string | undefined;
    category?: string | undefined;
    tmpSave?: boolean;
  };
  relatedPosts?: number[];
}
