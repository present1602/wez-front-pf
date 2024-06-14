import { Box } from '@mui/material';
import * as React from 'react';
import ListDataStore from '../../../store/ListDataStore';
import OptionSection from './OptionSection';
import ReportListContent from '../../../component/content/ListContent';
import { observer } from 'mobx-react';
import ListHeader from '../../../component/content/ListHeader';
import { useNavigate } from 'react-router';
import util from '../../../helper/util';
import { ReportRequestHandler } from '../../../api/content';
import { useLocation } from 'react-router-dom';

interface IReportReplyProps {}

const listDataStore = new ListDataStore('reportReply', true, true);

const ReportReply: React.FunctionComponent<IReportReplyProps> = observer((props) => {
  const navigate = useNavigate();
  const location: any = useLocation();

  React.useEffect(() => {
    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, []);

  const onRowClick = (item: any) => {
    if (!item.isConfirm) {
      ReportRequestHandler.confirmReport(item.reportId);
    }

    navigate(`/content/post/${item.postId}/info`);
  };

  return (
    <Box>
      <OptionSection listDataStore={listDataStore} />
      <ListHeader listDataStore={listDataStore} />
      <ReportListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No' },
          { key: 'artistZone', name: '아티스트', attr: 'title' },
          { key: 'nickName', name: '신고자닉네임' },
          { key: 'content', name: '신고 댓글', onClickWithRowParam: (row: any) => onRowClick(row) },
          { key: 'type', name: '신고이유', processData: (item: any) => util.getReportTypeText(item) },
          { key: 'comment', name: '내용' },
          { key: 'reportCount', name: '누적신고수' },
          { key: 'created', name: '신고일시' },
          { key: 'replyState', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) },
          { key: 'confirmed', name: '확인시간', processData: (item: any) => util.convertDateFormat(item) },
          {
            key: 'movePage',
            name: '신고자 정보',
            colText: '보기',
            contentKey: 'userId',
            onClick: (userId: string) => {
              navigate(`/member/user/${userId}/info`);
            }
          }
        ]}
      />
    </Box>
  );
});

export default ReportReply;
