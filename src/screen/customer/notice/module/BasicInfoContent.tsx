import * as React from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { BasicItemBox } from '../../../../component/common/ItemBox';
import { ItemHead16 } from '../../../../component/common/ItemHead';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditorStyle.css';
import { observer } from 'mobx-react';
import { CMBoxStretch } from '../../../../component/common/Box';
import { requests } from '../../../../api/requests';
import { MEDIA_BASE_URL } from '../../../../constants/config';
import { NoticeRequestHandler } from '../../../../api/content';
import { useParams } from 'react-router-dom';

interface IBasicInfoContentProps {
  noticeFormStore: any;
  mode: string;
}

const BasicInfoContent: React.FunctionComponent<IBasicInfoContentProps> = observer(({ noticeFormStore, mode }) => {
  const { noticeId } = useParams();

  const handleEditorStateChange = (editorState: any) => {
    noticeFormStore.onEditorStateChange(editorState);
  };

  function uploadImageCallBack(file: any) {
    return new Promise(async (resolve, reject) => {
      let data: any = new FormData();
      data.append('file', file);
      data.append('dir', 'notice');

      // try {
      const result = await requests.post('/upload/image', data, { 'Content-type': 'multipart/form-data' });
      if (result.data.name && result.data.url) {
        let link = `${MEDIA_BASE_URL}/${result.data.url}`;
        result.data.link = link;
        resolve(result);
      }
    });
  }

  React.useEffect(() => {
    if (mode === 'UPDATE') {
      noticeId && NoticeRequestHandler.getNotice(noticeId, { onSuccess: (data: any) => noticeFormStore.setMultipleItem(data) });
    }
  }, []);

  const handleLanguageCodeChange = (e: any) => {
    noticeFormStore.setLanguageCode(e.target.value);
  };

  const handleTypeChange = (e: any) => {
    noticeFormStore.setType(e.target.value);
  };

  return (
    <CMBoxStretch direction="column">
      <BasicItemBox>
        <ItemHead16 text="언어" />
        <Box sx={{ flex: 1 }}>
          <RadioGroup row onChange={handleLanguageCodeChange} value={noticeFormStore.languageCode}>
            <FormControlLabel control={<Radio />} value={'KO'} label="한국어" />
            <FormControlLabel control={<Radio />} value={'EN'} label="영어" />
          </RadioGroup>
        </Box>
      </BasicItemBox>

      <BasicItemBox>
        <ItemHead16 text="구분" />
        <Box sx={{ flex: 1 }}>
          <RadioGroup row onChange={handleTypeChange} value={noticeFormStore.type}>
            <FormControlLabel control={<Radio />} value={'NORMAL'} label="일반" />
            <FormControlLabel control={<Radio />} value={'IMPORTANT'} label="중요공지" />
          </RadioGroup>
        </Box>
      </BasicItemBox>

      <BasicItemBox maxWidth="880px">
        <ItemHead16 text="제목" />
        <Box sx={{ flex: 1 }}>
          <TextField sx={{ width: '100%' }} value={noticeFormStore.subject} onChange={(e) => noticeFormStore.setSubject(e.target.value)} />
        </Box>
      </BasicItemBox>

      <Box sx={{ flex: 1 }}>
        {/* <Box sx={{ border: '1px solid rgb(192,192,192)', maxWidth: '980px', height: '680px' }} p={2}> */}
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          localization={{
            locale: 'ko'
          }}
          editorState={noticeFormStore.editorState || ''}
          onEditorStateChange={handleEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              // uploadCallback: async (file: any) => {
              //   return await FileRequestHandler.uploadEditorImage(file, 'notice');
              //   // return res;
              // },
              previewImage: true,
              alt: { present: true, mandatory: false }
              // inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg'
            }
          }}
        />
      </Box>
    </CMBoxStretch>
  );
});

export default BasicInfoContent;
