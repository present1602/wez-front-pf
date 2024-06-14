import { makeAutoObservable } from 'mobx';
import { EditorRequestHandler } from '../api/member';
import util from '../helper/util';
import { execAdminValidate } from '../helper/Validator';
import { AddEditorParam, UpdateEditorParam } from '../types/admin';
import AppHistory from '../AppHistory';

// const addOrRemove = (arr: any, item: number) => (arr.includes(item) ? arr.filter((i: number) => i !== item) : [...arr, item]);

class EditorFormStore {
  constructor() {
    // this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  accountId = '';
  adminId = '';
  password = '';
  name = '';
  status = '';
  artistList: number[] = [];

  created = '';

  setAccountId(val: string) {
    this.accountId = val;
  }
  setPassword(val: string) {
    this.password = val;
  }
  setName(val: string) {
    this.name = val;
  }
  setAdminId(val: string) {
    this.adminId = val;
  }
  setStatus(val: string) {
    this.status = val;
  }
  setArtistList(artistDataList: any) {
    let updatedList: number[] = [];
    artistDataList.forEach((el: any) => {
      updatedList.push(el.zoneId);
    });

    this.artistList = updatedList;
  }

  setCreated(val: string) {
    this.created = val;
  }

  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        case 'accountId':
          this.setAccountId(obj[key]);
          break;
        case 'name':
          this.setName(obj[key]);
          break;
        case 'adminId':
          this.setAdminId(obj[key]);
          break;
        case 'status':
          this.setStatus(obj[key]);
          break;
        case 'artistList':
          this.setArtistList(obj[key]);
          break;
        case 'created':
          this.setCreated(util.convertDateFormat(obj[key]));
          break;
        default:
          continue;
      }
    }
  }

  changeArtistList(item: any) {
    // this.artistList = (this.artistList, zoneId) => (arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
    // const zoneId = item.value;
    // const artistList = this.artistList;
    // this.artistList = artistList.includes(zoneId) ? artistList.filter((i: number) => i !== zoneId) : [...artistList, zoneId];

    const zoneId = item.value;

    if (this.artistList.includes(zoneId)) {
      this.artistList = this.artistList.filter((el: number) => {
        return el !== zoneId;
      });
    } else {
      this.artistList = [...this.artistList, zoneId];
    }
  }

  getStatusText(code: string) {
    const textPair: any = {
      normal: '정상'
    };
    return textPair[code];
  }

  init() {
    this.accountId = '';
    this.adminId = '';
    this.password = '';
    this.name = '';
    this.status = '';
    this.artistList = [];
  }

  submitAddEditor() {
    this.artistList = this.artistList.filter(function (el) {
      return el != null;
    });

    const addEditorParam: AddEditorParam = {
      accountId: this.accountId,
      password: this.password,
      name: this.name,
      artistList: this.artistList
    };

    var validationResult = execAdminValidate(addEditorParam);

    if (!validationResult.result) {
      return alert(validationResult.message);
    }
    // AuthRequstHandler.login(loginParam, this.onSuccess);

    EditorRequestHandler.addEditor(addEditorParam, {
      onSuccess: () => {
        alert('등록이 완료되었습니다');
        this.init();
        AppHistory.push('/member/editor');
      },
      onFail: (responseData: any) => {
        alert('등록에 실패했습니다');
        console.log('error : ', responseData);
      }
    });
  }

  submitUpdateEditor() {
    this.artistList = this.artistList.filter(function (el) {
      return el != null;
    });

    const updateEditorParam: UpdateEditorParam = {
      adminId: this.adminId,
      // accountId: this.accountId,
      name: this.name,
      artistList: this.artistList
    };

    var validationResult = execAdminValidate(updateEditorParam);

    if (!validationResult.result) {
      return alert(validationResult.message);
    }

    EditorRequestHandler.updateEditor(updateEditorParam, {
      onSuccess: (res: any) => {
        alert('수정이 완료되었습니다');
        this.init();
        AppHistory.push('/member/editor');
      },
      onFail: (res: any) => {
        alert('수정에 실패했습니다');
        console.log('fail res : ', res);
      }
    });
  }

  submitDeleteEditor(userId: string) {
    EditorRequestHandler.deleteEditor(userId, {
      onSuccess: () => {
        alert('에디터를 삭제하였습니다');
        this.init();
        AppHistory.push('/member/editor');
      },
      onFail: () => {
        alert('삭제에 실패했습니다');
      }
    });
  }
}

export default EditorFormStore;
