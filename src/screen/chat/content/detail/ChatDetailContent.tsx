import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Box, Paper, Typography, TextField, CardMedia, Link } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChatRequestHandler } from '../../../../api/content';
import { CMBoxAlignCenter, CMBoxFlexEnd, CMBoxStretch } from '../../../../component/common/Box';
import Checkbox from '@mui/material/Checkbox';
import util from '../../../../helper/util';
import { observer } from 'mobx-react';
import chatUtil from '../../../../helper/chatUtil';
import { v4 } from 'uuid';

interface IChatDetailContentProps {
  // chatId: string;
}

const ChatDetailContent: React.FunctionComponent<IChatDetailContentProps> = observer((props) => {
  const { chatRoomId } = useParams();
  const [msgListData, setMsgListData] = React.useState<any>([]);
  const [nickNameKeyword, setNickNameKeyword] = React.useState('');
  const [userListData, setUserListData] = React.useState<any>([]);
  const [banUserList, setBanUserList] = React.useState<any>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);

  const observer: any = React.useRef();

  const chatImg = 'photocard/ee61d225-a95d-4e99-94f6-52b7d6689c13-1654848189806.jpg';

  const lastMsgElementRef = React.useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('chatRoomId : ', chatRoomId);
    if (chatRoomId) {
      const param = {
        chatRoomId: chatRoomId,
        pagingOption: {
          rowsPerPage: 20,
          page: pageNumber
        }
      };
      setLoading(true);
      ChatRequestHandler.getOpenChatMsgList(param, {
        onSuccess: (data: any) => {
          setMsgListData([...msgListData, ...data]);
          setLoading(false);
          setHasMore(data.length > 0);
        }
      });
    }
  }, [pageNumber]);

  React.useEffect(() => {
    const userParam = {
      chatRoomId: chatRoomId
    };
    ChatRequestHandler.getOpenChatUserList(userParam, {
      onSuccess: (data: any) => {
        setUserListData(data);
      }
    });
  }, []);

  React.useEffect(() => {
    let userParam = {
      chatRoomId: chatRoomId,
      keyword: nickNameKeyword
    };
    if (chatRoomId && nickNameKeyword.trim() === '') {
      userParam.keyword = '';
    }

    ChatRequestHandler.getOpenChatUserList(userParam, {
      onSuccess: (data: any) => {
        setUserListData(data);
      }
    });
  }, [nickNameKeyword]);

  const toggleBanUserCheck = (e: any) => {
    const userId = e.target.value;

    if (banUserList.includes(userId)) {
      const updatedList = banUserList.filter((item: any) => {
        return item !== userId;
      });
      setBanUserList(updatedList);
    } else {
      const updatedList = [...banUserList, userId];
      setBanUserList(updatedList);
    }
  };

  const refreshList = () => {
    // window.location.reload();
    setMsgListData([]);
    if (pageNumber !== 1) {
      setPageNumber(1);
    } else {
      if (chatRoomId) {
        const param = {
          chatRoomId: chatRoomId,
          pagingOption: {
            rowsPerPage: 20,
            page: pageNumber
          }
        };
        setLoading(true);
        ChatRequestHandler.getOpenChatMsgList(param, {
          onSuccess: (data: any) => {
            setMsgListData(data);
            setLoading(false);
            setHasMore(data.length > 0);
          }
        });
      }
    }

    const userParam = {
      chatRoomId: chatRoomId
    };
    ChatRequestHandler.getOpenChatUserList(userParam, {
      onSuccess: (data: any) => {
        setUserListData(data);
      }
    });
  };

  const handleBanUserClick = (userId: any, nickName: any) => {
    if (window.confirm(`참여자 ${nickName}(을)를 강퇴하시겠습니까?`)) {
      if (chatRoomId) {
        const param = {
          userId: userId,
          chatRoomId: chatRoomId
        };
        ChatRequestHandler.banUser(param, {
          onSuccess: (data: any) => {
            alert('강퇴하였습니다');

            const userParam = {
              chatRoomId: chatRoomId
            };

            ChatRequestHandler.getOpenChatUserList(userParam, {
              onSuccess: (data: any) => {
                setUserListData(data);
              }
            });
          }
        });
      }
    }
  };

  const submitBanListOfUser = () => {
    if (chatRoomId) {
      if (window.confirm('이용자들을 강퇴하시겠습니까?')) {
        const param = {
          chatRoomId: chatRoomId,
          userIdList: banUserList
        };
        ChatRequestHandler.banListOfUser(param, {
          onSuccess: (data: any) => {
            alert('이용자들을 강퇴하였습니다');

            const userParam = {
              chatRoomId: chatRoomId
            };

            ChatRequestHandler.getOpenChatUserList(userParam, {
              onSuccess: (data: any) => {
                setUserListData(data);
              }
            });
          }
        });
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 250px)' }}>
      <Box my={1} />

      <CMBoxFlexEnd>
        <Typography px={1} color="neutral.main" onClick={() => refreshList()} sx={{ border: '1px solid gray', fontSize: '13px', cursor: 'pointer' }}>
          새로고침
        </Typography>
      </CMBoxFlexEnd>

      <Box sx={{ display: 'flex', height: '90%' }} pt={1}>
        <CMBoxStretch direction="column">
          <Box>
            <Typography variant="h6">메세지</Typography>
          </Box>
          <Box sx={{ flex: 1, border: '1px solid gray', overflowY: 'scroll' }}>
            {msgListData.map((item: any, idx: number) => {
              return (
                (item.type === 'CHAT' || item.type === 'SYS') && (
                  <Box sx={{ display: 'flex' }} py={1} ref={msgListData.length === idx + 1 ? lastMsgElementRef : null} key={v4()}>
                    <Box sx={{ display: 'flex' }} py={1}>
                      <Typography px={1}>{util.convertDateFormat(item.created)}</Typography>
                      {/* <Typography>{item.chatSession.nickName !== undefined ? item.chatSession.nickName : ''}</Typography> */}

                      {item.type === 'CHAT' && (
                        <Box px={1}>
                          <Typography sx={{ display: 'inline' }}>{item.chatSession.nickName}</Typography>
                          <Typography sx={{ display: 'inline' }} px={1}>
                            {item.msg}
                          </Typography>
                        </Box>
                      )}

                      {item.type === 'IMAGE' && (
                        <Box px={1}>
                          {item.chatSession.nickName && <Typography sx={{ display: 'inline' }}>{item.chatSession.nickName}</Typography>}
                          <Typography>url: img</Typography>
                          <CardMedia component="img" height="100" image={util.getImageProxyPath(chatImg, 200)} alt="chat image" />
                        </Box>
                      )}

                      {item.type === 'SYS' && <Typography px={1}>{chatUtil.getChatSysMsg(item.msg, item.chatSession.nickName)}</Typography>}
                    </Box>
                  </Box>
                )
              );
            })}
          </Box>
        </CMBoxStretch>
        <Box px={2} />

        <CMBoxStretch direction="column">
          <Box py={2} mt={1}>
            <CMBoxAlignCenter>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Typography px={1} color="#0000FF" onClick={() => submitBanListOfUser()} sx={{ border: '1px solid #0000FF', cursor: 'pointer' }}>
                  내보내기
                </Typography>
              </Box>
              <Box>
                <TextField value={nickNameKeyword} onChange={(e) => setNickNameKeyword(e.target.value)} placeholder="닉네임검색" size="small" sx={{ width: '220px' }} />
              </Box>
            </CMBoxAlignCenter>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" key={v4()}>
                    선택
                  </TableCell>
                  <TableCell align="center" key={v4()}>
                    프로필
                  </TableCell>
                  <TableCell align="center" key={v4()}>
                    닉네임
                  </TableCell>
                  <TableCell align="center" key={v4()}>
                    계정정보
                  </TableCell>
                  <TableCell align="center" key={v4()}>
                    관리
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* {data.chatSession.nickName}
              {`data.chatSession.userId} */}
              <TableBody>
                {userListData.map((user: any) => {
                  return (
                    <TableRow key={v4()}>
                      <TableCell align="center" key={v4()}>
                        <Checkbox value={user.userId} onChange={toggleBanUserCheck} checked={banUserList.includes(user.userId) ? true : false} />
                      </TableCell>
                      <TableCell align="center" key={v4()}>
                        {user.imgUrl && (
                          <CardMedia component="img" sx={{ width: '64px', height: '64px', margin: '0 auto', borderRadius: '40px' }} image={util.getImageProxyPath(user.imgUrl)} alt="user profile" />
                        )}
                      </TableCell>
                      <TableCell align="center" key={v4()}>
                        {user.nickName}
                      </TableCell>
                      <TableCell align="center" key={v4()}>
                        <Typography onClick={() => navigate(`/member/user/${user.userId}/info`)}>보기</Typography>
                      </TableCell>
                      <TableCell align="center" key={v4()}>
                        {/* <Typography sx={{ }}>내보내기</Typography> */}
                        <Typography color="#0000FF" sx={{ margin: '2px', fontSize: 15, display: 'inline-block', cursor: 'pointer' }} onClick={() => handleBanUserClick(user.userId, user.nickName)}>
                          내보내기
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CMBoxStretch>
      </Box>
    </Box>
  );
});

export default ChatDetailContent;
