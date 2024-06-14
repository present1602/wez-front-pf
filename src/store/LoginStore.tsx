import { makeAutoObservable } from 'mobx';
import { AuthRequstHandler } from '../api/auth';
import AppHistory from '../AppHistory';
import { LoginParam } from '../types/admin';
import { RootStore } from './RootStore';
import Cookies from 'js-cookie';

class LoginStore {
  authStore;

  constructor(rootStore: RootStore) {
    this.authStore = rootStore.authStore;
    makeAutoObservable(this);
  }

  messageControl = {
    // 안쓸수도 있음
    showMessage: false,
    message: ''
  };
  accountId = '';
  password = '';

  setAccountId(val: string) {
    this.accountId = val;
  }
  setPassword(val: string) {
    this.password = val;
  }

  setIsAutheticated(val: boolean) {}

  inputInit() {
    this.accountId = '';
    this.password = '';
  }
  submitLogin() {
    const loginParam: LoginParam = {
      accountId: this.accountId,
      password: this.password
    };

    AuthRequstHandler.login(loginParam, {
      onSuccess: (responseData: any) => {
        this.authStore.changeAuthState(true);
        this.authStore.setUser(responseData.payload);

        const adminType = responseData.payload.type;
        Cookies.set('admin_id', responseData.payload.adminId);
        Cookies.set('admin_name', responseData.payload.name);
        Cookies.set('type', adminType);

        window.localStorage.setItem('user', JSON.stringify(responseData.payload));

        if (adminType === 'MASTER') {
          AppHistory.push('/dashboard');
        } else if (adminType === 'OFFICIAL') {
          AppHistory.push('/content/post');
        }
      },
      onFail: () => {
        alert('아이디와 비밀번호를 확인해주세요');
      }
    });
  }
}

export default LoginStore;
