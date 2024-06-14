import { makeAutoObservable } from 'mobx';
import { FileRequestHandler, PhotoCardRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';
import { validatePhotoCard } from '../helper/Validator';

class PhotoCardFormStore {
  constructor() {
    makeAutoObservable(this);
  }
  zoneId = '';
  photoCardId = '';
  memo = '';
  artistZone: any = {};
  created: any = null;
  memberName: string = '';
  photoCardImageData: any = null;
  photoCardImageFile: any = null;
  photoCardKeepCount = 0;

  isActive = true;

  setPhotoCardId(val: any) {
    this.photoCardId = val;
  }

  setZoneId(val: any) {
    this.zoneId = val;
  }

  setMemo(val: any) {
    this.memo = val;
  }

  setMemberName(val: any) {
    this.memberName = val;
  }

  setArtistZone(data: any) {
    this.artistZone = data;
  }
  setCreated(val: any) {
    this.created = val;
  }

  setIsActive(val: any) {
    this.isActive = val;
  }

  setPhotoCardImageFile(file: any) {
    this.photoCardImageFile = file;
  }
  setPhotoCardImageData(data: any) {
    this.photoCardImageData = data;
  }

  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        case 'photoCardId':
          this.setPhotoCardId(obj[key]);
          break;
        case 'memo':
          this.setMemo(obj[key]);
          break;
        case 'isActive':
          this.setIsActive(obj[key]);
          break;
        case 'created':
          this.setCreated(obj[key]);
          break;
        case 'artistZone':
          this.setArtistZone(obj[key]);
          break;
        case 'photoCardImage':
          this.setPhotoCardImageData(obj[key]);
          break;
        case 'memberName':
          this.setMemberName(obj[key]);
          break;
        default:
          break;
      }
    }
  }

  async submit() {
    let param: any = {
      zoneId: this.zoneId,
      memo: this.memo,
      memberName: this.memberName
    };

    const validationResult = validatePhotoCard(param);
    if (!validationResult.result) {
      alert(validationResult.message);
      return;
    }

    if (!this.photoCardImageFile) {
      alert('포토카드 이미지를 등록해주세요');
      return;
    }

    const fileResult = await FileRequestHandler.upload(this.photoCardImageFile, 'photocard', { onSuccess: () => {} });

    param.photoCardImage = {
      ord: 0,
      type: 'IMAGE',
      name: fileResult.name,
      url: fileResult.url
    };
    // }
    PhotoCardRequestHandler.create(param, {
      onSuccess: () => {
        alert('포토카드를 등록하였습니다');
        this.init();
        AppHistory.push('/collection/photocard');
      }
    });
  }

  async submitUpdate() {
    let param: any = {
      photoCardId: this.photoCardId,
      memo: this.memo,
      memberName: this.memberName
    };

    // const validationResult = validatePhotoCard(param);
    // if (!validationResult.result) {
    //   alert(validationResult.message);
    //   return;
    // }

    if (this.photoCardImageFile) {
      const fileResult = await FileRequestHandler.upload(this.photoCardImageFile, 'photocard', { onSuccess: () => {} });
      param.photoCardImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
    }

    PhotoCardRequestHandler.update(param, {
      onSuccess: () => {
        alert('포토카드를 수정하였습니다');
        this.init();
        AppHistory.push('/collection/photocard');
      }
    });
  }

  submitDelete(photoCardId: string) {
    PhotoCardRequestHandler.delete(photoCardId, {
      onSuccess: () => {
        alert('포토카드를 삭제하였습니다');
        this.init();
        AppHistory.push('/collection/photocard');
      }
    });
  }

  init() {
    this.zoneId = '';
    this.photoCardId = '';
    this.memo = '';
    this.artistZone = {};
    this.created = null;
    this.memberName = '';
    this.photoCardImageData = null;
    this.photoCardImageFile = null;
    this.photoCardKeepCount = 0;
  }
}

export default PhotoCardFormStore;
