import { makeAutoObservable, runInAction } from 'mobx';
import { AdminRequstHandler, EditorRequestHandler, UserRequestHandler } from '../api/member';
import moment from 'moment';
import SearchOptionStore from './SearchOptionStore';
import {
  PostRequestHandler,
  ZoneRequestHandler,
  ReportRequestHandler,
  AlbumRequestHandler,
  PhotoCardRequestHandler,
  NoticeRequestHandler,
  BannerRequestHandler,
  TermsRequestHandler,
  TagRequestHandler,
  MissionRequestHandler,
  ForbiddenWordRequestHandler
} from '../api/content';

class ListDataStore {
  listKey = '';

  searchOptionStore: any;
  isSearchable: boolean;
  isPaging = true;

  constructor(listKey: string, isSearchable: boolean, isPaging: boolean) {
    this.searchOptionStore = new SearchOptionStore(this);
    this.isSearchable = isSearchable;
    this.listKey = listKey;
    this.isPaging = isPaging;
    makeAutoObservable(this);
  }

  rowsPerPage = 20;
  listData = [];
  page = 1;
  totalCount = 0;
  keyword = '';
  sort = {
    direction: 'DESC',
    id: 'created'
  };

  zoneId = '';
  type: any = 0;

  pageTotalCount = 1;

  searchOption: any = {};

  setZoneId(val: string) {
    this.zoneId = val;
  }
  setType(val: string) {
    this.type = val;
  }

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

  setKeyword(val: string) {
    this.searchOption.keyword = val;
  }

  async requestData(listKey: string, param: any) {
    if (listKey === 'admin') {
      return await AdminRequstHandler.list(param);
    } else if (listKey === 'editor') {
      return await EditorRequestHandler.list(param);
    } else if (listKey === 'user') {
      return await UserRequestHandler.list(param);
    } else if (listKey === 'zone') {
      return await ZoneRequestHandler.list();
    } else if (listKey === 'post') {
      return await PostRequestHandler.list(param);
    } else if (listKey === 'reportPost') {
      return await ReportRequestHandler.getReportPostList(param);
    } else if (listKey === 'reportReply') {
      return await ReportRequestHandler.getReportReplyList(param);
    } else if (listKey === 'album') {
      return await AlbumRequestHandler.list(param);
    } else if (listKey === 'photoCard') {
      return await PhotoCardRequestHandler.list(param);
    } else if (listKey === 'notice') {
      return await NoticeRequestHandler.list(param);
    } else if (listKey === 'terms') {
      return await TermsRequestHandler.list(param);
    } else if (listKey === 'artistBanner') {
      return await BannerRequestHandler.getArtistBannerList(this.zoneId, param);
    } else if (listKey === 'tag') {
      param.zoneId = this.zoneId;
      return await TagRequestHandler.list(param);
    } else if (listKey === 'mission') {
      return await MissionRequestHandler.list(param);
    } else if (listKey === 'forbidden-word') {
      param.zoneId = this.zoneId || 'all';
      return await ForbiddenWordRequestHandler.list(param);
    }
  }

  async fetchListData() {
    let param: any = this.isSearchable ? this.searchOptionStore.getSearchOption(this.listKey) : {}; // 이부분

    if (this.isPaging) {
      const pagingOption = {
        rowsPerPage: this.rowsPerPage,
        page: this.page,
        sort: this.sort
      };

      param.pagingOption = pagingOption;
    }

    const result: any = await this.requestData(this.listKey, param);

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
          item.lastLogin = moment(item.lastLogin).format('YYYY.MM.DD HH:m:ss');
        }
        if (item.updated) {
          item.updated = moment(item.updated).format('YYYY.MM.DD HH:m:ss');
        }
        return item;
      });
    });
  }

  init() {
    if (this.isPaging) {
      this.rowsPerPage = 20; // paging
      this.page = 1; // paging
    }

    this.totalCount = 0;

    if (this.isSearchable) {
      this.keyword = ''; //searchopion
      this.searchOption = {}; //searchopion
      this.searchOptionStore = new SearchOptionStore(this);
    }
    // this.searchOptionStore = new SearchOptionStore('editor'); //searchopion

    this.fetchListData();
  }
}

export default ListDataStore;
