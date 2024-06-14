import { Box, Divider, Typography, styled, Select, MenuItem, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ZoneRequestHandler } from '../../api/content';
import { CMBoxStretch, CMContentFlexBox, CMLineBox } from '../../component/common/Box';
import FlexEndMainButton from '../../component/common/FlexEndMainButton';
import { ItemBoxLineSpacing } from '../../component/common/ItemBox';
import { ItemHead18 } from '../../component/common/ItemHead';
import PageTitle from '../../component/contentHeader/PageTitle';
import PostFormStore, { HOUR_OPTIONS, MINUTE_OPTIONS } from '../../store/PostFormStore';
import { v4 } from 'uuid';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactPlayer from 'react-player';
import Calendar from 'react-calendar';
import { execFileValidate } from '../../helper/Validator';
import ClearIcon from '@mui/icons-material/Clear';
import MESSAGES from '../../constants/message';
import { SmallButton } from '../../component/common/Button';

interface ICreatePostScreenProps {}

const PreviewBox: any = styled('div')((props: any) => ({
  width: props.width ? props.width : '120px',
  height: props.height ? props.height : '120px',
  margin: '5px',
  backgroundColor: 'rgb(222,222,222)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: props.imgsrc && `url(${props.imgsrc})`
}));

const postFormStore = new PostFormStore('create');

const CreatePostScreen: React.FunctionComponent<ICreatePostScreenProps> = observer((props) => {
  const [artistOptionList, setArtistOptionList] = React.useState<any>([]);
  const [imageUrlList, setImageUrlList] = React.useState<any>([]);

  const [videoThumbnailUrl, setVideoThumbnailUrl] = React.useState<any>(null);

  const VideoFileRef = React.useRef<any>();
  const ImageFileRef = React.useRef<any>();

  const adminId = Cookies.get('admin_id');

  React.useEffect(() => {
    if (adminId) {
      postFormStore.setAdminId(adminId);
      ZoneRequestHandler.getArtistListSummaryByEditor(adminId, {
        onSuccess: (data: any) => {
          setArtistOptionList(data);
        }
      });
    }
  }, []);

  const addImageUrl = (url: any) => {
    setImageUrlList([...imageUrlList, url]);
  };

  const subtractImage = (targetIdx: any) => {
    postFormStore.subtractImageFile(targetIdx);
    setImageUrlList(imageUrlList.filter((el: any, idx: number) => idx !== targetIdx));
  };

  const clearVideoData = () => {
    postFormStore.setVideoFile(null);
    setVideoThumbnailUrl(null);
  };

  const clearImageData = () => {
    postFormStore.setImageFileList([]);
    setImageUrlList([]);
  };

  const handleImageFileChange = (fileBlob: any) => {
    const filename = fileBlob.name;
    const ext = filename.split('.')[filename.split('.').length - 1];

    const validationResult: any = execFileValidate('IMAGE', ext);

    if (validationResult.result === 'fail') {
      alert(MESSAGES.imageFileValidationFail);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        if (postFormStore.videoFile) {
          clearVideoData();
        }
        addImageUrl(reader.result);
        postFormStore.addImageFile(fileBlob);
        resolve();
      };
    });
  };

  // const handleVideoThumbnailFileChange = (fileBlob: any) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   return new Promise((resolve: any) => {
  //     reader.onload = () => {
  //       setVideoThumbnailUrl(reader.result);
  //       postFormStore.setVideoThumbnailFile(fileBlob);
  //       resolve();
  //     };
  //   });
  // };

  const handleVideoFileChange = (fileBlob: any) => {
    const filename = fileBlob.name;
    const ext = filename.split('.')[filename.split('.').length - 1];

    const validationResult = execFileValidate('VIDEO', ext);

    if (validationResult && validationResult.result === 'fail') {
      alert(MESSAGES.videoFileValidationFail);
      return;
    }

    setVideoThumbnailUrl(URL.createObjectURL(fileBlob));
    if (imageUrlList.length > 0) {
      clearImageData();
    }
    postFormStore.setVideoFile(fileBlob);
  };

  const handleDisplayTimeSetChange = (e: any) => {
    postFormStore.toggleDisplayTimeSet(e.target.value);
  };

  const handleArtistZoneChange = (e: any) => {
    postFormStore.setZoneId(e.target.value);
    const targetArtistData = artistOptionList.find((item: any) => item.zone_id === e.target.value);
    postFormStore.setNickName(targetArtistData.zone_official_name);
  };

  const submit = () => {
    postFormStore.submit();
  };

  const deleteVideo = () => {
    clearVideoData();
  };

  return (
    <CMContentFlexBox>
      <PageTitle title="게시물 등록" />
      <Divider />
      <FlexEndMainButton onClick={() => submit()} text="등록하기" />

      <CMBoxStretch direction="column">
        <CMLineBox my={2}>
          <ItemBoxLineSpacing>
            <ItemHead18 text="아티스트" />
            <Box sx={{ flex: 1 }}>
              <Select
                value={postFormStore.zoneId ? postFormStore.zoneId : 0}
                size="small"
                onChange={handleArtistZoneChange}
                sx={{ height: '30px' }}
                // label="선택"
              >
                {!postFormStore.zoneId && <MenuItem value={0}>선택</MenuItem>}
                {artistOptionList.map((option: any) => {
                  return (
                    <MenuItem value={option.zone_id} key={v4()}>
                      {option.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </ItemBoxLineSpacing>
        </CMLineBox>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            {/* 표시닉네임 이미지첨부 동영상첨부 텍스트 */}
            <ItemBoxLineSpacing>
              <ItemHead18 text="표시 닉네임" />
              <Box sx={{ flex: 1 }}>
                <Typography>{postFormStore.nickName}</Typography>
              </Box>
            </ItemBoxLineSpacing>

            <ItemBoxLineSpacing>
              <ItemHead18 text="이미지 첨부" />
              <Box sx={{ flex: 1 }}>
                <input
                  type="file"
                  hidden={true}
                  ref={ImageFileRef}
                  onChange={(e: any) => {
                    handleImageFileChange(e.target.files[0]);
                  }}
                />
                <Box py={1} />
                {/* artistZoneFormStore.setStillImageFile(e.target.files[0]); // encodeFileToBase64(e.target.files[0], 'still-image'); */}
                {/* 리스트이미지 컴포넌트 분리 */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {imageUrlList.map((url: any, idx: number) => {
                    return (
                      <Box sx={{ position: 'relative' }}>
                        <PreviewBox imgsrc={url} key={v4()} />
                        <ClearIcon sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000, cursor: 'pointer' }} onClick={() => subtractImage(idx)} />
                      </Box>
                    );
                  })}
                  <Box sx={{ backgroundColor: 'neutral.light', display: 'flex', alignItems: 'center', margin: '5px' }} width="120px" height="120px">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }} onClick={() => ImageFileRef.current.click()}>
                      <Typography variant="h2" sx={{ textAlign: 'center' }}>
                        +
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ItemBoxLineSpacing>

            <ItemBoxLineSpacing>
              <ItemHead18 text="동영상 첨부" />

              {/* {videoUrl && ( */}
              <Box sx={{ flex: 1 }}>
                <input
                  type="file"
                  hidden={true}
                  ref={VideoFileRef}
                  onChange={(e: any) => {
                    handleVideoFileChange(e.target.files[0]);
                  }}
                />
                <Box py={1} />
                <Box sx={{ flex: 1 }}>
                  {videoThumbnailUrl ? (
                    <Box>
                      <Box sx={{ position: 'relative' }}>
                        <ReactPlayer url={videoThumbnailUrl} width="300px" height="300px" controls />
                        <ClearIcon sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000, cursor: 'pointer' }} onClick={() => deleteVideo()} />
                      </Box>
                      <SmallButton
                        text="변경"
                        onClick={() => {
                          VideoFileRef.current.click();
                        }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ backgroundColor: 'neutral.light', display: 'flex', alignItems: 'center', margin: '5px' }} width="120px" height="120px">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }} onClick={() => VideoFileRef.current.click()}>
                        <Typography variant="h2" sx={{ textAlign: 'center' }}>
                          +
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              {/* )} */}
            </ItemBoxLineSpacing>

            <ItemBoxLineSpacing>
              <ItemHead18 text="텍스트" />
              <Box sx={{ flex: 1 }}>
                <TextField sx={{ width: '100%' }} multiline={true} minRows={3} onChange={(e: any) => postFormStore.setContent(e.target.value)}>
                  {postFormStore.content}
                </TextField>
              </Box>
            </ItemBoxLineSpacing>
          </Box>
          <Box sx={{ flex: 1 }}>
            <ItemBoxLineSpacing>
              <ItemHead18 text="발행시간" />
              <Box sx={{ flex: 1 }}>
                {/* <Typography>즉시</Typography>
                <Typography>예약</Typography> */}
                <RadioGroup row onChange={(e) => handleDisplayTimeSetChange(e)} value={postFormStore.displayTimeSet}>
                  <FormControlLabel value={'F'} control={<Radio />} label="즉시" />
                  <FormControlLabel value={'T'} control={<Radio />} label="예약" />
                </RadioGroup>
              </Box>
            </ItemBoxLineSpacing>

            {postFormStore.displayTimeSet === 'T' && (
              <Box pr={3} py={1} px={2}>
                <Box sx={{ display: 'flex', columnGap: 1 }}>
                  <Box>
                    <TextField size="small" value={moment(postFormStore.displayDateElement.yearMonthDay).format('YYYY-MM-DD')} sx={{ width: 140 }} />
                  </Box>
                  <Box>
                    <Select value={postFormStore.displayDateElement.hour} size="small" onChange={(e: any) => postFormStore.setDisplayDateElement('hour', e.target.value)}>
                      {HOUR_OPTIONS.map((option: string) => (
                        <MenuItem value={option} key={v4()}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <Select value={postFormStore.displayDateElement.minute} size="small" onChange={(e: any) => postFormStore.setDisplayDateElement('minute', e.target.value)}>
                      {MINUTE_OPTIONS.map((option: string) => (
                        <MenuItem value={option} key={v4()}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <ItemBoxLineSpacing>
                  <Calendar onChange={(val: any) => postFormStore.setDisplayDateElement('yearMonthDay', val)} value={postFormStore.displayDateElement.yearMonthDay} />
                </ItemBoxLineSpacing>
              </Box>
            )}
          </Box>
        </Box>
      </CMBoxStretch>
    </CMContentFlexBox>
  );
});

export default CreatePostScreen;
