interface MenuData {
  key: string;
  text: string;
  active: boolean;
}
const detailMenuListData: any = {
  zone: [
    { key: 'basic', text: '기본정보' },
    { key: 'detail', text: '상세정보' }
  ],
  user: [
    { key: 'info', text: '가입정보' },
    { key: 'post', text: '작성게시물' },
    { key: 'reply', text: '작성댓글' },
    { key: 'suspend', text: '정지이력' }
  ],
  report: [
    { key: 'post', text: '게시물' },
    { key: 'reply', text: '댓글' }
  ]
};

const getDetailMenuListData = (menuKey: string) => {
  return detailMenuListData[menuKey] ? detailMenuListData[menuKey] : [];
};

export { getDetailMenuListData };
