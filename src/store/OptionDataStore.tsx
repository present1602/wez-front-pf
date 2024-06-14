import { makeAutoObservable } from 'mobx';
import { isPersisting, makePersistable } from 'mobx-persist-store';

export const data = {
  USER_STATUS: [
    { value: 'normal', text: '정상' },
    { value: 'expired', text: '탈퇴' },
    { value: 'suspended', text: '정지' }
  ],
  LANGUAGE: [
    { value: 'ko', text: '한국어' },
    { value: 'en', text: '영어' }
  ],

  SNS_TYPE: [
    { value: 'E', text: '이메일' },
    { value: 'T', text: '트위터' },
    { value: 'G', text: '구글' },
    { value: 'A', text: '애플' }
  ],

  USER_TYPE: [
    { value: 'NORMAL', text: '일반' },
    { value: 'ARTIST', text: '아티스트' }
  ],
  POST_TYPE: [
    { value: 'ARTIST', text: '아티스트' },
    { value: 'OFFICIAL', text: '오피셜' },
    { value: 'NORMAL', text: '팬' }
  ],
  POST_STATE: [
    { value: false, text: '정상' },
    { value: true, text: '숨김' }
  ],
  REPORT_STATE: [
    { value: 0, text: '노출' },
    { value: 1, text: '숨김' }
  ],
  NOTICE_STATE: [
    { value: 0, text: '노출' },
    { value: 1, text: '숨김' }
  ],
  TERMS_STATE: [
    { value: 0, text: '노출' },
    { value: 1, text: '숨김' }
  ],
  MISSION_STATE: [
    { value: 1, text: '노출' },
    { value: 0, text: '숨김' }
  ],
  MISSION_TYPE: [
    { value: 'D', text: '일일미션' },
    { value: 'F', text: '고정미션' }
  ],
  BANNER_STATE: [
    { value: 'display', text: '노출' },
    { value: 'hidden', text: '숨김' },
    { value: 'expired', text: '종료' }
  ],

  TAG_STATE: [
    { value: 'on', text: '노출' },
    { value: 'off', text: '비노출' },
    { value: 'hide', text: '숨김' }
  ],

  REPORT_COUNT: [{ value: '10', text: '10회 이상' }],
  COUNTRY: [{ value: 'kr', text: '한국' }]
};

class OptionDataStore {
  artistList: any = [];

  setArtistList(data: any) {
    this.artistList = data;
    window.localStorage.setItem('artistList', JSON.stringify(data));
  }
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: 'AppStorage', properties: ['artistList'], storage: window.localStorage });
  }

  get isPersisting() {
    return isPersisting(this);
  }

  getOptionData(optionKey: string) {
    if (optionKey === 'userStatus') {
      return data.USER_STATUS;
    } else if (optionKey === 'snsType') {
      return data.SNS_TYPE;
    } else if (optionKey === 'userType') {
      return data.USER_TYPE;
    } else if (optionKey === 'country') {
      return data.COUNTRY;
    } else if (optionKey === 'postType') {
      return data.POST_TYPE;
    } else if (optionKey === 'postState') {
      return data.POST_STATE;
    } else if (optionKey === 'reportState') {
      return data.REPORT_STATE;
    } else if (optionKey === 'reportCount') {
      return data.REPORT_COUNT;
    } else if (optionKey === 'languageCode') {
      return data.LANGUAGE;
    } else if (optionKey === 'noticeState') {
      return data.NOTICE_STATE;
    } else if (optionKey === 'termsState') {
      return data.TERMS_STATE;
    } else if (optionKey === 'bannerState') {
      return data.BANNER_STATE;
    } else if (optionKey === 'missionState') {
      return data.MISSION_STATE;
    } else if (optionKey === 'missionType') {
      return data.MISSION_TYPE;
    } else if (optionKey === 'tagState') {
      return data.TAG_STATE;
    } else if (optionKey === 'artistList') {
      return this.artistList;
      // if (this.artistList.length === 0) {
      //   const artistListFromRequest = await requests.get('/zone/list/summary', {});
      //   return artistListFromRequest;
      // } else {
      //   return this.artistList;
      // }
    }
  }
}

export default OptionDataStore;
