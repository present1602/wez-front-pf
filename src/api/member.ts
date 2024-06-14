import { OutlinedFlagOutlined } from '@mui/icons-material';
import { AddAdminParam, AddEditorParam, UpdateAdminParam, UpdateEditorMyProfileParam, UpdateEditorParam } from '../types/admin';
import { UpdateUserStatusParam, UpdateUserTypeParam } from '../types/user';
import { requests } from './requests';

const AdminRequstHandler = {
  addAdmin: async (param: AddAdminParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.post('/admin/add', param);

      if (response.status === 200) {
        if (response.data.adminId && response.data.adminId.length > 0) {
          onSuccess();
        } else if (response.data && response.data.ERROR && response.data.ERROR === 'ADM0002') {
          alert('같은 아이디가 존재합니다.');
          return;
        }
      }
    } catch (error) {
      console.log('error : ', error);
      onFail();
    }
  },
  getAdmin: async (adminId: any, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/admin/detail/${adminId}`);
      console.log('get admin result : ', result);
      onSuccess(result.data);
    } catch (error) {
      console.log('error : ', error);
      onFail();
    }
  },
  list: async (param: any) => {
    try {
      const result = await requests.post('/admin/list', param, {
        'Content-Type': 'application/json'
      });
      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        console.log('조회결과 없음');
        return result;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('get admin list error : ', error);
    }
  },
  updateAdmin: async (param: UpdateAdminParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/admin/update', param);
      console.log('update res : ', response);
      onSuccess(response);
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  deleteAdmin: async (adminId: string, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/admin/delete', { adminId: adminId });
      console.log('delete admin res : ', response);
      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  logout: async ({ onSuccess, onFail }: any) => {
    try {
      const result = await requests.post('/admin/logout', {});
      console.log('logout reuslt : ', result);
      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  updatePassword: async (param: any, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/admin/change/pwd', param);
      console.log('change password response : ', response);

      if (response.status === 200) {
        if (response.data && response.data.ERROR && response.data.ERROR === 'AUTH0001') {
          alert('인증실패입니다.');
          return;
        } else {
          onSuccess(response);
        }
      } else {
        onFail();
      }
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  updatePasswordByMaster: async (param: any, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.put('/admin/change/master-pwd', param);
      console.log('change password reuslt : ', result);
      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  updateEditorPasswordByMaster: async (param: any, { onSuccess, onFail }: any) => {
    try {
      await requests.put('/admin/change/editor-pwd', param);
      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  }
};

const EditorMyPageRequestHandler = {
  getMyPageBasicInfo: async (adminId: string, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/editor/mypage/${adminId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('error : ', error);
    }
  },
  getEditorPostList: async (userId: string, param: any) => {
    try {
      const result = await requests.post(`/editor/${userId}/post`, param, {
        'Content-Type': 'application/json'
      });

      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        console.log('조회결과 없음');
        return result;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('error : ', error);
    }
  },
  getEditorReplyList: async (userId: string, param: any) => {
    try {
      const result = await requests.post(`/editor/${userId}/reply`, param, {
        'Content-Type': 'application/json'
      });

      console.log('editor reply result : ', result);

      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        return;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('error : ', error);
    }
  }
};

const EditorRequestHandler = {
  addEditor: async (param: AddEditorParam, { onSuccess, onFail }: any) => {
    try {
      const response: any = await requests.post('/editor/add', param);

      if (response.data.adminId) {
        console.log('admidId : ', response.data.adminId);
        onSuccess();
      } else if (response.data && response.data.ERROR && response.data.ERROR === 'ADM0002') {
        alert('같은 아이디가 존재합니다.');
        return;
      } else {
        onFail(response.data);
      }
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  // getEditor: async (adminId: any, { onSuccess, onFail }: any) => {
  //   try {
  //     const result = await requests.get(`/editor/detail/${adminId}`);
  //     console.log('get editor result : ', result);
  //     onSuccess(result.data);
  //   } catch (error) {
  //     console.log('error : ', error);
  //     onFail();
  //   }
  // },
  getEditorByUserId: async (userId: any, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/editor/detail-by-userId/${userId}`);
      console.log('get editor by userId result : ', result);
      onSuccess(result.data);
    } catch (error) {
      console.log('error : ', error);
      onFail();
    }
  },
  list: async (param: any) => {
    try {
      const result = await requests.post('/editor/list', param, {
        'Content-Type': 'application/json'
      });

      if (result.data) {
        return result;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('get editor listß error : ', error);
      // onFail();
    }
  },
  getSummaryInfoList: async ({ onSuccess, onFail }: any) => {
    try {
      const result = await requests.get('/editor/list/summary');

      if (result.data && result.data.length > 0) {
        onSuccess(result.data);
      } else {
        onFail(result);
      }
    } catch (error) {
      console.log('getSummaryInfoList error : ', error);
    }
  },
  getEditorIdList: async (zoneId: any, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/zone/${zoneId}/editor-id-list`);

      if (result.data && result.data.length > 0) {
        onSuccess(result.data);
      } else if (result.data && result.data.length === 0) {
        onSuccess([]);
      } else {
        onFail(result);
      }
    } catch (error) {
      console.log('getSummaryInfoList error : ', error);
    }
  },
  updateEditor: async (param: UpdateEditorParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/editor/update', param);
      console.log('update editor res : ', response);

      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  updateEditorMyProfile: async (param: UpdateEditorMyProfileParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/editor/mypage/update', param);
      console.log('update mypage editor res : ', response);

      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  deleteEditor: async (userId: string, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/editor/delete', { userId: userId });
      console.log('delete editor res : ', response);

      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  }
};

const UserRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/user/list', param, {
        'Content-Type': 'application/json'
      });

      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        console.log('조회결과 없음');
        return result;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('get user list error : ', error);
    }
  },
  getUser: async (userId: string, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/user/${userId}/info`, {});

      if (result.data.userId) {
        onSuccess(result.data);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  },
  getUserPostList: async (userId: string, param: any) => {
    try {
      const result = await requests.post(`/user/${userId}/post`, param, {
        'Content-Type': 'application/json'
      });

      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        return result;
        // return alert('조회결과가 없습니다');
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('error : ', error);
    }
  },
  getUserReplyList: async (userId: string, param: any) => {
    try {
      const result = await requests.post(`/user/${userId}/reply`, param, {
        'Content-Type': 'application/json'
      });

      if (result.data.rowsCount && result.data.rowsCount > 0) {
        return result;
      } else if (result.data.rowsCount === 0) {
        return result;
      } else {
        return alert('오류입니다');
      }
    } catch (error) {
      console.log('error : ', error);
    }
  },
  getUserSuspendList: async (userId: string, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.get(`/user/${userId}/suspend`, {});

      if (result.data) {
        onSuccess(result.data);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  },
  updateUserType: async (param: UpdateUserTypeParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/user/update/type', param);
      console.log('update editor res : ', response);

      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  },
  updateUserStatus: async (param: UpdateUserStatusParam, { onSuccess, onFail }: any) => {
    try {
      const response = await requests.put('/user/update/status', param);

      onSuccess(response.data);
    } catch (error) {
      console.log('try catch error : ', error);
      onFail();
    }
  }
};

export { AdminRequstHandler, UserRequestHandler, EditorRequestHandler, EditorMyPageRequestHandler };
