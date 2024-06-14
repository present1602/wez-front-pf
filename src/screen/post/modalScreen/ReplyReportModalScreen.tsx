import { Box, Button, Divider } from '@mui/material';
import * as React from 'react';
import { ModalBackground } from '../../../component/common/Modal';
import { CMBoxFlexEnd, CMContentFlexBoxWithHeight } from '../../../component/common/Box';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { observer } from 'mobx-react';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router';
import SimpleListDataStore from '../../../store/SimpleListDataStore';
import BasicListDatatContent from '../../../component/content/ListContent';

interface IReplyReportModalScreenProps {
  replyId: any;
  setActiveReportReplyId: any;
}

const listDataStore = new SimpleListDataStore('replyReport', true);

const ReplyReportModalScreen: React.FunctionComponent<IReplyReportModalScreenProps> = observer(({ replyId, setActiveReportReplyId }) => {
  const navigate = useNavigate();

  const closeModal = () => {
    setActiveReportReplyId('');
  };

  React.useEffect(() => {
    listDataStore.setReplyId(replyId);
    listDataStore.fetchListData();
  }, []);

  return (
    <ModalBackground>
      <Box width={'90%'} height="95%" sx={{ backgroundColor: '#fff' }} px={2} pt={1}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => closeModal()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMContentFlexBoxWithHeight height="90%">
          <PageTitle title="댓글 신고내역" />
          <Divider />

          <BasicListDatatContent
            store={listDataStore}
            cols={[
              { key: 'rowNumber', name: 'No' },
              { key: 'nickName', name: '신고자닉네임' },
              {
                key: 'conditionalAction',
                name: '계정정보',
                colText: '보기',
                onClickWithRowParam: (row: any) => {
                  if (row.type === 'OFFICIAL') {
                    navigate(`/member/editor/${row.userId}/info`);
                  } else {
                    navigate(`/member/user/${row.userId}/info`);
                  }
                }
              },
              { key: 'type', name: '신고이유' },
              { key: 'comment', name: '내용' },
              { key: 'created', name: '시간' }
            ]}
          />
        </CMContentFlexBoxWithHeight>
      </Box>
    </ModalBackground>
  );
});

export default ReplyReportModalScreen;
