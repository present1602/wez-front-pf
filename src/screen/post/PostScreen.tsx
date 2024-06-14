import { Box, Button, Divider } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../component/common/Box';
import ListHeader from '../../component/content/ListHeader';
import PageTitle from '../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../component/optionBox/SearchTextBox';
import ListDataStore from '../../store/ListDataStore';
import { useStore } from '../../store/RootStore';
import PostListContent from '../../component/content/ListContent';
import { observer } from 'mobx-react';
import contentUtil from '../../component/content/contentUtil';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import Cookies from 'js-cookie';
import { ZoneRequestHandler } from '../../api/content';
import util from '../../helper/util';

interface IPostScreenProps {}

const listDataStore = new ListDataStore('post', true, true);

const PostScreen: React.FunctionComponent<IPostScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const location: any = useLocation();
  const [artistList, setArtistList] = React.useState<any>([]);
  const adminType = Cookies.get('type');
  const adminId = Cookies.get('admin_id');

  const navigate = useNavigate();

  React.useEffect(() => {
    // listDataStore.fetchListData(); // => listDataStore.init()으로 수정 필요?

    if (adminType === 'MASTER') {
      if (optionDataStore.getOptionData('artistList').length === 0) {
        const strData: any = localStorage.getItem('artistList');
        setArtistList(JSON.parse(strData));
      } else {
        setArtistList(optionDataStore.getOptionData('artistList'));
      }

      if (location.state && location.state.zoneId) {
        listDataStore.searchOptionStore.setArtistList([location.state.zoneId]);
        listDataStore.fetchListData();
        navigate(location.pathname, { state: {}, replace: true });
        return;
      }
    } else if (adminType === 'OFFICIAL') {
      adminId &&
        ZoneRequestHandler.getArtistOptionListOfEditor(adminId, {
          onSuccess: (data: any) => {
            setArtistList(data);
            // listDataStore.init();
            if (location.state && location.state.init) {
              listDataStore.init();
              navigate(location.pathname, { state: {}, replace: true });
            } else {
              listDataStore.fetchListData();
            }
          }
        });
    }

    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, [location]);

  const movePostInfoPage = (postId: string) => {
    navigate(`./${postId}/info`);
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="게시물" />
      <Divider />
      <OptionContainer py={2}>
        <CMLineBox my={2}>
          <OptionItemHead text="아티스트" />
          {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" />}
        </CMLineBox>

        {/* <CMLineBox my={2}> */}
        <OptionSectionSubContainer my={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            <SearchTextBox placeholder="닉네임, 내용으로 검색" onChange={(e: any) => listDataStore.setKeyword(e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>

        <CMLineBox my={2}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="분류" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('postType')} optionKey="postType" />
          </Box>

          <Box sx={{ display: 'flex', flex: 1 }}>
            <OptionItemHead text="상태" />
            <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('postState')} optionKey="postState" />
          </Box>
        </CMLineBox>
      </OptionContainer>

      {adminType === 'OFFICIAL' && <FlexEndMainButton onClick={() => navigate('./create')} text="+ 새 게시물 등록" />}

      <ListHeader listDataStore={listDataStore} />

      <PostListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: 'No', width: 30 },
          { key: 'userNickName', name: '닉네임', width: 30 },
          { key: 'thumbnailImage', name: '썸네일', thumbnail: true, width: 80 },
          { key: 'imageCount', name: '이미지수', width: 50 },
          { key: 'content', name: '내용', onRowClick: (postId: string) => movePostInfoPage(postId), rowKey: 'postId' },
          { key: 'viewsCount', name: '조회수', width: 40 },
          { key: 'replyCount', name: '댓글', width: 40 },
          { key: 'likeCount', name: '좋아요', width: 40 },
          { key: 'reportCount', name: '신고', width: 40 },
          { key: 'bookMarkCount', name: '북마크수', width: 50 },
          { key: 'isHide', name: '상태', processData: (item: any) => util.getDisplayStateReverseText(item) },
          { key: 'created', name: '작성일시', width: 80 }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default PostScreen;
