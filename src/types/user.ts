export interface UpdateUserTypeParam {
  userId: string;
  type: 'NORMAL' | 'ARTIST';
}

export interface UpdateUserStatusParam {
  userId: string;
  status: string;
  period?: number;
}
