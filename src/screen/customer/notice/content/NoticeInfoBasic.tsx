import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CMBoxFlexEnd, CMBoxStretch } from '../../../../component/common/Box';
import { BasicButton, LightButton } from '../../../../component/common/Button';
import BasicInfoContent from '../module/BasicInfoContent';

interface INoticeInfoBasicProps {
  noticeFormStore: any;
}

const NoticeInfoBasic: React.FunctionComponent<INoticeInfoBasicProps> = observer(({ noticeFormStore }) => {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  const submitUpdate = () => {
    noticeId && noticeFormStore.submitUpdate(noticeId);
  };

  return (
    <CMBoxStretch direction="column">
      <CMBoxFlexEnd>
        <Box p={2}>
          <LightButton
            text="취소"
            onClick={() => {
              navigate('/cs/notice');
            }}
          />
          <BasicButton text="저장하기" onClick={() => submitUpdate()} />
        </Box>
      </CMBoxFlexEnd>

      <BasicInfoContent noticeFormStore={noticeFormStore} mode="UPDATE" />
    </CMBoxStretch>
  );
});

export default NoticeInfoBasic;
