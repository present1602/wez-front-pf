const nameRegex = /^[가-힣|a-z|A-Z|0-9]+$/;

interface AccountParam {
  accountId?: string;
  password?: string;
  name?: string;
  adminId?: string;
}

const AccountValidator = {
  checkAccountId(val?: string) {
    if (!val || val.length < 5 || val.length > 20 || val.indexOf(' ') >= 0) {
      return false;
    } else {
      const checkKo = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (checkKo.test(val)) {
        return false;
      }
    }
    return true;
  },
  checkPassword(val?: string) {
    if (!val || val.length < 4 || val.length > 20 || val.indexOf(' ') >= 0) {
      return false;
    }
    return true;
  },
  checkName(val?: string) {
    if (!val || nameRegex.test(val) === false || val.length < 2 || val.length > 20 || val.indexOf(' ') >= 0) {
      return false;
    }
    return true;
  }
};

const execPasswordValidator = (passwordInput: string, passwordCheckInput: string) => {
  if (passwordInput !== passwordCheckInput) {
    alert('비밀번호가 일치하지 않습니다');
    return;
  } else if (!passwordInput || passwordInput.length < 4 || passwordInput.length > 20 || passwordInput.indexOf(' ') >= 0) {
    alert('비밀번호를 올바르게 입력해주세요');
    return;
  }
};

const execAdminValidate = (param: AccountParam) => {
  for (let key in param) {
    switch (key) {
      case 'accountId':
        if (!AccountValidator.checkAccountId(param[key])) {
          return {
            result: false,
            message: '아이디는 5자~20자 이내로 입력해주세요(한글 입력 불가)'
          };
        } else {
          continue;
        }

      case 'name':
        if (!AccountValidator.checkName(param[key])) {
          return {
            result: false,
            message: '이름을 올바르게 입력해주세요'
          };
        } else {
          continue;
        }

      case 'password':
        if (!AccountValidator.checkPassword(param[key])) {
          return {
            result: false,
            message: '비밀번호는 4자~20자 사이로 입력해주세요'
          };
        } else {
          continue;
        }
      case 'adminId':
        if (!param[key]) {
          return {
            result: false,
            message: '관리자 아이디를 가져올 수 없습니다'
          };
        } else {
          continue;
        }
      case 'artistList':
        continue;
      default:
        return {
          result: false,
          message: '오류입니다'
        };
    }
  }

  return {
    result: true
  };
};

const validateAlbum = (param: any) => {
  for (let key in param) {
    switch (key) {
      case 'zoneId':
        if (!param[key]) {
          return {
            result: false,
            message: '아티스트를 선택해주세요'
          };
        } else {
          continue;
        }
      case 'albumId':
        if (!param[key]) {
          return {
            result: false,
            message: '앨범 아이디를 찾을 수 없습니다'
          };
        } else {
          continue;
        }
      case 'title':
        if (!param[key]) {
          return {
            result: false,
            message: '타이틀을 입력해주세요'
          };
        } else {
          continue;
        }
      default:
        continue;
    }
  }

  return {
    result: true
  };
};

const validatePhotoCard = (param: any) => {
  for (let key in param) {
    switch (key) {
      case 'photoCardId':
        if (!param[key]) {
          return {
            result: false,
            message: '앨범 아이디를 찾을 수 없습니다'
          };
        } else {
          continue;
        }
      case 'zoneId':
        if (!param[key]) {
          return {
            result: false,
            message: '아티스트를 선택해주세요'
          };
        } else {
          continue;
        }
      default:
        continue;
    }
  }

  return {
    result: true
  };
};

const execFileValidate = (type: 'IMAGE' | 'VIDEO' | 'EXCEL', ext: string) => {
  if (type === 'IMAGE') {
    const allowed = ['png', 'jpg', 'jpeg', 'gif'];
    if (!allowed.includes(ext)) {
      return { result: 'fail' };
    } else {
      return { result: 'success' };
    }
  } else if (type === 'VIDEO') {
    const allowed = ['mp4', 'avi', 'mov', 'wmv', 'mpeg'];
    if (!allowed.includes(ext)) {
      return { result: 'fail' };
    } else {
      return { result: 'success' };
    }
  } else if (type === 'EXCEL') {
    const allowed = ['xlsx', 'xls'];
    if (!allowed.includes(ext)) {
      return { result: 'fail' };
    } else {
      return { result: 'success' };
    }
  }
};

export { execAdminValidate, execFileValidate, AccountValidator, execPasswordValidator, validateAlbum, validatePhotoCard };
