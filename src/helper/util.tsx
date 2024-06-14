import moment from 'moment';
import { IMAGE_PROXY_SERVER_URL, MEDIA_BASE_URL } from '../constants/config';
import option from '../constants/option';

const util = {
  SNS_TYPE: option.SNS_TYPE,
  convertDateFormat: (date: string, column?: string) => {
    return date ? moment(date).format('YYYY.MM.DD HH:m:ss') : '';
  },
  getDate: (date: string) => {
    if (date) {
      return moment(date).format('YYYY.MM.DD');
    } else {
      return null;
    }
  },
  getSimpleRowNumber: (idx: number, total: number) => {
    return total - idx;
  },
  getImageProxyPath: (url: string, size?: number) => {
    const ext: any = url.split('.')[url.split('.').length - 1];
    return ext !== 'gif' ? `${IMAGE_PROXY_SERVER_URL}/${size ? size : 100}/${MEDIA_BASE_URL}/${url}` : `${MEDIA_BASE_URL}/${url}`;
  },
  range: (arr: any) => {
    let newArry = [];
    for (let i = arr[0]; i < arr[1]; i++) {
      newArry.push(i);
    }
    return newArry;
  },

  getDisplayStateText: (state: number) => {
    if (state === 1) return '노출';
    else if (state === 0) return '숨김';
  },
  getDisplayStateReverseText: (state: any) => {
    if (state === false) return '노출';
    else if (state === true) return '숨김';
  },
  getChangeStateButtonText: (state: any) => {
    if (state === false) return '숨기기';
    else if (state === true) return '숨김 해제';
  },
  getDisplayActiveStateText: (isActive: boolean) => {
    if (isActive) return '노출';
    else return '숨김';
  },
  getAlbumStateText: (value: number) => {
    if (value) {
      return '노출';
    } else {
      return '숨김';
    }
  },
  getAppVersionForceText: (value: number) => {
    if (value) {
      return '필수';
    } else {
      return '선택';
    }
  },
  getPhotoCardStateText: (value: number) => {
    if (value) {
      return '노출';
    } else {
      return '숨김';
    }
  },
  getTermsTitleText: (code: string) => {
    const textPair: any = {
      PRIVACY: '개인정보처리방침',
      SERVICE: '서비스이용약관'
    };
    return textPair[code];
  },
  getRowNumber: (idx: number, page: number, rowsPerPage: number) => {
    return (page - 1) * rowsPerPage + idx + 1;
    // return (props.store.page - 1) * props.store.rowsPerPage + idx + 1;
  },

  getStatusText: (code: string, dataKey: string): any => {
    if (dataKey === 'user') {
      const textPair: any = {
        normal: '정상',
        expired: '탈퇴',
        suspended: '정지'
      };
      return textPair[code];
    } else if (dataKey === 'admin') {
      const textPair: any = {
        normal: '정상',
        expired: '삭제'
      };
      return textPair[code];
    } else if (dataKey === 'editor') {
      const textPair: any = {
        normal: '정상',
        expired: '탈퇴'
      };
      return textPair[code];
    } else if (dataKey === 'chatRoom') {
      const textPair: any = {
        normal: '노출',
        hide: '숨김',
        expired: '삭제',
        expired_admin: '삭제'
      };
      return textPair[code];
    }
  },
  getTypeText: (code: string) => {
    const textPair: any = {
      ARTIST: '아티스트',
      OFFICIAL: '오피셜',
      NORMAL: '팬'
    };
    return textPair[code];
  },
  getTagStateText: (code: string) => {
    const textPair: any = {
      on: '노출',
      off: '비노출',
      hide: '숨김'
    };
    return textPair[code];
  },
  getTagControlText: (isActive: string) => {
    if (isActive) {
      return '숨기기';
    } else {
      return '숨김 해제';
    }
  },
  getReportTypeText: (code: string) => {
    const textPair: any = {
      TYPE1: '부적절한 홍보/스팸',
      TYPE2: '폭력적이거나 유해한 내용',
      TYPE3: '불쾌한 내용',
      TYPE4: '관련 없는 내용',
      TYPE5: '게시물 도배',
      TYPE6: '개인 사생활 침해',
      TYPE7: '기타'
    };
    return textPair[code] ? textPair[code] : code;
  },
  getTermsTypeText: (code: string) => {
    const textPair: any = {
      PRIVACY: '개인정보취급방침',
      SERVICE: '서비스이용방침'
    };
    return textPair[code] ? textPair[code] : code;
  },
  getMissionTaskTypeText: (code: string) => {
    const textPair: any = {
      F: '고정미션',
      D: '일일미션'
    };
    return textPair[code];
  },
  getMissionTaskText: (code: string) => {
    const textPair: any = {
      LG: '출석체크',
      PS: '게시물 등록',
      RY: '댓글 작성',
      CM: '채팅메세지 작성',
      PL: '게시물 좋아요',
      AD: '광고보기',
      PC: '프로필완성',
      AG: '앨범등록'
    };
    return textPair[code];
  },
  getCountryText: (code: string) => {
    if (code) {
      const codeToUperCase = code.toUpperCase();
      const textPair: any = {
        KR: '한국',
        US: '미국',
        CN: '중국',
        JP: '일본'
      };
      return textPair[codeToUperCase];
    }
  },
  getNoticeTypeText: (code: string) => {
    const textPair: any = {
      NORMAL: '일반',
      IMPORTANT: '중요공지'
    };
    return textPair[code];
  },

  getSnsTypeText: (code: string) => {
    const textPair: any = {
      G: '구글',
      T: '트위터',
      A: '애플',
      E: '이메일'
    };
    return textPair[code];
  },
  getOfficialSnsNameText: (code: string) => {
    const textPair: any = {
      Y: '유튜브',
      F: '페이스북',
      I: '인스타그램',
      T: '트위터',
      W: '웨이보',
      V: '브이앱'
    };
    return textPair[code];
  },
  getActivationText: (isActive: boolean) => {
    if (isActive) {
      return '활성화';
    } else {
      return '비활성화';
    }
  },
  findHashtags(textBody: any) {
    // var regexp = /\B\#\w\w+\b/g;
    // var regexp = /#\b\w+\b/g;
    var regexp = /#[^\s#]+/g;

    const result: any = textBody.match(regexp);
    if (result && result.length > 0) {
      return result;
    } else {
      return false;
    }
  }
};

export default util;

// const convertDateFormat = (date: string, column?: string) => {
//   return moment(date).format('YYYY.MM.DD HH:m:ss');
// };

// const getRowNumber = (idx: number, page: number, rowsPerPage: number) => {
//   return (page - 1) * rowsPerPage + idx + 1;
//   // return (props.store.page - 1) * props.store.rowsPerPage + idx + 1;
// };

// const getStatusText = (code: string, dataKey: string) => {
//   if (dataKey === 'user') {
//     const textPair: any = {
//       normal: '정상',
//       expired: '탈퇴',
//       suspended: '정지'
//     };
//     return textPair[code];
//   }
// };

// const getCountryText = (code: string) => {
//   const textPair: any = {
//     kr: '한국'
//   };
//   return textPair[code];
// };

// const getSnsTypeText = (code: string) => {
//   const textPair: any = {
//     G: '구글',
//     T: '트위터',
//     A: '애플',
//     E: '이메일'
//   };
//   return textPair[code];
// };

// const getTypeText = (code: string) => {
//   const textPair: any = {
//     ARTIST: '아티스트',
//     NORMAL: '일반'
//   };
//   return textPair[code];
// };

// export { convertDateFormat, getRowNumber, getStatusText, getCountryText, getSnsTypeText, getTypeText };
