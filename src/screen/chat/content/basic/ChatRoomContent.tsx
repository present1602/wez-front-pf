import { Box, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChatRequestHandler } from '../../../../api/content';
import { CMBoxFlexEnd, CMBoxStretch } from '../../../../component/common/Box';
import { DangerButton, SmallButton } from '../../../../component/common/Button';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import { ItemHead20 } from '../../../../component/common/ItemHead';
import util from '../../../../helper/util';

interface IChatRoomContentProps {
  // chatId: string;
  roomData?: any;
}

const ChatRoomContent: React.FunctionComponent<IChatRoomContentProps> = observer((props) => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = React.useState<any>(props.roomData || {});
  const [roomName, setRoomName] = React.useState('');

  React.useEffect(() => {
    chatRoomId &&
      ChatRequestHandler.getChatRoomInfo(chatRoomId, {
        onSuccess: (data: any) => {
          setRoomData(data);
          setRoomName(data.subject);
        }
      });
  }, []);

  const handleRoomNameChange = (e: any) => {
    setRoomName(e.target.value);
  };

  const submitUpdate = () => {
    if (roomName.trim() === '') {
      alert('채팅방 이름을 입력해주세요');
      return;
    }
    if (chatRoomId) {
      const param = {
        chatRoomId: chatRoomId,
        subject: roomName
      };
      ChatRequestHandler.updateOpenRoom(param, {
        onSuccess: (data: any) => {
          alert('채팅방 정보를 수정하였습니다.');
          setTimeout(() => {
            setRoomData(data);
            setRoomName(data.subject);
          }, 300);
        }
      });
    }
  };

  const submitDelete = () => {
    if (chatRoomId) {
      if (window.confirm(`${roomData.subject} 채팅방을 삭제하시겠습니까?`)) {
        ChatRequestHandler.deleteChatOpenRoom(chatRoomId, {
          onSuccess: () => {
            alert('채팅방을 삭제하였습니다.');
            setTimeout(() => {
              navigate('/chat', { replace: true });
            }, 300);
          }
        });
      }
    }
  };

  return (
    <CMBoxStretch direction="column">
      <Box my={1} />

      <CMBoxFlexEnd>
        <DangerButton text="삭제" onClick={() => submitDelete()} />
      </CMBoxFlexEnd>

      <BasicItemBox>
        <ItemHead20 text="채팅방이름" />
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            value={roomName}
            onChange={handleRoomNameChange}
            inputProps={{
              maxLength: 50
            }}
          />
          <Box sx={{ display: 'inline' }} px={1} />
          <SmallButton text="저장" onClick={() => submitUpdate()} backgroundColor={'neutral.moderate'} />
        </Box>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead20 text="아티스트" />
        <Box sx={{ display: 'flex' }}>
          <Typography px={1}>{roomData.artistTitle}</Typography>
        </Box>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead20 text="최대참여자수" />
        <Box sx={{ display: 'flex' }}>
          <Typography px={1}>{roomData.limit}</Typography>
        </Box>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead20 text="참여자수" />
        <Box sx={{ display: 'flex' }}>
          <Typography px={1}>{roomData.userCount}</Typography>
        </Box>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead20 text="최근메세지" />
        <Box sx={{ display: 'flex' }}>
          <Typography px={1}>{util.convertDateFormat(roomData.lastMsgCreated)}</Typography>
        </Box>
      </BasicItemBox>
    </CMBoxStretch>
  );
});

export default ChatRoomContent;
