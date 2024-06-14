import { Box, Button, Divider } from '@mui/material';
import * as React from 'react';
import AppHistory from '../../../AppHistory';
import { CMContentFlexBox, CMLineBox, OptionContainer } from '../../../component/common/Box';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CheckboxGroupContent } from '../../../component/optionBox/CheckboxGroup';
import { OptionItemHead, OptionItemHeadWithoutPadding } from '../../../component/optionBox/OptionItemHead';
import OptionSectionSubContainer from '../../../component/optionBox/OptionSectionSubContainer';
import SearchTextBox from '../../../component/optionBox/SearchTextBox';
import ListDataStore from '../../../store/ListDataStore';
import EditorListContent from '../../../component/content/ListContent';
import util from '../../../helper/util';
import { observer } from 'mobx-react';
import ListHeader from '../../../component/content/ListHeader';
import { useStore } from '../../../store/RootStore';
import contentUtil from '../../../component/content/contentUtil';
import { useLocation, useNavigate } from 'react-router';

interface IEditorScreenProps {}

let listDataStore = new ListDataStore('editor', true, true);

const EditorScreen: React.FunctionComponent<IEditorScreenProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const location: any = useLocation();

  const navigate = useNavigate();
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }

    // listDataStore.init();
    if (location.state && location.state.init) {
      listDataStore.init();
      navigate(location.pathname, { state: {}, replace: true });
    } else {
      listDataStore.fetchListData();
    }
  }, [location]);

  return (
    <CMContentFlexBox>
      <PageTitle title="에디터" />
      <Divider />

      <OptionContainer py={3}>
        <OptionSectionSubContainer>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OptionItemHeadWithoutPadding text="검색" width="70px" />
            {/* placeholder, onChange */}
            <SearchTextBox placeholder="이름, 아이디로 검색" onChange={(e: any) => listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)} listDataStore={listDataStore} />
            <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => contentUtil.handleSearch(listDataStore)}>
              검색
            </Button>
          </Box>
        </OptionSectionSubContainer>

        <CMLineBox my={2}>
          <OptionItemHead text="아티스트" />
          {artistList && artistList.length > 0 && <CheckboxGroupContent searchOptionStore={listDataStore.searchOptionStore} optionList={artistList} optionKey="artistList" />}
        </CMLineBox>
      </OptionContainer>

      <FlexEndMainButton onClick={() => AppHistory.push('/member/editor/add')} text="추가" />

      <ListHeader listDataStore={listDataStore} />

      <EditorListContent
        store={listDataStore}
        cols={[
          { key: 'rowNumber', name: '번호', width: 30 },
          {
            key: 'accountId',
            name: '아이디',
            onClickWithRowParam: (param: any) => {
              if (param.status === 'normal') {
                navigate(`/member/editor/${param.userId}/info`);
              } else {
                alert('삭제된 회원입니다.');
              }
            }
          },
          { key: 'name', name: '이름' },
          { key: 'artistList', name: '아티스트' },
          { key: 'status', name: '상태', processData: (item: string) => util.getStatusText(item, 'admin') },
          { key: 'created', name: '가입일시' },
          { key: 'lastLogin', name: '최종로그인' },
          { key: 'expired', name: '삭제일시', processData: (item: string) => util.convertDateFormat(item) }
        ]}
      />
    </CMContentFlexBox>
  );
});

export default EditorScreen;
