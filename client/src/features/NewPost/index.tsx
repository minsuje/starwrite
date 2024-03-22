import Editor from './ui/EditorFeat';
import NewPostHeadFeat from './ui/EditorHeadFeat';
import GetSavings from './lib/getSavings';
import NewPostFeat from './ui/NewPostFeat';

export { Editor, NewPostHeadFeat, GetSavings, NewPostFeat };
export interface Saving {
  postid: number;
  posts: {
    category: string | null;
    content: string | undefined;
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
  usersRelationType: string;
}
