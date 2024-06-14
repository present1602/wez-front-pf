import { Box, Typography, TextField } from '@mui/material';
import * as React from 'react';
import { EditorMyPageRequestHandler, EditorRequestHandler } from '../../../../api/member';
import { ItemHead14 } from '../../../../component/common/ItemHead';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import util from '../../../../helper/util';
import Cookies from 'js-cookie';
import FlexEndMainButton from '../../../../component/common/FlexEndMainButton';
import { v4 } from 'uuid';

interface IEditorBasicInfoProps {}

const EditorBasicInfo: React.FunctionComponent<IEditorBasicInfoProps> = (props) => {
  const [editorData, setEditorData] = React.useState<any>({});
  const [name, setName] = React.useState<any>('');
  const adminId = Cookies.get('admin_id');

  React.useEffect(() => {
    adminId &&
      EditorMyPageRequestHandler.getMyPageBasicInfo(adminId, {
        onSuccess: (responseData: any) => {
          setEditorData(responseData);
        },
        onFail: () => alert('fail')
      });
  }, []);

  React.useEffect(() => {
    setName(editorData.name);
  }, [editorData]);

  const submitUpdate = () => {
    if (editorData.name === name) {
      return;
    }
    if (adminId) {
      const param = {
        adminId: adminId,
        name: name
      };
      EditorRequestHandler.updateEditorMyProfile(param, { onSuccess: () => alert('정보를 변경하였습니다.'), onFail: () => alert('정보변경에 실퍄했습니다.') });
    }
  };

  return (
    <>
      <FlexEndMainButton
        text="저장하기"
        onClick={() => {
          submitUpdate();
        }}
      />
      <BasicItemBox>
        <ItemHead14 text="아이디" />
        <Typography>{editorData.accountId}</Typography>
      </BasicItemBox>
      <BasicItemBox>
        <ItemHead14 text="이름" />
        <TextField
          size="small"
          sx={{ borderRadius: 2, flex: 1 }}
          value={name || ''}
          inputProps={{
            maxLength: 50
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="담당 아티스트" />
        <Box sx={{ flex: 1, display: 'flex' }}>
          {editorData.artistList &&
            editorData.artistList.map((item: any) => {
              return (
                <Box key={v4()}>
                  <Typography px={1}>{item.title}</Typography>
                </Box>
              );
            })}
        </Box>
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="가입일" />
        <Typography>{util.getDate(editorData.created)}</Typography>
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead14 text="상태" />
        <Typography>{util.getStatusText(editorData.status, 'editor')}</Typography>
      </BasicItemBox>
    </>
  );
};

export default EditorBasicInfo;
