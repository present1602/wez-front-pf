const chatUtil = {
  getChatSysMsg(code: string, nickName: string) {
    if (code === 'SYS0001') {
      return `${nickName} 님이 입장하였습니다.`;
    } else if (code === 'SYS0002') {
      return `${nickName} 님이 퇴장하였습니다.`;
    } else if (code === 'SYS0004') {
      return `${nickName} 님을 강퇴하였습니다.`;
    }
    //  else if (code === 'SYS0005') {
    //   return '채팅방을 삭제하였습니다.';
    // }
  }
};

export default chatUtil;
