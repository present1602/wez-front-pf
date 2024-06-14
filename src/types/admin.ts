export interface AddAdminParam {
  accountId: string;
  password: string;
  name: string;
}

export interface AddEditorParam extends AddAdminParam {
  artistList: Array<number>;
}

export interface UpdateAdminParam {
  adminId: string;
  accountId: string;
  name: string;
}

export interface UpdateEditorParam {
  adminId?: string;
  userId?: string;
  // accountId: string;
  name: string;
  artistList?: Array<number>;
}

export interface UpdateEditorMyProfileParam {
  adminId: string;
  name: string;
}

export interface LoginParam {
  accountId: string;
  password: string;
}
