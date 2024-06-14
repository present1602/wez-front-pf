import { Box, Typography, TextField } from '@mui/material';
import * as React from 'react';
import { CMBoxFlexEnd, CMBoxJustifyCenter } from '../../../component/common/Box';
import { ModalBackground } from '../../../component/common/Modal';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import { ItemBoxLineSpacing } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import { PostRequestHandler } from '../../../api/content';
import { AccentButton, LightButton } from '../../../component/common/Button';
import { CreatePostReplyParam } from '../../../types/post';

interface ICreateReplyModalProps {
  setIsReplyModalOpen?: any;
  postId?: any;
  zoneId?: any;
  userNickName?: any;
}

const CreateReplyModal: React.FunctionComponent<ICreateReplyModalProps> = ({ setIsReplyModalOpen, userNickName, postId, zoneId }: any) => {
  const [replyContent, setReplyContent] = React.useState('');
  const [nickName, setNickName] = React.useState('');

  const cancleReply = () => {
    setReplyContent('');
    setIsReplyModalOpen(false);
  };

  const submitReply = () => {
    if (replyContent.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (window.confirm('댓글을 등록하시겠습니까?')) {
      if (postId) {
        const adminUser: any = window.localStorage.getItem('user');
        const userId = JSON.parse(adminUser).userId;

        const param: CreatePostReplyParam = {
          postId: postId,
          userId: userId,
          zoneId: zoneId,
          content: replyContent
        };
        PostRequestHandler.createPostReply(param, {
          onSuccess: () => {
            alert('댓글을 등록하였습니다.');
            cancleReply();
          }
        });
      }
    }
  };

  React.useEffect(() => {
    const adminUser: any = window.localStorage.getItem('user');
    const nickName = JSON.parse(adminUser).name;

    setNickName(nickName);
  }, []);

  return (
    <ModalBackground>
      <Box width={'460px'} sx={{ backgroundColor: '#fff' }} p={2}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => cancleReply()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMBoxJustifyCenter>
          <Typography variant="h6">댓글작성</Typography>
        </CMBoxJustifyCenter>
        <Box>
          <ItemBoxLineSpacing>
            <ItemHead16 text="닉네임" width="80px" />
            <Box sx={{ flex: 1 }}>
              <Typography>{nickName}</Typography>
            </Box>
          </ItemBoxLineSpacing>
          <ItemBoxLineSpacing>
            <ItemHead16 text="내용" width="80px" />
            <Box sx={{ flex: 1 }} pr={3}>
              <TextField multiline={true} sx={{ width: '100%' }} minRows={3} value={replyContent} inputProps={{ maxLength: 512 }} onChange={(e: any) => setReplyContent(e.target.value)} />
            </Box>
          </ItemBoxLineSpacing>
          <CMBoxFlexEnd>
            <Typography>{replyContent.length} / 512</Typography>
          </CMBoxFlexEnd>
        </Box>
        <CMBoxJustifyCenter>
          <LightButton onClick={() => cancleReply()} text="취소" />
          <AccentButton onClick={() => submitReply()} text="등록" backgroundColor="highlight.main" />
        </CMBoxJustifyCenter>
      </Box>
    </ModalBackground>
  );
};

export default CreateReplyModal;
