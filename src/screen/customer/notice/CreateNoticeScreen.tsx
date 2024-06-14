import { Box, Divider } from '@mui/material';
import * as React from 'react';
import { CMBoxFlexEnd, CMContentFlexBox } from '../../../component/common/Box';
import { BasicButton, LightButton } from '../../../component/common/Button';
import PageTitleWithTail from '../../../component/contentHeader/PageTitleWithTail';
import NoticeFormStore from '../../../store/NoticeFormStore';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router';
import BasicInfoContent from './module/BasicInfoContent';

interface ICreateNoticeScreenProps {}

const noticeFormStore = new NoticeFormStore();

const CreateNoticeScreen: React.FunctionComponent<ICreateNoticeScreenProps> = observer((props) => {
  const navigate = useNavigate();

  const submitCreate = () => {
    noticeFormStore.submitCreate();
  };

  return (
    <CMContentFlexBox>
      <PageTitleWithTail title="새 공지 등록" tailText="목록으로 돌아가기" onClick={() => navigate('/cs/notice')} />
      <Divider />
      <CMBoxFlexEnd>
        <Box p={2}>
          <LightButton
            text="취소"
            onClick={() => {
              navigate('/cs/notice');
            }}
          />
          <BasicButton text="저장하기" onClick={() => submitCreate()} />
        </Box>
      </CMBoxFlexEnd>

      <BasicInfoContent noticeFormStore={noticeFormStore} mode="CREATE" />
    </CMContentFlexBox>
  );
});

export default CreateNoticeScreen;
