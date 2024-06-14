import React, { useContext } from 'react';
import LoginStore from './LoginStore';
import AuthStore from './AuthStore';
import OptionDataStore from './OptionDataStore';

export class RootStore {
  authStore: any;
  loginStore: any;
  adminStore: any;
  optionDataStore: any;

  constructor() {
    this.authStore = new AuthStore(this);
    this.loginStore = new LoginStore(this);
    this.optionDataStore = new OptionDataStore();
  }
}

const StoreContext = React.createContext(new RootStore());

export const useStore = () => useContext(StoreContext);
