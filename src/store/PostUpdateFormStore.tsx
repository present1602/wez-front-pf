import { makeAutoObservable } from 'mobx';
import { FileRequestHandler, PostRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';
import util from '../helper/util';

export const HOUR_OPTIONS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export const MINUTE_OPTIONS = ['00', '10', '20', '30', '40', '50'];

class PostUpdateFormStore {
  constructor() {
    makeAutoObservable(this);
  }

  postId = '';
  artistOptionList = [];
  zoneId = ''; // zoneId, imageFileList, content, displayDate, videoFile, videoThumbnailFile
  imageFileList: any = [];
  content = '';
  displayDate: any = {}; // isDisplayTimeSet, displayTime: xxxx-xx-xx xx:xx:xx
  created: any = null;
  viewsCount: number = 0;
  imageDataList: any = [];

  nickName = '';

  type: string = '';

  state: number = 1;

  displayDateElement: any = {
    yearMonthDay: new Date(),
    hour: HOUR_OPTIONS[0],
    minute: MINUTE_OPTIONS[0]
  };

  displayTimeSet = 'F';

  videoFile: any = null; //

  videoData: any = null;

  setPostId(val: string) {
    this.postId = val;
  }

  setType(val: string) {
    this.type = val;
  }

  setState(val: number) {
    this.state = val;
  }

  setNickName(val: string) {
    this.nickName = val;
  }

  setDisplayDateElement(elementKey: string, val: string) {
    this.displayDateElement[elementKey] = val;
  }

  setArtistOptionList(list: any) {
    this.artistOptionList = list;
  }

  toggleDisplayTimeSet(val: string) {
    this.displayTimeSet = val;
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
  setImageFileList(val: any) {
    this.imageFileList = val;
  }
  setVideoFile(file: any) {
    this.videoFile = file;
  }

  setDisplayDate(val: any) {
    this.displayDate = val;
  }

  setCreated(val: any) {
    this.created = val;
  }
  setViewsCount(val: any) {
    this.viewsCount = val;
  }
  setImageDataList(data: any) {
    this.imageDataList = data;
  }
  setVideoData(data: any) {
    this.videoData = data;
  }

  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        case 'postId':
          this.setPostId(obj[key]);
          break;
        case 'zoneId':
          this.setZoneId(obj[key]);
          break;
        case 'content':
          this.setContent(obj[key]);
          break;
        case 'name':
          this.setPostId(obj[key]);
          break;
        case 'type':
          this.setType(obj[key]);
          break;
        case 'created':
          this.setCreated(obj[key]);
          break;
        case 'userNickName':
          this.setNickName(obj[key]);
          break;
        case 'state':
          this.setState(obj[key]);
          break;
        case 'viewsCount':
          this.setViewsCount(obj[key]);
          break;
        case 'imageList':
          obj[key] && this.setImageDataList(obj[key]);
          break;
        case 'video':
          obj[key] && this.setVideoData(obj[key]);
          break;
        default:
          break;
      }
    }
  }

  subtractImageFile(idx: any) {
    this.imageFileList.splice(idx, 1);
  }

  subtractImageData(mediaId: any) {
    // this.imageDataList = this.imageDataList.filter((item: any) => {
    //   return item.mediaId != mediaId;
    // });
    const updatedList = this.imageDataList.filter((item: any) => {
      return item.mediaId != mediaId;
    });
    this.setImageDataList(updatedList);
  }

  async submit() {
    let requestParam: any = {
      postId: this.postId,
      zoneId: this.zoneId,
      content: this.content
    };

    if (this.content.includes('#')) {
      const tags = util.findHashtags(this.content);
      if (tags) {
        requestParam.contentTags = tags.join('');
      } else {
        requestParam.contentTags = null;
      }
    } else {
      requestParam.contentTags = null;
    }

    // 기본체크 postId, content,
    // 테스트 체크 1) video 만 있는 경우 -> 비디오 삭제
    // 테스트 체크 2) video 만 있는 경우 -> 비디오 파일 변경  // 기존 비디오post_media state 0 && insert post_media new row
    // 테스트 체크 3) video 만 있는 경우 -> 이미지 파일 올리는 경우(비디오 자동 삭제)   // 기존 비디오post_media state 0
    // 테스트 체크 4) 이미지만 있는 경우 -> 이미지 전부 삭제      // 기존 비디오post_media state 0
    // 테스트 체크 4) 이미지만 있는 경우 -> 비디오 올리는 경우 (이미지 자동 삭제)
    // 테스크 체크 5) 이미지 여러장에서 수정 삭제 시

    // if (this.imageFileList.length > 0) {
    if (this.videoFile) {
      // 1)비디오파일 새로 업로드한 파일 있는 경우
      const fileResult = await FileRequestHandler.upload(this.videoFile, 'post', {
        onSuccess: (responseData: any) => {
          console.log('success upload video responseData : ', responseData);
        }
      });

      requestParam.video = {
        ord: 0,
        type: 'VIDEO',
        name: fileResult.name,
        url: fileResult.url
      };

      PostRequestHandler.update(requestParam, {
        onSuccess: () => {
          alert('게시물을 수정하였습니다');
          this.init();
          AppHistory.push('/content/post');
        }
      });
    } else if (this.videoData && this.videoData.url) {
      // 2) 기존에 등록한 비디오파일 있는 경우
      requestParam.video = this.videoData;

      PostRequestHandler.update(requestParam, {
        onSuccess: () => {
          alert('게시물을 수정하였습니다');
          this.init();
          AppHistory.push('/content/post');
        }
      });
    } else {
      this.imageDataList.map((item: any, idx: number) => {
        item.ord = idx;
      });

      if (this.imageFileList.length > 0) {
        // 3) 새로 업로드한 이미지들 있는 경우
        let uploadedImageList: any = [];

        this.imageFileList.map(async (file: any, idx: number) => {
          const fileResult = await FileRequestHandler.upload(file, 'post', {
            onSuccess: (responseData: any) => {
              console.log('success upload image responseData : ', responseData);
            }
          });
          uploadedImageList.push({
            ord: this.imageDataList.length + idx,
            type: 'IMAGE',
            name: fileResult.name,
            url: fileResult.url
          });

          if (uploadedImageList.length === this.imageFileList.length) {
            // this.imageDataList.map((item: any, idx: number) => {
            //   item.ord = idx;
            // });
            requestParam.imageList = this.imageDataList.concat(uploadedImageList);

            PostRequestHandler.update(requestParam, {
              onSuccess: () => {
                alert('게시물을 수정하였습니다');
                this.init();
                AppHistory.push('/content/post');
              }
            });
          }
        });
      } else {
        // 4) default
        requestParam.imageList = this.imageDataList;
        PostRequestHandler.update(requestParam, {
          onSuccess: () => {
            alert('게시물을 수정하였습니다');
            this.init();
            AppHistory.push('/content/post');
          }
        });
      }
    }
  }

  submitDelete(postId: string) {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      PostRequestHandler.delete(postId, {
        onSuccess: () => {
          alert('게시물을 삭제하였습니다');
          this.init();
          AppHistory.push('/content/post');
        }
      });
    }
  }

  init() {
    this.postId = '';
    this.artistOptionList = [];
    this.zoneId = ''; // zoneId, imageFileList, content, displayDate, videoFile, videoThumbnailFile
    this.imageFileList = [];
    this.content = '';
    this.displayDate = {}; // isDisplayTimeSet, displayTime: xxxx-xx-xx xx:xx:xx
    this.created = null;
    this.viewsCount = 0;
    this.imageDataList = [];
    this.nickName = '';
    this.type = '';
    this.state = 1;
    this.displayDateElement = {};
    this.videoFile = null; //
    this.videoData = null;
  }
}

export default PostUpdateFormStore;
