import { Box, Divider, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CMBoxFlexEnd, CMContentFlexBox, CMBoxStretch } from '../../../component/common/Box';
import { BasicButton, DangerButton, LightButton } from '../../../component/common/Button';
import { BasicItemBox } from '../../../component/common/ItemBox';
import { ItemHead16 } from '../../../component/common/ItemHead';
import PageTitleWithTail from '../../../component/contentHeader/PageTitleWithTail';
import TermsFormStore from '../../../store/TermsFormStore';
import { TermsRequestHandler } from '../../../api/content';
import util from '../../../helper/util';

interface ITermsInfoScreenProps {
  mode: string;
}

const termsFormStore = new TermsFormStore();

const TermsInfoScreen: React.FunctionComponent<ITermsInfoScreenProps> = observer(({ mode }) => {
  const { termsId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  const submitCreate = () => {
    termsFormStore.submitCreate();
  };
  const submitUpdate = () => {
    termsId && termsFormStore.submitUpdate(termsId);
  };
  const submitDelete = () => {
    termsId && termsFormStore.submitDelete(termsId);
  };

  const handleLanguageCodeChange = (e: any) => {
    termsFormStore.setLanguageCode(e.target.value);
  };
  const handleTermsTypeChange = (e: any) => {
    termsFormStore.setTermsType(e.target.value);
  };

  const handleEditorStateChange = (editorState: any) => {
    termsFormStore.onEditorStateChange(editorState);
  };

  React.useEffect(() => {
    if (mode === 'UPDATE') {
      termsId && TermsRequestHandler.getTerms(termsId, { onSuccess: (data: any) => termsFormStore.setMultipleItem(data) });
    } else if (mode === 'CREATE') {
      termsFormStore.init();
    }
  }, []);

  return (
    <CMContentFlexBox>
      <PageTitleWithTail
        title={mode === 'UPDATE' ? '약관 조회/수정' : '새 약관 등록'}
        tailText="목록으로 돌아가기"
        onClick={() => {
          navigate('/cs/terms');
        }}
      />
      <Divider />
      <CMBoxFlexEnd>
        {mode === 'UPDATE' ? (
          <Box p={2}>
            <DangerButton text="삭제하기" onClick={() => submitDelete()} />
            <LightButton text="수정하기" onClick={() => submitUpdate()} />
          </Box>
        ) : (
          <Box p={2}>
            <LightButton
              text="취소"
              onClick={() => {
                navigate('/cs/terms');
              }}
            />
            <BasicButton text="저장하기" onClick={submitCreate} />
          </Box>
        )}
      </CMBoxFlexEnd>

      <CMBoxStretch direction="column">
        <BasicItemBox>
          <ItemHead16 text="구분" />
          {mode === 'CREATE' && (
            <Box sx={{ flex: 1 }}>
              <Select value={termsFormStore.termsType || 0} onChange={handleTermsTypeChange} size="small" sx={{ width: '200px' }}>
                <MenuItem value={0}>선택</MenuItem>
                <MenuItem value={'PRIVACY'}>개인정보취급방침</MenuItem>
                <MenuItem value={'SERVICE'}>회원가입 및 이용약관</MenuItem>
              </Select>
            </Box>
          )}
          {mode === 'UPDATE' && (
            <Box sx={{ flex: 1 }}>
              <Typography>{util.getTermsTitleText(termsFormStore.termsType)}</Typography>
            </Box>
          )}
        </BasicItemBox>

        <BasicItemBox>
          <ItemHead16 text="언어" />
          <Box sx={{ flex: 1 }}>
            <RadioGroup row onChange={handleLanguageCodeChange} value={termsFormStore.languageCode}>
              <FormControlLabel control={<Radio />} value={'ko'} label="한국어" />
              <FormControlLabel control={<Radio />} value={'en'} label="영어" />
            </RadioGroup>
          </Box>
        </BasicItemBox>

        <BasicItemBox maxWidth="880px">
          <ItemHead16 text="제목" />
          <Box sx={{ flex: 1 }}>
            <TextField sx={{ width: '100%' }} value={termsFormStore.subject} onChange={(e) => termsFormStore.setSubject(e.target.value)} />
          </Box>
        </BasicItemBox>

        <Box sx={{ flex: 1 }}>
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            localization={{
              locale: 'ko'
            }}
            editorState={termsFormStore.editorState || ''}
            onEditorStateChange={handleEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true }
            }}
          />
        </Box>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default TermsInfoScreen;
