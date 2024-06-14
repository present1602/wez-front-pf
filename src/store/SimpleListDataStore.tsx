import { makeAutoObservable, runInAction } from 'mobx';
import { EditorMyPageRequestHandler, UserRequestHandler } from '../api/member';
import moment from 'moment';
import { PostRequestHandler } from '../api/content';

class SimpleListDataStore {
  listKey = '';
  isPaging = true;
  zoneId = '';
  userId = '';
  requestPath = '';

  postId = '';
  replyId = '';

  constructor(listKey: string, isPaging: boolean) {
    this.listKey = listKey;
    this.isPaging = isPaging;
    makeAutoObservable(this);
  }

  rowsPerPage = 10;
  listData = [];
  page = 1;
  totalCount = 0;

  setZoneId(val: string) {
    this.zoneId = val;
  }
  setUserId(val: string) {
    this.userId = val;
  }
  setPostId(val: string) {
    this.postId = val;
  }
  setReplyId(val: string) {
    this.replyId = val;
  }

  pageTotalCount = 1;

  setListKey(val: string) {
    this.listKey = val;
  }

  setRowsPerPage(val: any) {
    this.rowsPerPage = val;
    this.pageTotalCount = Math.ceil(this.totalCount / this.rowsPerPage);
  }

  setPage(page: number) {
    this.page = page;
  }

  setTotalCount(cnt: number) {
    this.totalCount = cnt;
  }

  async requestData(param: any) {
    if (this.listKey === 'userPost') {
      return await UserRequestHandler.getUserPostList(this.userId, param);
    } else if (this.listKey === 'userReply') {
      return await UserRequestHandler.getUserReplyList(this.userId, param);
    } else if (this.listKey === 'postReply') {
      return await PostRequestHandler.getPostReplyList(this.postId, param);
    } else if (this.listKey === 'postLike') {
      return await PostRequestHandler.getPostLikeList(this.postId, param);
    } else if (this.listKey === 'postReport') {
      return await PostRequestHandler.getPostReportList(this.postId, param);
    } else if (this.listKey === 'editorPost' || this.listKey === 'editorMyPagePost') {
      return await EditorMyPageRequestHandler.getEditorPostList(this.userId, param);
    } else if (this.listKey === 'editorReply' || this.listKey === 'editorMyPageReply') {
      return await EditorMyPageRequestHandler.getEditorReplyList(this.userId, param);
    } else if (this.listKey === 'replyReport') {
      return await PostRequestHandler.getReplyReportList(this.replyId, param);
    }
  }

  async fetchListData() {
    let param: any = {};

    if (this.isPaging) {
      const pagingOption = {
        rowsPerPage: this.rowsPerPage,
        page: this.page
      };

      param.pagingOption = pagingOption;
    }

    if (this.zoneId !== '') {
      param.zoneId = this.zoneId;
    }

    // let result: any;
    // result = await AdminRequstHandler.list(param, (res: any) => {
    //   console.log(res);
    // });

    const result: any = await this.requestData(param);
    // const result: any = await this.requestData('admin', param);

    if (!result) {
      return;
    }

    runInAction(() => {
      this.listData = result.data.items;
      this.totalCount = result.data.rowsCount;

      this.pageTotalCount = Math.ceil(this.totalCount / this.rowsPerPage);

      this.listData.map((item: any, index: number) => {
        if (this.isPaging) {
          if (this.totalCount % this.rowsPerPage) {
            item.rowNumber = (this.pageTotalCount - this.page) * this.rowsPerPage + (this.totalCount % this.rowsPerPage) - index;
          } else {
            item.rowNumber = (this.pageTotalCount - this.page + 1) * this.rowsPerPage + (this.totalCount % this.rowsPerPage) - index;
          }
        } else {
          item.rowNumber = this.totalCount - index;
        }

        item.created = moment(item.created).format('YYYY.MM.DD HH:m:ss');
        if (item.lastLogin) {
          item.lastLogin = moment(item.created).format('YYYY.MM.DD HH:m:ss');
        }
        if (item.updated) {
          item.updated = moment(item.created).format('YYYY.MM.DD HH:m:ss');
        }
        return item;
      });
    });
  }

  init() {
    if (this.isPaging) {
      this.rowsPerPage = 10; // paging
      this.page = 1; // paging
    }
    this.zoneId = '';
    this.totalCount = 0;
    this.listData = [];

    this.fetchListData();
  }
}

export default SimpleListDataStore;
