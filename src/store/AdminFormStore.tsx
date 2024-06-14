import { makeAutoObservable } from 'mobx';
import { AdminRequstHandler } from '../api/member';
import AppHistory from '../AppHistory';
import { execAdminValidate } from '../helper/Validator';
import { AddAdminParam, UpdateAdminParam } from '../types/admin';

class AdminFormStore {
  constructor() {
    // this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  accountId = '';
  adminId = '';
  password = '';
  name = '';
  status = '';

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
        default:
          break;
      }
    }
  }

  getStatusText(code: string) {
    const textPair: any = {
      normal: '정상'
    };
    return textPair[code];
  }

  submitAddAdmin() {
    const addAdminParam: AddAdminParam = {
      accountId: this.accountId,
      password: this.password,
      name: this.name
    };

    var validationResult = execAdminValidate(addAdminParam);

    if (!validationResult.result) {
      return alert(validationResult.message);
    }
    // AuthRequstHandler.login(loginParam, this.onSuccess);

    AdminRequstHandler.addAdmin(addAdminParam, {
      onSuccess: () => {
        alert('등록이 완료되었습니다');
        this.init();
        AppHistory.push('/member/admin');
      },
      onFail: () => {
        alert('등록에 실패했습니다');
      }
    });
  }

  init() {
    this.accountId = '';
    this.adminId = '';
    this.password = '';
    this.name = '';
    this.status = '';
  }
  submitUpdateAdmin() {
    const updateAdminParam: UpdateAdminParam = {
      adminId: this.adminId,
      accountId: this.accountId,
      name: this.name
    };

    var validationResult = execAdminValidate(updateAdminParam);

    if (!validationResult.result) {
      return alert(validationResult.message);
    }

    AdminRequstHandler.updateAdmin(updateAdminParam, {
      onSuccess: (response: any) => {
        if (response.data && response.data.ERROR && response.data.ERROR === 'ADM0002') {
          alert('같은 아이디가 존재합니다.');
          return;
        } else {
          alert('수정이 완료되었습니다');
        }
        this.init();
        AppHistory.push('/member/admin');
      },
      onFail: () => {
        alert('수정에 실패했습니다');
      }
    });
  }

  submitDeleteAdmin(adminId: string) {
    AdminRequstHandler.deleteAdmin(adminId, {
      onSuccess: () => {
        alert('관리자를 삭제하였습니다');
        this.init();
        AppHistory.push('/member/admin');
      },
      onFail: () => {
        alert('수정에 실패했습니다');
      }
    });
  }
}

export default AdminFormStore;
