import { makeAutoObservable } from 'mobx';
import { FileRequestHandler, ZoneRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';

interface Media {
  ord?: number;
  url?: string;
  name?: string;
  type?: string;
}
class ArtistZoneFormStore {
  formType = '';

  constructor(formType: string) {
    makeAutoObservable(this);
    this.formType = formType;
  }

  zoneId = '';
  title = '';
  zoneOfficialName = '';

  stillImageFile: any;
  shortcutImageFile: any;

  stillImage?: Media = undefined;
  shortcutImage?: Media = undefined;

  stillImageUrl?: string = '';
  editorList: string[] = [];

  showTitleInfoMsg = false;
  showImageInfoMsg = false;
  showOfficialNickNameInfoMsg = false;

  setShowTitleInfoMsg(val: boolean) {
    this.showTitleInfoMsg = val;
  }
  setShowImageInfoMsg(val: boolean) {
    this.showImageInfoMsg = val;
  }
  setShowOfficialNickNameInfoMsg(val: boolean) {
    this.showOfficialNickNameInfoMsg = val;
  }

  setZoneId(val: any) {
    this.zoneId = val;
  }
  setTitle(val: string) {
    this.title = val;
  }

  setZoneOfficialName(val: string) {
    this.zoneOfficialName = val;
  }

  setStillImageFile(file: any) {
    this.stillImageFile = file;
  }

  setShortcutImageFile(file: any) {
    this.shortcutImageFile = file;
  }

  setStillImageUrl(url: string) {
    this.stillImageUrl = url;
  }

  setShortcutImage(data: any) {
    this.shortcutImage = data;
  }

  setEditorList(data: any) {
    this.editorList = data;
  }
  changeEditorList(adminId: string) {
    if (this.editorList.includes(adminId)) {
      this.editorList = this.editorList.filter((el: string) => {
        return el !== adminId;
      });
    } else {
      this.editorList = [...this.editorList, adminId];
    }
  }

  setStillImage(data: any) {
    this.stillImage = data;
  }

  setMultipleItem(data: any) {
    for (let key in data) {
      switch (key) {
        case 'zoneId':
          this.setZoneId(data[key]);
          break;
        case 'title':
          this.setTitle(data[key]);
          break;
        case 'zoneOfficialName':
          this.setZoneOfficialName(data[key]);
          break;
        case 'stillImage':
          this.setStillImage(data[key]);
          break;
        case 'shortcutImage':
          this.setShortcutImage(data[key]);
          break;
        default:
          console.log('오류입니다');
          break;
      }
    }
  }

  async submit(formType: string) {
    this.editorList = this.editorList.filter(function (el) {
      return el != null;
    });

    let titleEmpty = false;
    let imageEmpty = false;
    let zoneOfficialNameEmpty = false;

    if (this.title.trim() === '') {
      this.setShowTitleInfoMsg(true);
      titleEmpty = true;
      // return;
    } else if (this.showTitleInfoMsg) {
      this.setShowTitleInfoMsg(false);
    }

    if (formType === 'create' && !this.stillImageFile) {
      this.setShowImageInfoMsg(true);
      imageEmpty = true;
      // return;
    } else if (this.showImageInfoMsg) {
      this.setShowImageInfoMsg(false);
      zoneOfficialNameEmpty = true;
    }

    if (this.zoneOfficialName.trim() === '') {
      this.setShowOfficialNickNameInfoMsg(true);
      // return;
    } else if (this.showOfficialNickNameInfoMsg) {
      this.setShowOfficialNickNameInfoMsg(false);
    }

    if (titleEmpty || imageEmpty || zoneOfficialNameEmpty) {
      return;
    }
    let requestParam: any = {
      title: this.title,
      zoneOfficialName: this.zoneOfficialName,
      type: 'artist',
      editorList: this.editorList
    };

    if (this.stillImageFile) {
      const fileResult = await FileRequestHandler.upload(this.stillImageFile, 'zone/main', { onSuccess: (data: any) => console.log('success upload data : ', data) });

      requestParam.stillImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
    }
    if (this.shortcutImageFile) {
      const fileResult = await FileRequestHandler.upload(this.shortcutImageFile, 'zone/main', { onSuccess: (data: any) => console.log('success upload data : ', data) });

      requestParam.shortcutImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
    }

    if (formType === 'create') {
      ZoneRequestHandler.createZone(requestParam, {
        onSuccess: () => {
          alert('등록이 완료되었습니다');
          this.init();
          setTimeout(() => {
            AppHistory.push('/zone');
          }, 300);
        }
      });
    }
    if (formType === 'update') {
      requestParam.zoneId = this.zoneId;

      ZoneRequestHandler.updateZone(requestParam, {
        onSuccess: () => {
          alert('수정이 완료되었습니다');
          this.init();
          setTimeout(() => {
            AppHistory.push('/zone');
          }, 300);
        }
      });
    }
  }

  init() {
    this.zoneId = '';
    this.title = '';
    this.zoneOfficialName = '';
    // this.stillImage = {};
    this.stillImageFile = null;
    this.shortcutImageFile = null;
    this.stillImage = undefined;
    this.shortcutImage = undefined;

    this.editorList = [];
  }
}

export default ArtistZoneFormStore;
