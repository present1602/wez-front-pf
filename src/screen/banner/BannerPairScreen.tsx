import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 } from 'uuid';
import { BannerRequestHandler } from '../../api/content';
import { CMBoxAlignCenter, CMBoxFlexEnd, CMBoxStretch, CMContentFlexBox, CMFlexBoxWithFlexProp } from '../../component/common/Box';
import { HighlightButton, LightButton } from '../../component/common/Button';
import { HeadTextCenter } from '../../component/common/Typhography';
import PageTitle from '../../component/contentHeader/PageTitle';
import BannerFormStore from '../../store/BannerFormStore';
import { useStore } from '../../store/RootStore';
import NoticeModalScreen from './modalScreen/notice/NoticeModalScreen';
import PostModalScreen from './modalScreen/post/PostModalScreen';
import BannerInfo from './module/BannerInfo';

interface IBannserPairScreenProps {
  mode?: string;
}

const bannerKoFormStore = new BannerFormStore('ko');
const bannerEnFormStore = new BannerFormStore('en');

const BannserPairScreen: React.FunctionComponent<IBannserPairScreenProps> = observer((props) => {
  const { bannerGroupId } = useParams();
  const { optionDataStore } = useStore();
  const navigate = useNavigate();
  const [listModalControl, setListModalControl] = React.useState<any>({ contentKey: '', languageCode: '' });
  const [artistList, setArtistList] = React.useState<any>(optionDataStore.getOptionData('artistList'));

  const [enBannerUploading, setEnBannerUploading] = React.useState<any>({ result: '', isUploading: false });
  const [koBannerUploading, setKoBannerUploading] = React.useState<any>({ result: '', isUploading: false });

  const [initialCheck, setInitialCheck] = React.useState(false);
  const [isArtistCheckAll, setIsArtistCheckAll] = React.useState(false);

  const [artistCheckedList, setArtistCheckedList] = React.useState<number[]>([]);

  const modalScreenHandler = (listModalControl: any, setListModalControl: any) => {
    if (listModalControl.contentKey === 'post' && listModalControl.languageCode === 'ko') {
      return <PostModalScreen bannerFormStore={bannerKoFormStore} setListModalControl={setListModalControl} />;
    } else if (listModalControl.contentKey === 'post' && listModalControl.languageCode === 'en') {
      return <PostModalScreen bannerFormStore={bannerEnFormStore} setListModalControl={setListModalControl} />;
    } else if (listModalControl.contentKey === 'notice' && listModalControl.languageCode === 'ko') {
      return <NoticeModalScreen bannerFormStore={bannerKoFormStore} setListModalControl={setListModalControl} />;
    } else if (listModalControl.contentKey === 'notice' && listModalControl.languageCode === 'en') {
      return <NoticeModalScreen bannerFormStore={bannerEnFormStore} setListModalControl={setListModalControl} />;
    }
  };

  const submitCreate = () => {
    if (!isArtistCheckAll && artistCheckedList.length === 0) {
      alert('아티스트를 선택해주세요');
      return;
    }

    const generateBannerPairId = v4();
    if (!bannerKoFormStore.bannerImageData && !bannerKoFormStore.bannerImageFile && !bannerEnFormStore.bannerImageData && !bannerEnFormStore.bannerImageFile) {
      alert('배너 이미지를 선택해주세요');
      return;
    }

    if (bannerKoFormStore.bannerImageFile) {
      setKoBannerUploading({ result: '', isUploading: true });
      bannerKoFormStore.submitCreate(artistCheckedList, setKoBannerUploading, generateBannerPairId);
    }

    if (bannerEnFormStore.bannerImageFile) {
      setEnBannerUploading({ result: '', isUploading: true });
      bannerEnFormStore.submitCreate(artistCheckedList, setEnBannerUploading, generateBannerPairId);
    }
  };

  React.useEffect(() => {
    if (initialCheck) {
      if (!koBannerUploading.isUploading && !enBannerUploading.isUploading) {
        let koCheckingFail = false;
        let enCheckingFail = false;
        if (koBannerUploading.result) {
          if (koBannerUploading.result === 'success') {
            console.log('ko배너 생성/수정 성공');
          } else if (koBannerUploading.result === 'fail') {
            koCheckingFail = true;
            console.log('ko배너 생성/수정 실패');
          }
        }
        if (enBannerUploading.result) {
          if (koBannerUploading.result === 'success') {
            console.log('en배너 생성/수정 성공');
          } else if (koBannerUploading.result === 'fail') {
            enCheckingFail = true;
            console.log('en배너 생성/수정 실패');
          }
        }

        if (props.mode === 'CREATE') {
          setInitialCheck(false);

          setKoBannerUploading({ result: '', isUploading: false });
          setEnBannerUploading({ result: '', isUploading: false });

          if (!koCheckingFail && !enCheckingFail) {
            alert('배너를 생성했습니다.');
            setTimeout(() => {
              navigate('/content/banner');
            }, 400);
          }

          // };
        } else if (props.mode === 'UPDATE') {
          if (!koCheckingFail && !enCheckingFail) {
            alert('변경사항을 저장하였습니다.');
            setTimeout(() => {
              navigate('/content/banner');
            }, 400);
          }
        }
      }
    }
  }, [koBannerUploading, enBannerUploading]);

  React.useEffect(() => {
    setInitialCheck(true);
  }, []);

  const submitUpdate = () => {
    if (!isArtistCheckAll && artistCheckedList.length === 0) {
      alert('아티스트를 선택해주세요');
      return;
    }

    if (!bannerKoFormStore.bannerImageData) {
      // 기존에 ko 언어로 저장된 배너 없는 경우 (en 배너만 있었던 경우)
      if (bannerKoFormStore.bannerImageFile) {
        // 기존에 ko 언어로 저장된 배너 없는데 새로 추가하는 경우
        setKoBannerUploading({ result: '', isUploading: true });
        bannerKoFormStore.submitCreate(artistCheckedList, setKoBannerUploading, bannerGroupId);
      }
    } else {
      // 기존에 ko 언어로 저장된 배너 있는 경우
      setKoBannerUploading({ result: '', isUploading: true });
      bannerKoFormStore.submitUpdate(artistCheckedList, setKoBannerUploading);
    }

    if (!bannerEnFormStore.bannerImageData) {
      // 기존에 en 언어로 저장된 배너 없는 경우 (ko 배너만 있었던 경우)
      if (bannerEnFormStore.bannerImageFile) {
        // 기존에 en 언어로 저장된 배너 없었는데 추가하는 경우
        // bannerEnFormStore.submitCreate(artistCheckedList, bannerGroupId);

        setEnBannerUploading({ result: '', isUploading: true });
        bannerEnFormStore.submitCreate(artistCheckedList, setEnBannerUploading, bannerGroupId);
      }
    } else {
      // 기존에 en 언어로 저장된 배너 있는 경우
      setEnBannerUploading({ result: '', isUploading: true });
      bannerEnFormStore.submitUpdate(artistCheckedList, setEnBannerUploading);
    }
  };

  const handleArtistOptionClick = (item: any) => {
    const zoneId = item.value;

    if (artistCheckedList.includes(zoneId.toString())) {
      const updatedArtistCheckedList = artistCheckedList.filter((el: number) => {
        return el !== zoneId.toString();
      });
      setArtistCheckedList(updatedArtistCheckedList);
    } else {
      const bannerKoActionType = bannerKoFormStore.actionType;
      const bannerEnActionType = bannerEnFormStore.actionType;

      if (artistCheckedList.length > 0) {
        if (bannerKoActionType === 'MV' && bannerKoFormStore.actionContent.type === 'PD') {
          alert('랜딩페이지가 포스트로 선택된 경우 복수(2개 이상)의 아티스트를 선택할 수 없습니다');
          return;
        } else if (bannerEnActionType === 'MV' && bannerEnFormStore.actionContent.type === 'PD') {
          alert('랜딩페이지가 포스트로 선택된 경우 복수(2개 이상)의 아티스트를 선택할 수 없습니다');
          return;
        }
      }

      const updatedArtistCheckedList = [...artistCheckedList, zoneId.toString()];
      setArtistCheckedList(updatedArtistCheckedList);
    }
  };

  const cancleProcess = () => {
    bannerKoFormStore.init();
    bannerEnFormStore.init();
    navigate(-1);
    // navigate(`/content/banner/artist`, { replace: true });
  };

  React.useEffect(() => {
    if (optionDataStore.getOptionData('artistList').length === 0) {
      const strData: any = localStorage.getItem('artistList');
      setArtistList(JSON.parse(strData));
    }

    if (props.mode === 'UPDATE') {
      if (!bannerGroupId) {
        alert('배너그룹아이디를 찾을 수 없습니다.');
        return;
      }
      BannerRequestHandler.getBannerZoneList(bannerGroupId, {
        onSuccess: (data: any) => {
          setArtistCheckedList(data);
        }
      });

      BannerRequestHandler.getBanner(
        { bannerGroupId: bannerGroupId, languageCode: 'ko' },
        {
          onSuccess: (data: any) => {
            bannerKoFormStore.setMultipleItem(data);
          }
        }
      );

      BannerRequestHandler.getBanner(
        { bannerGroupId: bannerGroupId, languageCode: 'en' },
        {
          onSuccess: (data: any) => {
            bannerEnFormStore.setMultipleItem(data);
          }
        }
      );
    }
  }, []);

  const handleArtistCheckAll = () => {
    setArtistCheckedList([]);

    setIsArtistCheckAll(!isArtistCheckAll);
  };

  return (
    <>
      {listModalControl.contentKey && listModalControl.languageCode && modalScreenHandler(listModalControl, setListModalControl)}

      <CMContentFlexBox>
        <PageTitle title="배너 상세" />
        <Divider />
        <Box py={1} />
        <CMBoxFlexEnd>
          {props.mode === 'CREATE' && (
            <Box>
              <LightButton onClick={() => cancleProcess()} text="취소" />
              <HighlightButton onClick={() => submitCreate()} text="저장하기" />
            </Box>
          )}
          {props.mode === 'UPDATE' && (
            <Box>
              <LightButton onClick={() => cancleProcess()} text="취소" />
              <HighlightButton onClick={() => submitUpdate()} text="저장하기" />
            </Box>
          )}
        </CMBoxFlexEnd>

        <Box py={2} />
        <CMBoxAlignCenter>
          <Box>
            <Typography variant="h6">노출 아티스트존 선택</Typography>
          </Box>
          <Box px={2}>
            <FormControlLabel key="all" control={<Checkbox size="small" value="all" />} label="전체" onClick={() => handleArtistCheckAll()} sx={{ float: 'left' }} />

            <FormGroup row={true}>
              {artistList.map((option: any) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        value={option.value.toString()}
                        // checked={false}
                        checked={artistCheckedList.includes(option.value.toString()) ? true : false}
                      />
                    }
                    label={option.text}
                    onClick={() => handleArtistOptionClick(option)}
                  />
                );
              })}
            </FormGroup>
          </Box>
        </CMBoxAlignCenter>

        <CMBoxStretch direction="column" maxWidth="1400px">
          <CMBoxAlignCenter>
            <Box sx={{ flex: 2 }} maxWidth="168px" />
            <Box sx={{ flex: 5 }}>
              <HeadTextCenter text="한국어" />
            </Box>
            <Box sx={{ flex: 5 }}>
              <HeadTextCenter text="영어" />
            </Box>
          </CMBoxAlignCenter>

          <Box sx={{ display: 'flex', height: '100%', maxHeight: '1000px' }}>
            <CMFlexBoxWithFlexProp flex={2} minWidth="140px" maxWidth="168px" direction="column">
              <Box sx={{ flex: 4 }}>
                <HeadTextCenter text="배너 미리보기" />
              </Box>
              <Box sx={{ flex: 1 }}>
                {props.mode === 'CREATE' && <HeadTextCenter text="이미지 추가" />}
                {props.mode === 'UPDATE' && <HeadTextCenter text="이미지 변경" />}
              </Box>
              <Box sx={{ flex: 2 }}>
                <HeadTextCenter text="내용 입력" />
              </Box>
              <Box sx={{ flex: 3 }}>
                <HeadTextCenter text="랜딩페이지" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <HeadTextCenter text="노출기간" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <HeadTextCenter text="노출여부" />
              </Box>
              <Box sx={{ flex: 1 }} />
            </CMFlexBoxWithFlexProp>

            <BannerInfo bannerFormStore={bannerKoFormStore} setListModalControl={setListModalControl} isArtistCheckAll={isArtistCheckAll} pageMode={props.mode} artistCheckedList={artistCheckedList} />
            <Box px={2} />
            <BannerInfo bannerFormStore={bannerEnFormStore} setListModalControl={setListModalControl} isArtistCheckAll={isArtistCheckAll} pageMode={props.mode} artistCheckedList={artistCheckedList} />
          </Box>
        </CMBoxStretch>
      </CMContentFlexBox>
    </>
  );
});

export default BannserPairScreen;
