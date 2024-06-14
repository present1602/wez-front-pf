import { makeAutoObservable } from 'mobx';
import { isPersisting } from 'mobx-persist-store';
import { RootStore } from './RootStore';
import Cookies from 'js-cookie';

// const getCookieValue = (key: string) => {
//   let cookieKey = key + '=';
//   let result = '';
//   const cookieArr = document.cookie.split(';');

//   for (let i = 0; i < cookieArr.length; i++) {
//     if (cookieArr[i][0] === ' ') {
//       cookieArr[i] = cookieArr[i].substring(1);
//     }

//     if (cookieArr[i].indexOf(cookieKey) === 0) {
//       result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
//       return result;
//     }
//   }
//   return result;
// };

class AuthStore {
  rootStore;
  isAuthenticated = Cookies.get('admin_id') ? true : false;
  // adminType = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    // makePersistable(this, { name: 'AuthStorage', properties: ['isAuthenticated'], storage: window.localStorage });
  }

  get isPersisting() {
    return isPersisting(this);
  }

  isAdmin = true;

  user = {};

  changeAuthState(val: boolean) {
    this.isAuthenticated = val;
  }

  setUser(user: any) {
    this.user = user;
  }

  // setAdminType(type: string) {
  //   this.adminType = type;
  // }

  init() {
    this.isAuthenticated = false;
    Cookies.remove('admin_id');
    Cookies.remove('admin_name');
    Cookies.remove('type');
    this.user = {};
  }
}

export default AuthStore;
