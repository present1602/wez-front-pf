import { Box, FormControl, FormControlLabel, Radio, RadioGroup, styled, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { CMBoxFlexEnd, CMBoxAlignCenter, CMBoxAlignCenterStretch, CMFlexBoxWithFlexProp } from '../../../component/common/Box';
import { DangerButton, SmallButton } from '../../../component/common/Button';
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import util from '../../../helper/util';
import { BannerRequestHandler } from '../../../api/content';

interface IBannerInfoProps {
  bannerFormStore: any;
  setListModalControl?: any;
  isArtistCheckAll?: any;
  artistCheckedList?: any;
  pageMode?: any;
}

const BannerPreviewBox: any = styled('div')((props: any) => ({
  width: '100%',
  paddingTop: '40%',
  backgroundColor: 'rgb(222,222,222)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: props.imgsrc && `url(${props.imgsrc})`
}));

const BannerInfo: React.FunctionComponent<IBannerInfoProps> = observer(({ bannerFormStore, setListModalControl, artistCheckedList, pageMode }) => {
  const [bannerImageUrl, setBannerImageUrl] = React.useState<any>('');
  const [bannerImageData, setBannerImageData] = React.useState(bannerFormStore.bannerImageData);
  const postRadioRef: any = React.useRef(null);

  const handleDateChange = (date: any, key: string) => {
    if (key === 'start') {
      bannerFormStore.setActionStartTs(date);
    } else if (key === 'end') {
      bannerFormStore.setActionEndTs(date);
    }
  };

  const encodeFileToBase64 = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        setBannerImageUrl(reader.result);
        resolve();
      };
    });
  };

  const handleActionRadioChange = (val: string) => {
    const lang = bannerFormStore.languageCode;

    if (val === 'post' && artistCheckedList.length > 1) {
      alert('아티스트를 복수(2개 이상)로 선택한 경우 랜딩페이지를 포스트를 선택할 수 없습니다.');
      return;
    }

    bannerFormStore.setActionContentPath('');
    bannerFormStore.setActionContent({ type: '' });
    bannerFormStore.setActionPath('');
    bannerFormStore.setActionRadioValue(val);

    if (val === 'post') {
      setListModalControl({ contentKey: 'post', languageCode: lang });

      bannerFormStore.setActionType('MV');
      bannerFormStore.setActionContent({ type: 'PD', text: '' });
    } else if (val === 'notice') {
      setListModalControl({ contentKey: 'notice', languageCode: lang });

      bannerFormStore.setActionType('MV');
      bannerFormStore.setActionContent({ type: 'ND', text: '' });
    } else if (val === 'outlink') {
      bannerFormStore.setActionType('OL');
      return;
    } else if (val === 'none') {
      bannerFormStore.setActionType('NM');
      return;
    }
  };

  const handleOpenPostModal = () => {
    if (bannerFormStore.actionType !== 'MV' || bannerFormStore.actionContent.type !== 'PD') {
      handleActionRadioChange('post');
      // postRadioRef && postRadioRef.current.focus();
    } else {
      const lang = bannerFormStore.languageCode;
      setListModalControl({ contentKey: 'post', languageCode: lang });
    }
  };
  const handleOpenNoticeModal = () => {
    if (bannerFormStore.actionType !== 'MV' || bannerFormStore.actionContent.type !== 'ND') {
      handleActionRadioChange('notice');
      // postRadioRef && postRadioRef.current.focus();
    } else {
      const lang = bannerFormStore.languageCode;
      setListModalControl({ contentKey: 'notice', languageCode: lang });
    }
  };

  React.useEffect(() => {
    if (pageMode === 'CREATE') {
      setBannerImageUrl('');
      bannerFormStore.init();
    }
  }, []);

  React.useEffect(() => {
    if (bannerFormStore.bannerImageData && bannerFormStore.bannerImageData.url) {
      setBannerImageUrl(util.getImageProxyPath(bannerFormStore.bannerImageData.url, 300));
    }
  }, [bannerFormStore.bannerImageData, bannerImageData]);

  const onDislayKeepStateChange = (e: any) => {
    bannerFormStore.setDisplayKeepState(Number(e.target.value));
  };

  const submitDelete = () => {
    if (window.confirm('배너를 정말 삭제하시겠습니까?')) {
      bannerFormStore.submitDelete(setBannerImageUrl);
    }
  };

  return (
    <CMFlexBoxWithFlexProp flex={5} direction="column">
      <Box sx={{ flex: 4, maxWidth: '772px' }}>
        <Box p={1} sx={{ margin: 'auto 0' }}>
          <BannerPreviewBox imgsrc={bannerImageUrl} />
        </Box>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box p={1}>
          <input
            type="file"
            onChange={(e: any) => {
              encodeFileToBase64(e.target.files[0]);
              bannerFormStore.setBannerImageFile(e.target.files[0]);
            }}
          />
        </Box>
      </Box>
      <Box sx={{ flex: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} p={1}>
          <TextField
            variant="standard"
            label="배너의 내용을 간단하게 입력해주세요"
            key={`banner_title_${bannerFormStore.languageCode}`}
            value={bannerFormStore.title}
            inputProps={{
              maxLength: 100
            }}
            onChange={(e: any) => bannerFormStore.setTitle(e.target.value)}
          />
          <CMBoxFlexEnd>
            <Typography>{bannerFormStore.title.length}/100</Typography>
          </CMBoxFlexEnd>
        </Box>
      </Box>
      <Box sx={{ flex: 3 }}>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="outlink"
            name="radio-buttons-group"
            onChange={(e) => handleActionRadioChange(e.target.value)}
            value={bannerFormStore.actionRadioValue}
          >
            <Box sx={{ display: 'flex', width: '100%' }} p={1}>
              <Box sx={{ width: '170px' }}>
                <FormControlLabel value="outlink" control={<Radio />} label="외부링크" />
              </Box>
              {bannerFormStore.actionType === 'OL' && (
                <CMBoxAlignCenterStretch>
                  <TextField
                    variant="standard"
                    value={bannerFormStore.actionPath}
                    onChange={(e: any) => bannerFormStore.setActionPath(e.target.value)}
                    placeholder="링크를 입력해주세요"
                    fullWidth
                    sx={{ marginLeft: 3, marginRight: 3 }}
                  />
                </CMBoxAlignCenterStretch>
              )}
            </Box>

            <Box sx={{ display: 'flex', width: '100%' }} p={1}>
              <Box sx={{ display: 'flex', width: '170px' }}>
                <FormControlLabel value="notice" control={<Radio />} label="공지사항" />
                <Box sx={{ flex: 1 }} />
                <SmallButton text="찾기" disabled={bannerFormStore.actionType === 'MV' && bannerFormStore.actionContent.type === 'ND' ? false : true} onClick={() => handleOpenNoticeModal()} />
              </Box>
              {bannerFormStore.actionType === 'MV' && bannerFormStore.actionContent.type === 'ND' && (
                <CMBoxAlignCenterStretch>
                  <TextField variant="standard" placeholder="공지내용" value={bannerFormStore.actionContent.text} fullWidth sx={{ marginLeft: 3, marginRight: 3 }} />
                </CMBoxAlignCenterStretch>
              )}
            </Box>

            <Box sx={{ display: 'flex', width: '100%' }} p={1}>
              <Box sx={{ display: 'flex', width: '170px' }}>
                <FormControlLabel value="post" control={<Radio />} label="게시물" ref={postRadioRef} />
                <Box sx={{ flex: 1 }} />
                <SmallButton text="찾기" disabled={bannerFormStore.actionType === 'MV' && bannerFormStore.actionContent.type === 'PD' ? false : true} onClick={() => handleOpenPostModal()} />
              </Box>
              {bannerFormStore.actionType === 'MV' && bannerFormStore.actionContent.type === 'PD' && (
                <CMBoxAlignCenterStretch>
                  <TextField variant="standard" placeholder="내용" value={bannerFormStore.actionContent.text} fullWidth sx={{ marginLeft: 3, marginRight: 3 }} />
                </CMBoxAlignCenterStretch>
              )}
            </Box>

            <Box sx={{ display: 'flex', width: '100%' }} p={1}>
              <FormControlLabel value="none" control={<Radio />} label="없음" />
            </Box>
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box>
          <RadioGroup row onChange={onDislayKeepStateChange} value={bannerFormStore.displayKeepState}>
            <FormControlLabel value={1} control={<Radio />} label="계속 노출" />
            <FormControlLabel value={0} control={<Radio />} label="기간 설정" />
          </RadioGroup>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <Box sx={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', borderRadius: 5 }} px={2}>
            <DatePicker
              selected={bannerFormStore.actionStartTs}
              disabled={bannerFormStore.displayKeepState ? true : false}
              customInput={<TextField sx={{ width: 140, input: { color: bannerFormStore.displayKeepState ? 'rgb(192,192,192)' : 'black' } }} size="small" />}
              onChange={(date: any) => handleDateChange(date, 'start')}
            />
            <Typography px={1}> ~ </Typography>
            <DatePicker
              selected={bannerFormStore.actionEndTs}
              disabled={bannerFormStore.displayKeepState ? true : false}
              customInput={
                <TextField
                  sx={{ width: 140, input: { color: bannerFormStore.displayKeepState ? 'rgb(192,192,192)' : 'black' } }}
                  inputProps={{
                    readOnly: bannerFormStore.displayKeepState ? true : false
                  }}
                  size="small"
                />
              }
              onChange={(date: any) => handleDateChange(date, 'end')}
            />
          </Box>
        </Box>
        <Box py={1} />
      </Box>

      <Box sx={{ flex: 1 }}>
        <CMBoxAlignCenter px={2}>
          <Typography variant="h6" px={1}>
            {bannerFormStore.isActive ? '노출' : '숨김'}
          </Typography>
          {bannerFormStore.isActive ? (
            <SmallButton text="노출 중지하기" onClick={() => bannerFormStore.setIsActive(false)} />
          ) : (
            <SmallButton text="노출하기" onClick={() => bannerFormStore.setIsActive(true)} />
          )}
        </CMBoxAlignCenter>
      </Box>
      <Box sx={{ flex: 1 }}>
        <CMBoxFlexEnd>
          <DangerButton text="삭제" onClick={() => submitDelete()} />
        </CMBoxFlexEnd>
      </Box>
    </CMFlexBoxWithFlexProp>
  );
});

export default BannerInfo;
