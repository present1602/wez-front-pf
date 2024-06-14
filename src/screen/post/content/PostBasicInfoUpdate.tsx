import { Box, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { PostRequestHandler } from '../../../api/content';
import { CMBoxFlexEnd, CMBoxStretch } from '../../../component/common/Box';
import { ItemBoxLineSpacing } from '../../../component/common/ItemBox';
import { ItemHead18 } from '../../../component/common/ItemHead';
import { v4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import util from '../../../helper/util';
import PreviewBox from '../../../component/common/PreviewBox';
import { MEDIA_BASE_URL } from '../../../constants/config';
import { DangerButton, LightButton, SmallButton } from '../../../component/common/Button';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import ReactPlayer from 'react-player';
import CreateReplyModal from '../module/CreareReplyModal';
import PostUpdateFormStore from '../../../store/PostUpdateFormStore';
import ClearIcon from '@mui/icons-material/Clear';
import { execFileValidate } from '../../../helper/Validator';
import { observer } from 'mobx-react';
import MESSAGES from '../../../constants/message';

interface IPostBasicInfoUpdateProps {}

const postUpdateFormStore = new PostUpdateFormStore();

const PostBasicInfoUpdate: React.FunctionComponent<IPostBasicInfoUpdateProps> = observer((props) => {
  const { postId } = useParams();
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);

  const [imageUrlList, setImageUrlList] = React.useState<any>([]);
  const [videolUrl, setVideolUrl] = React.useState<any>(null);

  const VideoFileRef = React.useRef<any>();
  const ImageFileRef = React.useRef<any>();

  const location = useLocation();

  const onSuccess = (data: any) => {
    postUpdateFormStore.setMultipleItem(data);
  };
  React.useEffect(() => {
    if (location.state) {
      const post: any = location.state;
      postUpdateFormStore.init();
      postUpdateFormStore.setMultipleItem(post);
      // if (post.imageList && post.imageList.length > 0) {
      //   post.imageList.map((item: any) => {
      //     setImageUrlList([...imageUrlList, item.url]);
      //   });
      // }

      if (post.video && post.video.url) {
        setVideolUrl(`${MEDIA_BASE_URL}/${post.video.url}`);
      }

      // setPost(location.state);
    } else {
      PostRequestHandler.getPost(postId || '', { onSuccess: onSuccess });
    }
  }, []);

  const clearVideoData = () => {
    postUpdateFormStore.setVideoFile(null);
    postUpdateFormStore.setVideoData(null);
    setVideolUrl(null);
  };

  const addImageUrl = (url: any) => {
    setImageUrlList([...imageUrlList, url]);
  };

  const deleteVideo = () => {
    clearVideoData();
  };

  const handleImageFileChange = (fileBlob: any) => {
    const filename = fileBlob.name;
    const ext = filename.split('.')[filename.split('.').length - 1];
    const validationResult = execFileValidate('IMAGE', ext);
    if (validationResult && validationResult.result === 'fail') {
      alert(MESSAGES.imageFileValidationFail);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        if (postUpdateFormStore.videoFile || postUpdateFormStore.videoData) {
          clearVideoData();
        }
        addImageUrl(reader.result);
        postUpdateFormStore.addImageFile(fileBlob);
        resolve();
      };
    });
  };

  const clearImageData = () => {
    postUpdateFormStore.setImageFileList([]);
    postUpdateFormStore.setImageDataList([]);
    setImageUrlList([]);
  };

  const handleVideoFileChange = (fileBlob: any) => {
    const filename = fileBlob.name;
    const ext = filename.split('.')[filename.split('.').length - 1];

    const validationResult = execFileValidate('VIDEO', ext);

    if (validationResult && validationResult.result === 'fail') {
      alert(MESSAGES.videoFileValidationFail);
      return;
    }

    setVideolUrl(URL.createObjectURL(fileBlob));
    if (imageUrlList.length > 0 || postUpdateFormStore.imageDataList.length > 0) {
      clearImageData();
    }

    postUpdateFormStore.setVideoData(null);
    postUpdateFormStore.setVideoFile(fileBlob);
  };

  const subtractImage = (targetIdx: any) => {
    postUpdateFormStore.subtractImageFile(targetIdx);
    // var tg = imageUrlList.splice(idx, 1);
    setImageUrlList(imageUrlList.filter((el: any, idx: number) => idx !== targetIdx));
  };

  const subtractImageData = (mediaId: any) => {
    postUpdateFormStore.subtractImageData(mediaId);
    // var tg = imageUrlList.splice(idx, 1);
    // setImageUrlList(imageUrlList.filter((el: any, idx: number) => idx !== targetIdx));
  };

  const submitUpdate = () => {
    postUpdateFormStore.submit();
  };

  const submitDelete = () => {
    postId && postUpdateFormStore.submitDelete(postId);
  };

  return (
    <>
      {isReplyModalOpen && <CreateReplyModal setIsReplyModalOpen={setIsReplyModalOpen} postId={postId} zoneId={postUpdateFormStore.zoneId} />}
      <CMBoxStretch direction="column">
        <CMBoxFlexEnd>
          <Box px={1} py={2}>
            <LightButton text="수정" onClick={() => submitUpdate()} />
            <DangerButton text="삭제하기" onClick={() => submitDelete()} />
          </Box>
        </CMBoxFlexEnd>

        <FlexEndMainButton text="댓글작성" backgroundColor="green" onClick={() => setIsReplyModalOpen(true)} />

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <ItemBoxLineSpacing>
              <ItemHead18 text="분류" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getTypeText(postUpdateFormStore.type)}</Typography>
              </Box>
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="닉네임" />
              <Box sx={{ flex: 1 }}>
                <Typography>{postUpdateFormStore.nickName}</Typography>
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

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <>
                    {postUpdateFormStore.imageDataList.map((item: any, idx: number) => {
                      return (
                        <Box sx={{ position: 'relative' }} key={v4()}>
                          <PreviewBox imgsrc={util.getImageProxyPath(item.url)} key={v4()} />
                          <ClearIcon sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000, cursor: 'pointer' }} onClick={() => subtractImageData(item.mediaId)} />
                        </Box>
                      );
                    })}
                    {imageUrlList.map((url: any, idx: number) => {
                      return (
                        <Box sx={{ position: 'relative' }} key={v4()}>
                          <PreviewBox imgsrc={url} />
                          <ClearIcon sx={{ position: 'absolute', right: '10px', top: '10px', zIndex: 1000, cursor: 'pointer' }} onClick={() => subtractImage(idx)} />
                        </Box>
                      );
                    })}
                  </>
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
                  {videolUrl ? (
                    <Box>
                      <Box sx={{ position: 'relative' }}>
                        <ReactPlayer url={videolUrl} width="300px" height="300px" controls />
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
              <ItemHead18 text="내용" />
              <Box sx={{ flex: 1 }}>
                <Box pr={2}>
                  <TextField sx={{ width: '100%', border: 0 }} multiline={true} minRows={4} value={postUpdateFormStore.content} onChange={(e) => postUpdateFormStore.setContent(e.target.value)} />
                </Box>
              </Box>
            </ItemBoxLineSpacing>
          </Box>

          <Box sx={{ flex: 1 }}>
            <ItemBoxLineSpacing>
              <ItemHead18 text="작성일자" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDate(postUpdateFormStore.created)}</Typography>
              </Box>
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="상태" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDisplayStateText(postUpdateFormStore.state)}</Typography>
              </Box>
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="조회수" />
              <Box sx={{ flex: 1 }}>
                <Typography>{postUpdateFormStore.viewsCount}</Typography>
              </Box>
            </ItemBoxLineSpacing>
          </Box>
        </Box>
      </CMBoxStretch>
    </>
  );
});

export default PostBasicInfoUpdate;
