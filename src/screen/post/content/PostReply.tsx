import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CountListHeaderWithName } from '../../../component/content/CountListHeader';
import SimpleListDataStore from '../../../store/SimpleListDataStore';
import ReplyListContent from '../../../component/content/ListContent';
import Cookies from 'js-cookie';
import { PostRequestHandler } from '../../../api/content';
import MyReplyListContent from '../../../component/content/SimpleListContent';
import util from '../../../helper/util';
import ReplyReportModalScreen from '../modalScreen/ReplyReportModalScreen';

interface IPostReplyProps {}

const listDataStore = new SimpleListDataStore('postReply', true);

const PostReply: React.FunctionComponent<IPostReplyProps> = observer((props) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const adminType = Cookies.get('type');
  const [myReplyList, setMyReplyList] = React.useState<any>([]);

  const [activeReportReplyId, setActiveReportReplyId] = React.useState(0);

  React.useEffect(() => {
    listDataStore.setPostId(postId || '');
    listDataStore.init();

    if (adminType === 'OFFICIAL' && postId) {
      PostRequestHandler.getPostReplyOfEditor(postId, {
        onSuccess: (data: any) => {
          setMyReplyList(data);
        }
      });
    }
  }, []);

  const openReportListModal = (postReplyId: any) => {
    setActiveReportReplyId(postReplyId);
  };

  const renderReportColumn = (row: any) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>{row.reportCount}</Typography>
        {row.reportCount > 0 && (
          <Typography color="#0000FF" sx={{ cursor: 'pointer' }} onClick={() => openReportListModal(row.postReplyId)}>
            신고내역
          </Typography>
        )}
      </Box>
    );
  };

  const toggleDisplayState = (postReplyId: string, bool: any) => {
    if (postReplyId) {
      const param = {
        postReplyId: postReplyId,
        isHide: bool
      };

      PostRequestHandler.changePostReplyDisplayState(param, {
        onSuccess: (data: any) => {
          alert('노출 상태를 수정하였습니다.');
          listDataStore.fetchListData();
        },
        onFail: (data: any) => {
          alert('오류입니다.');
          console.log('fail response : ', data);
        }
      });
    }
  };

  return (
    <Box>
      {activeReportReplyId > 0 && <ReplyReportModalScreen replyId={activeReportReplyId} setActiveReportReplyId={setActiveReportReplyId} />}
      {adminType === 'OFFICIAL' && myReplyList.length > 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }} my={2}>
            <Typography mx={1} sx={{ fontSize: 18 }}>
              내 댓글
            </Typography>
            <Typography ml={1} mr={2} sx={{ fontSize: 18 }}>
              {myReplyList.length}개
            </Typography>
          </Box>

          <MyReplyListContent
            cols={[
              { key: 'rowNumber', name: 'No', width: 30 },
              { key: 'nickName', name: '닉네임' },
              { key: 'content', name: '댓글내용' },
              { key: 'updated', name: '수정시간', processData: (item: any) => util.getDate(item) },
              { key: 'created', name: '작성시간', processData: (item: any) => util.getDate(item) },
              { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) }
            ]}
            listData={myReplyList}
          />
        </>
      )}
      <CountListHeaderWithName listDataStore={listDataStore} name="댓글" />
      {/* No, 아티스트, 닉네임, 댓글내용, 신고, 수정시간, 작성시간, 상태, (게시물보기) */}

      {adminType === 'MASTER' ? (
        <ReplyListContent
          cols={[
            { key: 'rowNumber', name: 'No', width: 30 },
            { key: 'type', name: '분류', processData: (item: any) => util.getTypeText(item) },
            { key: 'nickName', name: '닉네임' },
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
            { key: 'content', name: '댓글내용' },
            { key: 'reportCount', name: '신고', convertToHtml: (row: any) => renderReportColumn(row) },
            { key: 'updated', name: '수정일시' },
            { key: 'created', name: '작성일시' },
            { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) },
            {
              key: 'actionButton',
              name: '',
              contentKey: 'isHide',
              rowKey: 'postReplyId',
              onClick: (itemKey: string, val: any) => {
                toggleDisplayState(itemKey, val);
              },
              processData: (item: any) => util.getChangeStateButtonText(item)
            }
          ]}
          store={listDataStore}
        />
      ) : (
        <ReplyListContent
          cols={[
            { key: 'rowNumber', name: 'No', width: 30 },
            { key: 'type', name: '분류', processData: (item: any) => util.getTypeText(item) },
            { key: 'nickName', name: '닉네임' },
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
            { key: 'content', name: '댓글내용' },
            { key: 'reportCount', name: '신고' },
            { key: 'updated', name: '수정일시' },
            { key: 'created', name: '작성일시' },
            { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) }
          ]}
          store={listDataStore}
        />
      )}
    </Box>
  );
});

export default PostReply;
