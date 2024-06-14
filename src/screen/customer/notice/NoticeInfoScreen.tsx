import * as React from 'react';
import { CMContentFlexBox } from '../../../component/common/Box';
import PageTitleWithTail from '../../../component/contentHeader/PageTitleWithTail';
import NoticeFormStore from '../../../store/NoticeFormStore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { observer } from 'mobx-react';
import { Route, Routes, useNavigate } from 'react-router';
import ContentTabMenu from '../../../component/contentMenu/TabMenu';
import NoticeInfoBasic from './content/NoticeInfoBasic';
import NoticeInfoDetail from './content/NoticeInfoDetail';

interface INoticeInfoScreenProps {
  mode?: string;
}

const noticeFormStore = new NoticeFormStore();

interface MenuData {
  key: string;
  text: string;
  active: boolean;
}
const menuListData: Array<MenuData> = [
  { key: 'info', text: '기본정보', active: true },
  { key: 'detail', text: '상세정보', active: false }
];

const NoticeInfoScreen: React.FunctionComponent<INoticeInfoScreenProps> = observer((props) => {
  const navigate = useNavigate();

  return (
    <CMContentFlexBox>
      <PageTitleWithTail title="공지사항 조회/수정" tailText="목록으로 돌아가기" onClick={() => navigate('/cs/notice')} />

      <ContentTabMenu menuListData={menuListData} />

      <Routes>
        <Route path="info" element={<NoticeInfoBasic noticeFormStore={noticeFormStore} />} />
        <Route path="detail" element={<NoticeInfoDetail />} />
      </Routes>
    </CMContentFlexBox>
  );
});

export default NoticeInfoScreen;
