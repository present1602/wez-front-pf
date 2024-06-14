import { Box, Typography, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { EditorRequestHandler } from '../../../../api/member';
import { ItemHead14 } from '../../../../component/common/ItemHead';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import util from '../../../../helper/util';
import EditorFormStore from '../../../../store/EditorFormStore';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/RootStore';
import { BasicButton, LightButton } from '../../../../component/common/Button';

interface IEditorBasicInfoProps {}

const editorFormStore = new EditorFormStore();

const EditorBasicInfo: React.FunctionComponent<IEditorBasicInfoProps> = observer((props) => {
  const { optionDataStore } = useStore();
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const { userId } = useParams();

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }

    userId &&
      EditorRequestHandler.getEditorByUserId(userId, {
        onSuccess: (responseData: any) => {
          editorFormStore.setMultipleItem(responseData);
        },
        onFail: () => alert('fail')
      });
  }, []);

  const submitUpdate = () => {
    editorFormStore.submitUpdateEditor();
  };

  const submitDelete = () => {
    // const adminId = Cookies.get('admin_id');
    if (window.confirm('에디터 회원을 삭제하시겠습니까?')) {
      userId && editorFormStore.submitDeleteEditor(userId);
    }
  };

  return (
    <>
      <BasicItemBox>
        <ItemHead14 text="아이디" />
        <Typography>{editorFormStore.accountId}</Typography>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="이름" />
        <TextField
          size="small"
          sx={{ borderRadius: 2, flex: 1 }}
          value={editorFormStore.name}
          inputProps={{
            maxLength: 50
          }}
          onChange={(e) => {
            editorFormStore.setName(e.target.value);
          }}
        />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="담당 아티스트" />
        <Box sx={{ flex: 1, display: 'flex' }}>
          <FormGroup row={true}>
            {artistList.length > 0 &&
              artistList.map((option: any) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        value={option.value}
                        checked={editorFormStore.artistList.includes(option.value.toString()) ? true : false}
                        onClick={(e) => editorFormStore.changeArtistList(e.target)}
                      />
                    }
                    label={option.text}
                  />
                );
              })}
          </FormGroup>
        </Box>
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="가입일" />
        <Typography>{util.getDate(editorFormStore.created)}</Typography>
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="상태" />
        <Typography>{util.getStatusText(editorFormStore.status, 'editor')}</Typography>
      </BasicItemBox>

      <Box sx={{ display: ' flex', justifyContent: 'flex-end' }}>
        <Box px={3}>
          <LightButton text="저장" onClick={() => submitUpdate()} />
          <BasicButton text="삭제" onClick={() => submitDelete()} />
        </Box>
      </Box>
    </>
  );
});

export default EditorBasicInfo;
