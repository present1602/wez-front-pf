import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { BannerRequestHandler, FileRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';

class BannerFormStore {
  languageCode = '';

  constructor(languageCode: string) {
    this.languageCode = languageCode;
    makeAutoObservable(this);
  }

  artistList: any = [];
  title: any = '';
  bannerImageFile: any = null;
  bannerImageData: any = null;

  bannerId: any = null;
  bannerGroupId: any = null;

  actionType = 'OL'; // OL(outlink) / MV(in app) / NM(no link)
  // actionContentType = ''; // actionType이 MV일떄, ND: 공지 PD: 포스트
  actionContent: any = {}; //  attr : actionContentType -> ND: 공지 PD: 포스트 / postId or noticeId
  // actionContent: any = { type: '' }; //  attr : actionContentType -> ND: 공지 PD: 포스트 / postId or noticeId
  actionStartTs: any = new Date();
  actionEndTs: any = new Date();
  isActive: any = true;
  displayKeepState = 1;

  actionValue = '';

  // postId = '';
  // noticeId = '';

  // isUploading: boolean = false;

  actionPath = '';
  actionRadioValue = 'outlink';

  setBannerId(val: any) {
    this.bannerId = val;
  }
  setBannerGroupId(val: any) {
    this.bannerGroupId = val;
  }

  setTitle(val: any) {
    this.title = val;
  }

  setActionRadioValue(val: any) {
    this.actionRadioValue = val;
  }

  setActionPath(val: any) {
    this.actionPath = val;
  }

  setBannerImageFile(file: any) {
    this.bannerImageFile = file;
  }
  setBannerImageData(data: any) {
    this.bannerImageData = data;
  }

  setActionType(val: string) {
    this.actionType = val;
  }

  setActionContent(data: string) {
    this.actionContent = data;
  }
  setActionContentType(val: string, key: string) {
    this.actionContent.type = val;
  }
  setDisplayKeepState(val: any) {
    this.displayKeepState = val;
  }
  setActionContentId(contentId: string) {
    if (this.actionContent.type === 'ND') {
      this.actionContent.noticeId = contentId;
    } else if (this.actionContent.type === 'PD') {
      this.actionContent.postId = contentId;
    }
  }

  setActionContentPath(url: string) {
    this.actionContent.url = url;
  }

  setActionContentBody(data: any) {
    this.actionContent.text = data;
  }

  setActionValue(val: string) {
    this.actionValue = val;
  }
  // setIsUploading(val: boolean) {
  //   this.isUploading = val;
  // }

  // setPostId(val: any) {
  //   this.postId = val;
  // }
  // setNoticeId(val: any) {
  //   this.noticeId = val;
  // }

  setActionStartTs(val: string) {
    this.actionStartTs = val;
  }
  setActionEndTs(val: string) {
    this.actionEndTs = val;
  }
  setIsActive(val: any) {
    this.isActive = val;
  }

  setArtistList(data: any) {
    this.artistList = data;
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

  setMultipleItem(data: any) {
    for (let key in data) {
      switch (key) {
        case 'bannerGroupId':
          this.setBannerGroupId(data[key]);
          break;
        case 'title':
          this.setTitle(data[key]);
          break;
        case 'bannerImage':
          this.setBannerImageData(data[key]);
          break;
        case 'isActive':
          this.setIsActive(data[key]);
          break;
        case 'isKeep':
          if (data[key]) {
            this.setDisplayKeepState(1);
          } else {
            this.setDisplayKeepState(0);
          }
          break;
        case 'startDate':
          // const date = moment(data[key]).toDate();
          if (data[key]) {
            const startDate: any = new Date(data[key]);
            this.setActionStartTs(startDate);
          }
          // this.setActionStartTs(data[key]);
          break;
        case 'endDate':
          if (data[key]) {
            const endDate: any = new Date(data[key]);
            this.setActionEndTs(endDate);
          }
          // this.setActionEndTs(data[key]);
          break;
        case 'action':
          const actionData = data[key];
          if (actionData.type === 'OL') {
            this.setActionType('OL');
            this.setActionContentPath(actionData.contentPath);
            this.setActionRadioValue('outlink');
          } else if (actionData.type === 'MV') {
            this.setActionType('MV');
            if (actionData.contentType === 'PD') {
              const actionContent: any = { type: actionData.contentType, postId: actionData.contentPath };
              this.setActionRadioValue('post');
              this.setActionContent(actionContent);
            } else if (actionData.contentType === 'ND') {
              const actionContent: any = { type: actionData.contentType, noticeId: actionData.contentPath };
              this.setActionRadioValue('notice');
              this.setActionContent(actionContent);
            }
            this.setActionContentBody(actionData.contentText);
            // this.setAction
            // this.setActionStartTs(actionData.actionStartTs);
            // this.setActionEndTs(actionData.actionEndTs);
          } else if (actionData.actionType === 'NM') {
            this.setActionType('NM');
            this.setActionRadioValue('none');
          }

          break;
      }
    }
  }

  async submitCreate(artistCheckedList: number[], setBannerUploading: any, bannerGroupId?: string) {
    // 'bannerPairIdHead';
    //    zoneList  bannerImage  title   action   languageCode
    // action : type   contentType   contentPath   startDate   endDate

    // this.setIsUploading(true);

    let requestParam: any = {
      zoneList: artistCheckedList,
      title: this.title,
      languageCode: this.languageCode,
      isActive: this.isActive,
      displayKeepState: this.displayKeepState
    };

    if (bannerGroupId) {
      requestParam.bannerGroupId = bannerGroupId;
    } else if (this.bannerGroupId) {
      requestParam.bannerGroupId = this.bannerGroupId;
    }

    // c2) param & bannerGroupId check

    if (this.bannerImageFile) {
      // if (key === 'bannerPairIdHead') {
      //   requestParam.bannerPairIdHead = payload;
      // } else if (key === 'bannerPairId') {
      //   requestParam.bannerPaidId = payload;
      // }

      const fileResult = await FileRequestHandler.upload(this.bannerImageFile, 'banner', { onSuccess: (data: any) => console.log('success upload data : ', data) });
      console.log('bannerImage fileResult : ', fileResult);

      requestParam.bannerImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
      // c3) bannerImage check (ko banner)
    }

    // requestParam.title = this.title;
    // requestParam.languageCode = this.languageCode;
    let action: any = {
      type: this.actionType
    };

    if (!this.displayKeepState) {
      action.startDate = this.actionStartTs;
      action.endDate = this.actionEndTs;
    }

    if (this.actionType === 'MV' && (this.actionContent.type === 'PD' || this.actionContent.type === 'ND')) {
      action.contentType = this.actionContent.type;
    }
    if (this.actionType !== 'NM') {
      action.contentPath = this.actionPath;
    }

    requestParam.action = action;

    BannerRequestHandler.create(requestParam, {
      // onSuccess: () => {
      //   setBannerUploading(false);
      // },
      // onFail: () => {
      //   setBannerUploading(false);
      // }
      onSuccess: () => {
        setBannerUploading({ result: 'success', isUploading: false });
      },
      onFail: () => {
        setBannerUploading({ result: 'fail', isUploading: false });
      }
      // onSuccess: () => onProcessEnd(),
      // onFail: () => onProcessEnd({ result: 'fail', isUploading: false })
      // onSuccess: () => {
      //   // alert(`배너(${this.languageCode})를 생성하였습니다`);
      //   // this.setIsUploading(false);
      //   // alert(`배너를 생성하였습니다`);
      //   // AppHistory.push(`/content/banner`);
      // }
    });
  }

  async submitDelete(setBannerImageUrl: any) {
    const param = {
      languageCode: this.languageCode,
      bannerGroupId: this.bannerGroupId
    };
    BannerRequestHandler.deleteBanner(param, {
      onSuccess: (responseData: any) => {
        alert('배너를 삭제하였습니다.');

        setBannerImageUrl('');
        this.init();

        if (responseData === 0) {
          AppHistory.push('/content/banner/create', { replace: true });
        }
      }
    });
  }

  async submitUpdate(artistCheckedList: number[], setBannerUploading: any) {
    let requestParam: any = {
      zoneList: artistCheckedList,
      title: this.title,
      languageCode: this.languageCode,
      isActive: this.isActive,
      displayKeepState: this.displayKeepState,
      bannerGroupId: this.bannerGroupId
    };

    let action: any = {
      type: this.actionType
    };
    if (!this.displayKeepState) {
      action.startDate = this.actionStartTs;
      action.endDate = this.actionEndTs;
    }

    if (this.actionType === 'MV' && (this.actionContent.type === 'PD' || this.actionContent.type === 'ND')) {
      action.contentType = this.actionContent.type;
    }
    if (this.actionType !== 'NM') {
      action.contentPath = this.actionPath;
    }

    requestParam.action = action;

    if (this.bannerImageFile) {
      const fileResult = await FileRequestHandler.upload(this.bannerImageFile, 'banner', { onSuccess: (data: any) => console.log('success upload data : ', data) });
      console.log('bannerImage fileResult : ', fileResult);

      requestParam.bannerImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
      requestParam.bannerImage &&
        BannerRequestHandler.update(requestParam, {
          onSuccess: () => {
            setBannerUploading({ result: 'success', isUploading: false });
            this.init();
          },
          onFail: () => {
            setBannerUploading({ result: 'fail', isUploading: false });
          }
        });
    } else {
      requestParam.mediaId = this.bannerImageData.mediaId;
      BannerRequestHandler.update(requestParam, {
        onSuccess: () => {
          setBannerUploading({ result: 'success', isUploading: false });
          this.init();
        },
        onFail: () => {
          setBannerUploading({ result: 'fail', isUploading: false });
        }
      });
    }
  }

  init() {
    // this.languageCode = '';
    this.artistList = [];
    this.title = '';
    this.bannerImageFile = null;
    this.bannerImageData = null;
    this.bannerId = null;
    this.bannerGroupId = null;
    this.displayKeepState = 1;
    this.actionType = 'OL'; // OL(outlink) / MV(in app) / NM(no link)
    this.actionContent = {}; //  attr : actionContentType -> ND: 공지 PD: 포스트 / postId or noticeId
    this.actionStartTs = new Date();
    this.actionEndTs = new Date();
    this.isActive = true;
    this.actionValue = '';
    this.actionPath = '';
    this.actionRadioValue = 'outlink';
  }
}

export default BannerFormStore;
