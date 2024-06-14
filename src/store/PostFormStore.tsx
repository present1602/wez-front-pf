import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { FileRequestHandler, PostRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';
import util from '../helper/util';

export const HOUR_OPTIONS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export const MINUTE_OPTIONS = ['00', '10', '20', '30', '40', '50'];

class PostFormStore {
  formType = '';

  constructor(formType: string) {
    // this.rootStore = rootStore;
    this.formType = formType;
    makeAutoObservable(this);
  }
  // 사진리스트 텍스트 동영상 발행시간(즉시 vs 예약)
  artistOptionList = [];
  postId = '';
  zoneId = ''; // zoneId, imageFileList, content, displayDate, videoFile, videoThumbnailFile
  imageFileList: any = [];
  adminId: string = '';
  content = '';
  displayDate: any = {}; // isDisplayTimeSet, displayTime: xxxx-xx-xx xx:xx:xx

  nickName = '';

  type: string = '';

  postState: number = 1;

  displayDateElement: any = {
    yearMonthDay: new Date(),
    hour: HOUR_OPTIONS[0],
    minute: MINUTE_OPTIONS[0]
  };

  displayTimeSet = 'F';
  videoFile: any = null; //

  setPostId(val: string) {
    this.postId = val;
  }

  setType(val: string) {
    this.type = val;
  }

  setPostState(val: number) {
    this.postState = val;
  }

  setNickName(val: string) {
    this.nickName = val;
  }

  setDisplayDateElement(elementKey: string, val: string) {
    this.displayDateElement[elementKey] = val;
    // switch (elementKey) {
    //   case 'yearMonthDay':
    //     this.displayDateElement.yearMonthDay = val;
    //     break;
    //   case 'hour':
    //     this.displayDateElement.hour = val;
    //     break;
    //   case 'minute':
    //     this.displayDateElement.minute = val;
    //     break;
    //   default:
    //     break;
    // }
  }

  setArtistOptionList(list: any) {
    this.artistOptionList = list;
  }

  toggleDisplayTimeSet(val: string) {
    this.displayTimeSet = val;
  }

  setAdminId(val: string) {
    this.adminId = val;
  }
  setZoneId(zoneId: any) {
    this.zoneId = zoneId;
  }
  setContent(text: string) {
    this.content = text;
  }
  addImageFile(file: any) {
    this.imageFileList.push(file);
  }
  subtractImageFile(idx: any) {
    this.imageFileList.splice(idx, 1);
  }
  setImageFileList(val: any) {
    this.imageFileList = val;
  }
  setVideoFile(file: any) {
    this.videoFile = file;
  }

  setDisplayDate(val: any) {
    this.displayDate = val;
  }
  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        // case 'accountId':
        //   this.setAccountId(obj[key]);
        //   break;
        // case 'name':
        //   this.setName(obj[key]);
        //   break;
        // case 'adminId':
        //   this.setAdminId(obj[key]);
        //   break;
        // case 'status':
        //   this.setStatus(obj[key]);
        //   break;
        default:
          console.log('오류입니다');
          break;
      }
    }
  }

  async submit() {
    if (!this.zoneId) {
      return alert('아티스트를 선택해주세요');
    }

    let requestParam: any = {
      zoneId: this.zoneId,
      content: this.content,
      adminId: this.adminId
      // displayData: this.displayDate
    };

    if (this.content.includes('#')) {
      const tags = util.findHashtags(this.content);
      if (tags) {
        requestParam.contentTags = tags.join('');
      }
    }

    if (this.displayTimeSet === 'T') {
      const yearMonthDayString = moment(this.displayDateElement.yearMonthDay).format('YYYY-MM-DD');
      const yearMonthDayStringForPrint = moment(this.displayDateElement.yearMonthDay).format('YYYY.MM.DD');

      let displayDate = new Date(yearMonthDayString);
      displayDate.setHours(this.displayDateElement.hour);
      displayDate.setMinutes(this.displayDateElement.minute);

      if (displayDate < new Date()) {
        alert('예약 시간을 현재 시간보다 이전으로 설정할 수 없습니다.');
        return;
      }

      if (!window.confirm(`${yearMonthDayStringForPrint} ${this.displayDateElement.hour}:${this.displayDateElement.minute}에 해당 게시물을 등록하시겠습니까?`)) {
        return;
      }

      // const rawDisplayDate = new Date(dateString);
      // const utc = rawDisplayDate.getTime() + rawDisplayDate.getTimezoneOffset() * 60 * 1000;
      // const utcDisplayDate = new Date(utc);

      // requestParam.displayDate = utcDisplayDate;

      requestParam.displayDate = displayDate;
    } else if (!window.confirm('해당 게시물을 등록하시겠습니까?')) {
      return;
    }

    // if (this.imageFileList.length > 0) {
    let imageList: any = [];
    if (this.imageFileList.length > 0) {
      this.imageFileList.map(async (file: any, idx: number) => {
        const fileResult = await FileRequestHandler.upload(file, 'post', {
          onSuccess: (responseData: any) => {
            console.log('success upload responseData : ', responseData);
          }
        });
        imageList.push({
          ord: idx,
          type: 'IMAGE',
          name: fileResult.name,
          url: fileResult.url
        });

        if (imageList.length === this.imageFileList.length) {
          requestParam.imageList = imageList;
          PostRequestHandler.create(requestParam, {
            onSuccess: () => {
              alert('등록이 완료되었습니다');
              this.init();
              AppHistory.push('/content/post');
            }
          });
        }
      });
    } else if (this.videoFile) {
      const fileResult = await FileRequestHandler.upload(this.videoFile, 'post', {
        onSuccess: (responseData: any) => {
          console.log('success upload responseData : ', responseData);
        }
      });

      requestParam.video = {
        ord: 0,
        type: 'VIDEO',
        name: fileResult.name,
        url: fileResult.url
      };
      PostRequestHandler.create(requestParam, {
        onSuccess: () => {
          alert('등록이 완료되었습니다');
          this.init();
          AppHistory.push('/content/post');
        }
      });
    } else {
      PostRequestHandler.create(requestParam, {
        onSuccess: () => {
          alert('등록이 완료되었습니다');
          this.init();
          AppHistory.push('/content/post');
        }
      });
    }
  }

  init() {
    this.artistOptionList = [];
    this.postId = '';
    this.zoneId = ''; // zoneId, imageFileList, content, displayDate, videoFile, videoThumbnailFile
    this.imageFileList = [];
    this.adminId = '';
    this.content = '';
    this.nickName = '';
    this.type = '';
    this.postState = 1;
    this.videoFile = null;
    this.displayDate = {}; // isDisplayTimeSet, displayTime: xxxx-xx-xx xx:xx:xx
    this.displayDateElement = {
      yearMonthDay: new Date(),
      hour: HOUR_OPTIONS[0],
      minute: MINUTE_OPTIONS[0]
    };
    this.displayTimeSet = 'F';
  }
}

export default PostFormStore;
