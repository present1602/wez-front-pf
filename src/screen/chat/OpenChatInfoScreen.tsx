import { Box } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import AppHistory from '../../AppHistory';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import PageTitleWithTail from '../../component/contentHeader/PageTitleWithTail';
import ContentTabMenu from '../../component/contentMenu/TabMenu';
import ChatRoomContent from './content/basic/ChatRoomContent';
import { ChatRequestHandler } from '../../api/content';
import ChatDetailContent from './content/detail/ChatDetailContent';

interface IOpenChatInfoScreenProps {
  // chatRoom: any;
}

interface MenuData {
  key: string;
  text: string;
  active: boolean;
}
const menuListData: Array<MenuData> = [
  { key: 'basic', text: '기본정보', active: true },
  { key: 'detail', text: '메세지/참여자 리스트', active: false }
];

const OpenChatInfoScreen: React.FunctionComponent<IOpenChatInfoScreenProps> = observer(() => {
  const { chatRoomId } = useParams();
  const [subject, setSubject] = React.useState<any>('');
  const [roomData, setRoomData] = React.useState<any>([]);

  React.useEffect(() => {
    chatRoomId &&
      ChatRequestHandler.getChatRoomInfo(chatRoomId, {
        onSuccess: (data: any) => {
          setRoomData(data);
          setSubject(data.subject);
        }
      });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '2000px', height: '100%' }}>
      <PageTitleWithTail title={subject} tailText="목록으로 돌아가기" onClick={() => AppHistory.push('/chat')} />

      <ContentTabMenu menuListData={menuListData} />

      <Routes>
        <Route path="basic" element={<ChatRoomContent roomData={roomData} />} />
        <Route path="detail" element={<ChatDetailContent />} />
      </Routes>
    </Box>
  );
});

export default OpenChatInfoScreen;
