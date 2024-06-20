export type Comment = {
  id?: string;
  avatar: string;
  username: string;
  email: string;
  homepage: string;
  captcha: string;
  text: string;
  createdAt: string;
  file?: {
    uri: string;
  };
};

export type Comments = Comment[];

export type CommentState = {
  comments: Comments | null;
  loading: boolean;
  error: string | null | undefined;
};
