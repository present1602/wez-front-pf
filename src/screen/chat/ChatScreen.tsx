import { Divider } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { ChatRequestHandler } from '../../api/content';
import { CMContentFlexBox } from '../../component/common/Box';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import ChatRoomListContent from '../../component/content/SimpleListContent';
import PageTitle from '../../component/contentHeader/PageTitle';
import util from '../../helper/util';
import CreateChatModal from './module/CreateChatModal';

interface IChatScreenProps {}

const ChatScreen: React.FunctionComponent<IChatScreenProps> = observer((props) => {
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = React.useState(false);
  const [roomListData, setRoomListData] = React.useState<any>([]);
  const navigate = useNavigate();

  const openCreateChatModal = () => {
    setIsCreateChatModalOpen(true);
  };

  const moveChatRoomInfoPage = (chatId: string) => {
    navigate(`./${chatId}/basic`);
  };

  React.useEffect(() => {
    ChatRequestHandler.openRoomList({
      onSuccess: (data: any) => {
        // setMyReplyList(data);
        setRoomListData(data);
      }
    });
  }, []);

  return (
    <>
      {isCreateChatModalOpen && <CreateChatModal setRoomListData={setRoomListData} setIsCreateChatModalOpen={setIsCreateChatModalOpen} />}
      <CMContentFlexBox>
        <PageTitle title="채팅방 관리" />
        <Divider />

        <FlexEndMainButton text="+ 새 채팅방 등록" onClick={openCreateChatModal} />

        <ChatRoomListContent
          cols={[
            { key: 'rowNumber', name: 'No', width: 30 },
            { key: 'artistZone', name: '아티스트', attr: 'title' },
            {
              key: 'subject',
              name: '채팅방 이름',
              onRowClick: (chatId: string) => moveChatRoomInfoPage(chatId),
              rowKey: 'chatRoomId'
            },
            { key: 'userCount', name: '참여인원' },
            { key: 'lastMsgCreated', name: '최근 메세지', processData: (item: any) => util.convertDateFormat(item) },
            { key: 'status', name: '상태', processData: (item: any) => util.getStatusText(item, 'chatRoom') }
          ]}
          listData={roomListData}
        />
      </CMContentFlexBox>
    </>
  );
});

export default ChatScreen;
