import { LoginParam } from '../types/admin';
import { requests } from './requests';

const AuthRequstHandler = {
  login: async (param: LoginParam, { onSuccess, onFail }: any) => {
    try {
      const response: any = await requests.post('/public/login', param);

      if (response.status === 200) {
        if (response.data.result === 'success') {
          onSuccess(response.data);
        } else if (response.data.result === 'fail') {
          onFail();
        }
      }
    } catch (error) {
      console.log('error : ', error);
      alert('서버 오류입니다');
    }
  }
};

export { AuthRequstHandler };
