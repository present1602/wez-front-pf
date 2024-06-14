import { CreatePostReplyParam, UpdatePostStateParam } from '../types/post';
import { requests } from './requests';

const DashboardRequestHandler = {
  getSummaryData: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/dashboard/summary', {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  },
  getUserPeriodicData: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/dashboard/member/period', param);
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  },
  getArtistZoneUserData: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/dashboard/member/artist', {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  },
  getPostPeriodicData: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/dashboard/post/period', param);
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  },
  getArtistZonePostData: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/dashboard/post/artist', {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  }
};

const ZoneRequestHandler = {
  fetchArtistList: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/zone/list/summary', {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch zone summarylist error : ', error);
    }
  },
  getArtistListSummaryByEditor: async (adminId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/zone/list/summary/${adminId}`, {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistlist error : ', error);
    }
  },
  getArtistOptionListOfEditor: async (adminId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/zone/list/option/${adminId}`, {});
      onSuccess(result.data);
    } catch (error: any) {
      console.log('fetch artistOptionListOfEditor error : ', error);
    }
  },
  createZone: async (param: any, { onSuccess }: any) => {
    try {
      await requests.post('/zone/create', param);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('submit CreateZone error : ', error);
    }
  },
  updateZone: async (param: any, { onSuccess }: any) => {
    try {
      await requests.put('/zone/update', param);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('submit update zone error : ', error);
    }
  },
  list: async () => {
    try {
      const result = await requests.get('/zone/list', {});
      // onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get zone list error : ', error);
    }
  },
  getDetailInfo: async (zoneId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/zone/${zoneId}/detail`, {});
      onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get zone DetailInfo error : ', error);
    }
  },
  getZone: async (zoneId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/zone/${zoneId}`, {});
      onSuccess(result.data);
      // return result;
    } catch (error) {
      console.log('getZone error : ', error);
    }
  },
  updateArtistActiveState: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.put('/zone/update/state', param);
      onSuccess(result.data);
      // return result;
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('updateArtistActiveState error : ', error);
    }
  },
  saveZoneSns: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/zone/sns/save', param);
      onSuccess(result.data);
      // return result;
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('saveZoneSns error : ', error);
    }
  },
  getZoneSnsList: async (zoneId: any, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/zone/${zoneId}/sns/list`, {});

      onSuccess(result.data);
      // return result;
    } catch (error) {
      console.log('getZoneSnsList error : ', error);
    }
  }
};

const FileRequestHandler = {
  upload: async (file: any, dir: string, { onSuccess }: any) => {
    let data: any = new FormData();

    data.append('file', file);
    data.append('dir', dir);

    try {
      const result = await requests.post('/upload/image', data, { 'Content-type': 'multipart/form-data' });
      if (result.data.name && result.data.url) {
        return result.data;
      }

      console.log('upload result : ', result);
    } catch (error) {
      alert('파일 업로드 에러입니다.');
      console.log('submit upload image error : ', error);
    }
  }
  // uploadEditorImage: async (file: any, dir: string) => {
  //   let data: any = new FormData();

  //   data.append('file', file);
  //   data.append('dir', dir);
  //   try {
  //     const result = await requests.post('/upload/image', data, { 'Content-type': 'multipart/form-data' });
  //     if (result.data.name && result.data.url) {
  //       let link = `${IMAGE_PROXY_SERVER_URL}/150/${MEDIA_BASE_URL}/${result.data.url}`;
  //       result.data.link = link;
  //       return result.data;
  //     }

  //     console.log('htmlt image upload result : ', result);
  //   } catch (error) {
  //     console.log('submit html image upload error : ', error);
  //   }
  // }
};

const PostRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/post/list', param);
      // onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get error : ', error);
    }
  },
  create: async (param: any, { onSuccess }: any) => {
    try {
      const response = await requests.post('/post/create', param);
      if (response.status === 200) {
        if (response.data && response.data.ERROR && response.data.ERROR === 'BADW0001') {
          alert('금지단어가 포함되어 있습니다.');
          return;
        } else {
          onSuccess();
        }
      } else {
        alert('서버 응답 에러입니다.');
      }
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('create post error : ', error);
    }
  },
  update: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/post/update', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update post error : ', error);
    }
  },
  getPost: async (postId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/post/${postId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },
  getPostReplyList: async (postId: string, param: any) => {
    try {
      const result = await requests.post(`/post/${postId}/reply`, param);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },

  getPostReplyOfEditor: async (postId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/post/${postId}/reply/editor`, {});
      onSuccess(result.data);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },
  getPostLikeList: async (postId: string, param: any) => {
    try {
      const result = await requests.post(`/post/${postId}/like`, param);
      // onSuccess(result.data);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },
  getPostReportList: async (postId: string, param: any) => {
    try {
      const result = await requests.post(`/post/${postId}/report`, param);
      // onSuccess(result.data);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('getpost report error : ', error);
    }
  },
  getReplyReportList: async (replyId: string, param: any) => {
    try {
      const result = await requests.post(`/post/reply/${replyId}/report/list`, param);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },
  updatePostState: async (param: UpdatePostStateParam, { onSuccess, onFail }: any) => {
    try {
      await requests.put('/post/update/state', param);
      // console.log('update post state res : ', response);

      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
      onFail();
    }
  },
  createPostReply: async (param: CreatePostReplyParam, { onSuccess, onFail }: any) => {
    try {
      const response: any = await requests.post('/post/reply/create', param);

      if (response.status === 200) {
        if (response.data && response.data.ERROR && response.data.ERROR === 'BADW0001') {
          alert('금지단어가 포함되어 있습니다.');
          return;
        } else {
          onSuccess();
        }
      } else {
        alert('서버 응답 에러입니다.');
      }
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
      onFail();
    }
  },
  changePostReplyDisplayState: async (param: any, { onSuccess, onFail }: any) => {
    try {
      await requests.put('/post/reply/update/display-state', param);
      // console.log('change postreply display state res : ', response);

      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
      onFail();
    }
  },

  delete: async (postId: string, { onSuccess, onFail }: any) => {
    try {
      await requests.put(`/post/${postId}/delete`, {});
      // console.log('delete postreply res : ', response);

      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
      onFail();
    }
  }
};

const ReportRequestHandler = {
  getReportPostList: async (param: any) => {
    try {
      const result = await requests.post('/report/list/post', param);
      // onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get error : ', error);
    }
  },
  getReportReplyList: async (param: any) => {
    try {
      const result = await requests.post('/report/list/reply', param);
      // onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get error : ', error);
    }
  },
  confirmReport: async (reportId: any) => {
    try {
      const result = await requests.put(`/report/${reportId}/confirm`, {});
      // console.log('confirm report result: ', result);
      return result;
    } catch (error) {
      console.log('confirm report error : ', error);
    }
  }
};

const AlbumRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/album/list', param);
      return result;
    } catch (error) {
      console.log('get error : ', error);
    }
  },
  create: async (param: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/album/create', param);
      console.log('create album res : ', response);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
    }
  },
  getAlbum: async (albumId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/album/${albumId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('create post error : ', error);
    }
  },
  update: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/album/update', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update post error : ', error);
    }
  },
  delete: async (albumId: string, { onSuccess }: any) => {
    try {
      const result = await requests.put(`/album/${albumId}/delete`, {});
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update post error : ', error);
    }
  }
};
const PhotoCardRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/photocard/list', param);
      return result;
    } catch (error) {
      console.log('get photocard list error : ', error);
    }
  },
  create: async (param: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/photocard/create', param);
      console.log('create photocard res : ', response);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
    }
  },
  getPhotoCard: async (albumId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/photocard/${albumId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('create photocard error : ', error);
    }
  },
  update: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/photocard/update', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update photocard error : ', error);
    }
  },
  delete: async (photoCardId: any, { onSuccess }: any) => {
    try {
      await requests.put(`/photocard/${photoCardId}/delete`, {});
      onSuccess();
      // onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update photocard error : ', error);
    }
  }
};
const NoticeRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/notice/list', param);
      return result;
    } catch (error) {
      console.log('get notice list error : ', error);
    }
  },
  create: async (param: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/notice/create', param);
      console.log('create notice res : ', response);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
    }
  },
  getNotice: async (noticeId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/notice/${noticeId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('get notice error : ', error);
    }
  },
  getNoticeDetail: async (noticeId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/notice/${noticeId}/detail`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('get notice detail error : ', error);
    }
  },
  update: async (noticeId: string, { onSuccess }: any) => {
    try {
      const result = await requests.put('/notice/update', noticeId);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update notice error : ', error);
    }
  },
  updateNoticeState: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.put('/notice/update/state', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update notice error : ', error);
    }
  }
};

const TermsRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/terms/list', param);
      return result;
    } catch (error) {
      console.log('get terms list error : ', error);
    }
  },
  create: async (param: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/terms/create', param);
      console.log('create terms res : ', response);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('try catch error : ', error);
    }
  },
  getTerms: async (termsId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/terms/${termsId}/info`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('get terms error : ', error);
    }
  },
  update: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.put('/terms/update', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update terms error : ', error);
    }
  },
  delete: async (termsId: string, { onSuccess }: any) => {
    try {
      const result = await requests.put(`/terms/${termsId}/delete`, {});
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('delete terms error : ', error);
    }
  }
};

const BannerRequestHandler = {
  getArtistBannerList: async (zoneId: any, param: any) => {
    try {
      const result = await requests.post(`/banner/list/${zoneId}`, param);
      return result;
    } catch (error) {
      console.log('get banner list error : ', error);
    }
  },
  getGroupCountList: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/banner/group-summary-list', {});

      onSuccess(result.data);
    } catch (error) {
      console.log('get banner list error : ', error);
    }
  },
  getArtistActiveBannerList: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post(`/banner/list/active`, param);
      onSuccess(result.data);
    } catch (error) {
      console.log('get banner list error : ', error);
    }
  },
  create: async (param: any, { onSuccess, onFail }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/banner/create', param);
      console.log('create banner res : ', response);

      if (response.status === 200) {
        if (response.data && response.data.ERROR) {
          alert(`배너 생성${param.languageCode}에 실패했습니다.`);
          onFail();
        } else {
          onSuccess();
        }
      }
    } catch (error) {
      console.log('try catch error : ', error);
      alert('배너 생성에 실패했습니다.');
      onFail();
    }
  },
  update: async (param: any, { onSuccess, onFail }: any) => {
    try {
      // c2-3) param 체크
      const response = await requests.post('/banner/update', param);
      console.log('update banner res : ', response);

      if (response.status === 200) {
        if (response.data && response.data.ERROR) {
          alert(`저장${param.languageCode}에 실패했습니다.`);
          onFail();
        } else {
          onSuccess();
        }
      }
    } catch (error) {
      alert(`저장에 실패했습니다.`);
      onFail();
      console.log('try catch error : ', error);
    }
  },
  reorder: async (param: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.post('/banner/list/reorder', param);
      console.log('banner list reorder res : ', response);
      onSuccess();
    } catch (error) {
      console.log('try catch error : ', error);
    }
  },
  getBannerZoneList: async (bannerGroupId: any, { onSuccess }: any) => {
    try {
      // 3) param 체크
      const response = await requests.get(`/banner/${bannerGroupId}/zone-list`, {});
      console.log('banner bannerGroupId zone list res : ', response);
      onSuccess(response.data);
    } catch (error) {
      console.log('try catch error : ', error);
    }
  },
  getBanner: async (param: any, { onSuccess }: any) => {
    try {
      const response = await requests.get(`/banner/${param.bannerGroupId}/${param.languageCode}`, {});
      onSuccess(response.data);
    } catch (error) {
      console.log('try catch error : ', error);
    }
  },
  deleteBanner: async (param: any, { onSuccess }: any) => {
    try {
      const response = await requests.post('/banner/delete', param);
      onSuccess(response.data);
    } catch (error) {
      console.log('try catch error : ', error);
    }
  }
};

const SettingsRequestHandler = {
  getAppVerionList: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/settings/app/version/list', {});
      onSuccess(result.data);
      return result;
    } catch (error) {
      console.log('get app version list error : ', error);
    }
  }
};

const TagRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/tag/list', param);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('get app version list error : ', error);
    }
  },
  update: async (data: any, { onSuccess }: any) => {
    try {
      const response = await requests.post('/tag/hide', data);
      if (response.data && response.data.ERROR) {
        alert('태그 상태 변경에 실패했습니다.');
      } else {
        onSuccess();
      }
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('get app version list error : ', error);
    }
  }
};

const MissionRequestHandler = {
  list: async (param: any) => {
    try {
      const result = await requests.post('/mission/list', param);
      return result;
      // onSuccess(result.data);
    } catch (error) {
      console.log('get mission list error : ', error);
    }
  },
  getMission: async (missionId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/mission/${missionId}`, {});
      onSuccess(result.data);
      // return result;
    } catch (error) {
      console.log('get mission error : ', error);
    }
  },

  updateMissionPoint: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.put('/mission/update/point', param);
      onSuccess(result.data);
      // return result;
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('update mission point error : ', error);
    }
  }
};
const ChatRequestHandler = {
  openRoomList: async ({ onSuccess }: any) => {
    try {
      const result = await requests.get('/chat/open/room/list', {});
      onSuccess(result.data);
    } catch (error) {
      console.log('get openRoomList error : ', error);
    }
  },
  createOpenChat: async (param: any, { onSuccess, onFail }: any) => {
    try {
      const result = await requests.post('/chat/open/create', param);
      if (!result || !result.data) {
        alert('채팅방 생성에 실패했습니다.');
        return;
      } else if (result.data && result.data.ERROR && result.data.ERROR === 'CHAT0005') {
        alert('이미 해당 존으로 개설된 채팅방이 있습니다.');
        return;
      }
      onSuccess(result.data);
    } catch (error) {
      onFail();
      console.log('createOpenChat error : ', error);
    }
  },
  getChatRoomInfo: async (chatRoomId: string, { onSuccess }: any) => {
    try {
      const result = await requests.get(`/chat/open/room/${chatRoomId}`, {});
      onSuccess(result.data);
    } catch (error) {
      console.log('getChatRoomInfo error : ', error);
    }
  },
  getOpenChatMsgList: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/chat/open/msg/list', param);
      console.log('getOpenChatMsgList result:  ', result);
      onSuccess(result.data);
    } catch (error) {
      console.log('getOpenChatMsgList  error : ', error);
    }
  },
  getOpenChatUserList: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/chat/open/user/list', param);
      console.log('getOpenChatUserList result: ', result);
      onSuccess(result.data);
    } catch (error) {
      console.log('getOpenChatUserList  error : ', error);
    }
  },
  banUser: async (param: any, { onSuccess }: any) => {
    try {
      const response = await requests.post('/chat/open/ban', param);
      console.log('유저 강퇴 response : ', response);
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('getOpenChatUserList  error : ', error);
    }
  },
  banListOfUser: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.post('/chat/open/ban/list-of-user', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('getOpenChatUserList  error : ', error);
    }
  },
  updateOpenRoom: async (param: any, { onSuccess }: any) => {
    try {
      const result = await requests.put('/chat/open/update', param);
      onSuccess(result.data);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('getOpenChatUserList  error : ', error);
    }
  },
  deleteChatOpenRoom: async (chatRoomId: any, { onSuccess }: any) => {
    try {
      await requests.put(`/chat/open/delete/${chatRoomId}`, {});
      onSuccess();
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('getOpenChatUserList  error : ', error);
    }
  }
};

const ForbiddenWordRequestHandler = {
  upload: async (file: any, zoneId: string, { onSuccess }: any) => {
    let data: any = new FormData();

    data.append('file', file);

    data.append('zoneId', zoneId || 'all');

    try {
      const result = await requests.post('/badword/upload', data, { 'Content-type': 'multipart/form-data' });
      // if (result.data.name && result.data.url) {
      //   return result.data;
      // }
      onSuccess();

      console.log('upload result : ', result);
    } catch (error) {
      alert('서버 응답 에러입니다.');
      console.log('submit upload image error : ', error);
    }
  },
  list: async (param: any) => {
    try {
      const result = await requests.post('/badword/list/', param);

      return result;
    } catch (error) {
      console.log('get banner list error : ', error);
    }
  }
};

export {
  DashboardRequestHandler,
  ZoneRequestHandler,
  PostRequestHandler,
  FileRequestHandler,
  ReportRequestHandler,
  AlbumRequestHandler,
  PhotoCardRequestHandler,
  NoticeRequestHandler,
  TermsRequestHandler,
  BannerRequestHandler,
  SettingsRequestHandler,
  TagRequestHandler,
  MissionRequestHandler,
  ChatRequestHandler,
  ForbiddenWordRequestHandler
};
