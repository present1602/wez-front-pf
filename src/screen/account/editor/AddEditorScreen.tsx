import { Box, Divider, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BasicButton, LightButton } from '../../../component/common/Button';
import { BasicItemBox } from '../../../component/common/ItemBox';
import { ItemHead14 } from '../../../component/common/ItemHead';
import PageTitle from '../../../component/contentHeader/PageTitle';
import { CMContentFlexBox } from '../../../component/common/Box';
import EditorFormStore from '../../../store/EditorFormStore';
import { CheckboxGroupContentWithCheckedList } from '../../../component/optionBox/CheckboxGroup';
import { useStore } from '../../../store/RootStore';
import { useNavigate } from 'react-router';

interface IAddEditorProps {}

const editorFormStore = new EditorFormStore();

const AddEditorScreen: React.FunctionComponent<IAddEditorProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const navigate = useNavigate();

  const cancleProcess = () => {
    editorFormStore.init();
    navigate('/member/editor');
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="에디터 추가" />
      <Divider />

      <Box sx={{ backgroundColor: 'primary.light' }} mt={2}>
        <Box sx={{ display: 'flex', padding: '20px 24px 0' }}>
          <Box sx={{ padding: '6px 12px', borderRadius: '4px 4px 0 0', background: '#fff' }}>
            <Typography>기본정보</Typography>
          </Box>
        </Box>
      </Box>

      <BasicItemBox>
        <ItemHead14 text="아이디" />
        <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={editorFormStore.accountId} onChange={(e) => editorFormStore.setAccountId(e.target.value)} />
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="이름" />
        <TextField size="small" sx={{ borderRadius: 2, flex: 1 }} value={editorFormStore.name} onChange={(e) => editorFormStore.setName(e.target.value)} />
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="비밀번호" />
        <TextField type="password" size="small" sx={{ borderRadius: 2, flex: 1 }} value={editorFormStore.password} onChange={(e) => editorFormStore.setPassword(e.target.value)} />
      </BasicItemBox>

      <BasicItemBox maxWidth="800px">
        <ItemHead14 text="아티스트" />
        <CheckboxGroupContentWithCheckedList
          checkedList={editorFormStore.artistList}
          optionList={optionDataStore.getOptionData('artistList')}
          onClick={(item: any) => editorFormStore.changeArtistList(item)}
          excludeHasAll={true}
          optionKey="artistList"
        />
      </BasicItemBox>

      <Box sx={{ display: ' flex', justifyContent: 'flex-end' }}>
        <Box px={3}>
          <LightButton text="취소" onClick={() => cancleProcess()} />
          <BasicButton text="저장" onClick={() => editorFormStore.submitAddEditor()} />
        </Box>
      </Box>
    </CMContentFlexBox>
  );
});

export default AddEditorScreen;
