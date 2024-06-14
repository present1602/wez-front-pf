export interface UpdatePostStateParam {
  postId: string;
  isHide: boolean;
}

export interface CreatePostReplyParam {
  postId: string;
  userId: string;
  zoneId: string;
  content: string;
}
