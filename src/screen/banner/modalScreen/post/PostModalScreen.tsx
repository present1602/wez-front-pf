import { Box, Button, Divider } from '@mui/material';
import * as React from 'react';
import { ModalBackground } from '../../../../component/common/Modal';
import { CMBoxFlexEnd, CMLineBox, OptionContainer, CMContentFlexBoxWithHeight } from '../../../../component/common/Box';
import ListHeader from '../../../../component/content/ListHeader';
import PageTitle from '../../../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../../component/optionBox/SearchTextBox';
import ListDataStore from '../../../../store/ListDataStore';
import { useStore } from '../../../../store/RootStore';
import PostModalListContent from '../content/ModalListContent';
import { observer } from 'mobx-react';
import contentUtil from '../../../../component/content/contentUtil';
import CancelIcon from '@mui/icons-material/CancelOutlined';

interface IPostModalScreenProps {
  bannerFormStore?: any;
  setListModalControl?: any;
}

const listDataStore = new ListDataStore('post', true, true);

const PostModalScreen: React.FunctionComponent<IPostModalScreenProps> = observer(({ bannerFormStore, setListModalControl }: any) => {
  const { optionDataStore } = useStore();

  const closeModal = () => {
    setListModalControl({ contentKey: '', languageCode: '' });
  };

  React.useEffect(() => {
    listDataStore.init();
  }, []);

  return (
    <ModalBackground>
      <Box width={'90%'} height="95%" sx={{ backgroundColor: '#fff' }} px={2} pt={1}>
        <CMBoxFlexEnd px={1}>
          <CancelIcon onClick={() => closeModal()} sx={{ cursor: 'pointer' }} />
        </CMBoxFlexEnd>
        <CMContentFlexBoxWithHeight height="90%">
          <PageTitle title="게시물" />
          <Divider />
          <OptionContainer py={2}>
            <CMLineBox my={2}>
              <OptionItemHead text="아티스트" />
              <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={optionDataStore.getOptionData('artistList')} optionKey="artistList" listKey="user" />
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
          {/* No 분류 닉네임 1썸네일 2이미지수 내용 조회수 3댓글 4좋아요 5신고 6북마크수 작성일시 */}

          <ListHeader listDataStore={listDataStore} />

          <PostModalListContent
            store={listDataStore}
            bannerFormStore={bannerFormStore}
            setListModalControl={setListModalControl}
            cols={[
              { key: 'rowNumber', name: 'No', width: 30 },
              { key: 'userNickName', name: '닉네임', width: 30 },
              { key: 'thumbnailImage', name: '썸네일', thumbnail: true, width: 80 },
              { key: 'imageCount', name: '이미지수' },
              { key: 'content', name: '내용', isHtml: true },
              { key: 'viewsCount', name: '조회수' },
              { key: 'replyCount', name: '댓글' },
              { key: 'likeCount', name: '좋아요' },
              { key: 'reportCount', name: '신고' },
              { key: 'bookMarkCount', name: '북마크수' },
              { key: 'created', name: '작성일시' }
            ]}
          />
        </CMContentFlexBoxWithHeight>
      </Box>
    </ModalBackground>
  );
});

export default PostModalScreen;
