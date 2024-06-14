import { makeAutoObservable } from 'mobx';

// const artist = [
//   { value: '12', title: '골든차일드' },
//   { value: '13', title: 'DRIPPIN' },
//   { value: '14', title: '이미주' },
//   { value: '15', title: '권은비' },
//   { value: '16', title: '남우현' }
// ];

// const userStatus = [
//   { value: 'normal', title: '정상' },
//   { value: 'expired', title: '탈퇴' },
//   { value: 'suspended', title: '정지' }
// ];

// const snsType = [
//   { value: 'E', title: '이메일' },
//   { value: 'T', title: '트위터' },
//   { value: 'G', title: '구글' },
//   { value: 'A', title: '애플' }
// ];

// const userType = [
//   { value: 'NORMAL', title: '일반' },
//   { value: 'ARTIST', title: '아티스트' }
// ];

class SearchOptionStore {
  keyword = '';
  listKey = '';
  // artistList = [7];
  artistList: any[] = [];
  userStatus: string[] = [];
  snsType: string[] = [];
  userType: string[] = [];

  artistZoneId = '';
  postType: string[] = [];
  postState: any[] = [];

  reportState: string[] = [];
  reportCount: number = 0;

  languageCode: string[] = [];
  noticeState: any[] = [];

  termsType = '';

  status: any[] = [];
  socialLoginType: any[] = [];

  bannerState: string[] = [];

  // tagState: string[] = [];
  tagStatus: any = 'all';

  missionState: string[] = [];
  missionType: string[] = [];

  // bannerState: string = '';

  isPeriodSearch = 'false';
  startDate: any = null;
  endDate: any = null;

  reportContentType: string = '';

  setIsPeriodSearch(val: boolean) {}

  setStartDate(val: any) {
    this.startDate = val;
  }

  setEndDate(val: any) {
    this.endDate = val;
  }

  setArtistList(artistDataList: any) {
    this.artistList = artistDataList;
  }

  listDataStore: any;
  constructor(listDataStore: any) {
    makeAutoObservable(this);
    this.listDataStore = listDataStore;
    // if (listKey === 'editor') {
    //   this.artistList = optionConstants('artist').map((el: any) => {
    //     el.checked = false;
    //     return el;
    //   });
    // }
  }

  setReportContentType(val: string) {
    this.reportContentType = val;
  }

  setArtistZoneId(val: string) {
    this.artistZoneId = val;
  }
  setTagStatus(val: string) {
    this.tagStatus = val;
  }
  getCheckedList(optionKey: string) {
    if (optionKey === 'artistList') {
      return this.artistList;
    }
    if (this.listDataStore.listKey === 'user') {
      if (optionKey === 'userStatus') {
        return this.userStatus;
      } else if (optionKey === 'snsType') {
        return this.snsType;
      } else if (optionKey === 'userType') {
        return this.userType;
      }
    } else if (this.listDataStore.listKey === 'post') {
      if (optionKey === 'postType') {
        return this.postType;
      } else if (optionKey === 'postState') {
        return this.postState;
      }
    } else if (this.listDataStore.listKey === 'reportPost') {
      if (optionKey === 'reportState') {
        return this.reportState;
      } else if (optionKey === 'reportCount') {
        return this.reportCount;
      }
    } else if (this.listDataStore.listKey === 'reportReply') {
      if (optionKey === 'reportState') {
        return this.reportState;
      } else if (optionKey === 'reportCount') {
        return this.reportCount;
      }
    } else if (this.listDataStore.listKey === 'notice') {
      if (optionKey === 'languageCode') {
        return this.languageCode;
      } else if (optionKey === 'noticeState') {
        return this.noticeState;
      }
    } else if (this.listDataStore.listKey === 'artistBanner') {
      if (optionKey === 'languageCode') {
        return this.languageCode;
      } else if (optionKey === 'bannerState') {
        return this.bannerState;
      }
    } else if (this.listDataStore.listKey === 'terms') {
      if (optionKey === 'languageCode') {
        return this.languageCode;
      }
    } else if (this.listDataStore.listKey === 'mission') {
      if (optionKey === 'missionState') {
        return this.missionState;
      } else if (optionKey === 'missionType') {
        return this.missionType;
      }
    } else if (this.listDataStore.listKey === 'tag') {
      if (optionKey === 'tagStatus') {
        return this.tagStatus;
      }
      // if (optionKey === 'tagState') {
      //   return this.tagState;
      // }
    }
  }

  changeArtistList(item: any) {
    const zoneId = item.value;
    if (this.artistList.includes(zoneId)) {
      this.artistList = this.artistList.filter((el: number) => {
        return el !== zoneId;
      });
    } else {
      this.artistList = [...this.artistList, zoneId];
    }
  }

  changeUserStatus(item: any) {
    const targatValue = item.value;
    if (this.userStatus.includes(targatValue)) {
      this.userStatus = this.userStatus.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.userStatus = [...this.userStatus, targatValue];
    }
  }

  changeLoginType(item: any) {
    const targatValue = item.value;
    if (this.snsType.includes(targatValue)) {
      this.snsType = this['snsType'].filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.snsType = [...this.snsType, targatValue];
    }
  }

  changeUserType(item: any) {
    const targatValue = item.value;

    if (this.userType.includes(targatValue)) {
      this.userType = this['userType'].filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.userType = [...this.userType, targatValue];
    }
  }
  changePostType(item: any) {
    const targatValue = item.value;

    if (this.postType.includes(targatValue)) {
      this.postType = this.postType.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.postType = [...this.postType, targatValue];
    }
  }
  changePostState(item: any) {
    const targatValue = item.value;

    if (this.postState.includes(targatValue)) {
      this.postState = this.postState.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.postState = [...this.postState, targatValue];
    }
  }
  changeLanguageCode(item: any) {
    const targatValue = item.value;

    if (this.languageCode.includes(targatValue)) {
      this.languageCode = this.languageCode.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.languageCode = [...this.languageCode, targatValue];
    }
  }
  changeNoticeState(item: any) {
    const targatValue = item.value;

    if (this.noticeState.includes(targatValue)) {
      this.noticeState = this.noticeState.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.noticeState = [...this.noticeState, targatValue];
    }
  }
  setTermsType(val: any) {
    this.termsType = val;
  }
  changeBannerState(item: any) {
    const targatValue = item.value;

    if (this.bannerState.includes(targatValue)) {
      this.bannerState = this.bannerState.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.bannerState = [...this.bannerState, targatValue];
    }
  }
  // changeTagState(item: any) {
  //   const targatValue = item.value;

  //   if (this.tagState.includes(targatValue)) {
  //     this.tagState = this.tagState.filter((el: string) => {
  //       return el !== targatValue;
  //     });
  //   } else {
  //     this.tagState = [...this.tagState, targatValue];
  //   }
  // }
  changeMissionState(item: any) {
    const targatValue = item.value;

    if (this.missionState.includes(targatValue)) {
      this.missionState = this.missionState.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.missionState = [...this.missionState, targatValue];
    }
  }
  changeMissionType(item: any) {
    const targatValue = item.value;

    if (this.missionType.includes(targatValue)) {
      this.missionType = this.missionType.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.missionType = [...this.missionType, targatValue];
    }
  }
  changeReportState(item: any) {
    const targatValue = item.value;

    if (this.reportState.includes(targatValue)) {
      this.reportState = this.reportState.filter((el: string) => {
        return el !== targatValue;
      });
    } else {
      this.reportState = [...this.reportState, targatValue];
    }
  }
  changeReportCount(item: any) {
    this.reportCount = item.value;
  }

  changeOptionValue(option: string, target: any) {
    switch (option) {
      case 'keyword':
        this.keyword = target;
        break;
      case 'artistList':
        this.changeArtistList(target);
        break;
      case 'userStatus':
        this.changeUserStatus(target);
        break;
      case 'snsType':
        this.changeLoginType(target);
        break;
      case 'userType':
        this.changeUserType(target);
        break;
      case 'postType':
        this.changePostType(target);
        break;
      case 'postState':
        this.changePostState(target);
        break;
      case 'reportState':
        this.changeReportState(target);
        break;
      case 'reportCount':
        this.changeReportCount(target);
        break;
      case 'languageCode':
        this.changeLanguageCode(target);
        break;
      case 'noticeState':
        this.changeNoticeState(target);
        break;
      case 'bannerState':
        this.changeBannerState(target);
        break;
      // case 'tagState':
      //   this.changeTagState(target);
      //   break;
      case 'missionState':
        this.changeMissionState(target);
        break;
      case 'missionType':
        this.changeMissionType(target);
        break;
      default:
        break;
    }
  }

  checkAll(optionKey: string) {
    switch (optionKey) {
      case 'artistList':
        this.artistList = [];
        break;
      case 'userType':
        this.userType = [];
        break;
      case 'snsType':
        this.snsType = [];
        break;
      case 'userStatus':
        this.userStatus = [];
        break;
      case 'languageCode':
        this.languageCode = [];
        break;
      case 'noticeState':
        this.noticeState = [];
        break;
      case 'bannerState':
        this.bannerState = [];
        break;
      // case 'tagState':
      //   this.tagState = [];
      //   break;
      case 'missionState':
        this.missionState = [];
        break;
      case 'missionType':
        this.missionType = [];
        break;
      default:
        break;
    }
  }

  getSearchOption(listKey: string) {
    let data: any = { keyword: this.keyword };
    if (listKey === 'editor') {
      data.artistList = this.artistList;
    } else if (listKey === 'user') {
      data.artistList = this.artistList;
      data.userType = this.userType;
      data.userStatus = this.userStatus;
      data.snsType = this.snsType;
    } else if (listKey === 'post') {
      data.artistList = this.artistList;
      data.postType = this.postType;
      data.postState = this.postState;
    } else if (listKey === 'reportPost') {
      data.artistList = this.artistList;
      data.reportState = this.reportState;
      data.reportCount = this.reportCount;

      if (this.startDate) {
        data.startDate = this.startDate;
        data.endDate = this.endDate;
      }
    } else if (listKey === 'reportReply') {
      data.artistList = this.artistList;
      data.reportState = this.reportState;
      data.reportCount = this.reportCount;

      if (this.startDate) {
        data.startDate = this.startDate;
        data.endDate = this.endDate;
      }
    } else if (listKey === 'album') {
      data.artistList = this.artistList;
    } else if (listKey === 'photoCard') {
      data.artistList = this.artistList;
    } else if (listKey === 'notice') {
      data.noticeState = this.noticeState;
      data.languageCode = this.languageCode;
    } else if (listKey === 'terms') {
      data.languageCode = this.languageCode;
      data.termsType = this.termsType;
    } else if (listKey === 'artistBanner') {
      data.bannerState = this.bannerState;
      data.languageCode = this.languageCode;
    } else if (listKey === 'tag') {
      if (this.tagStatus && this.tagStatus !== 'all') {
        data.searchStatus = this.tagStatus;
      }
    } else if (listKey === 'mission') {
      data.state = this.missionState;
      data.type = this.missionType;
    }
    return data;
  }
}

export default SearchOptionStore;
