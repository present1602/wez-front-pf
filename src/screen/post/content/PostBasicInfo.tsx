import { Box, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router';
import { PostRequestHandler } from '../../../api/content';
import { CMBoxStretch } from '../../../component/common/Box';
import { ItemBoxLineSpacing } from '../../../component/common/ItemBox';
import { ItemHead18 } from '../../../component/common/ItemHead';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import util from '../../../helper/util';
import PreviewBox from '../../../component/common/PreviewBox';
import { data as optionData } from '../../../store/OptionDataStore';
import { SmallButton } from '../../../component/common/Button';
import { UpdatePostStateParam } from '../../../types/post';
import FlexEndMainButton from '../../../component/common/FlexEndMainButton';
import ReactPlayer from 'react-player';
import CreateReplyModal from '../module/CreareReplyModal';
import ImageWindow from '../../../component/content/ImageWindow';
import { MEDIA_BASE_URL } from '../../../constants/config';

interface IPostBasicInfoProps {}

const PostBasicInfo: React.FunctionComponent<IPostBasicInfoProps> = (props) => {
  const { postId } = useParams();
  const [post, setPost] = React.useState<any>({});
  const [postState, setPostState] = React.useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);
  const [modalImgSrc, setModalImgSrc] = React.useState<string>('');

  const adminType = Cookies.get('type');
  const navigate = useNavigate();

  const onSuccess = (data: any) => {
    if (data.type === 'OFFICIAL') {
      const adminUser: any = window.localStorage.getItem('user');
      const userId = JSON.parse(adminUser).userId; // userId ???

      if (userId && userId === data.userId) {
        navigate('../update', { replace: true, state: data });
        // return;
      }
    }

    setPost(data);
    setPostState(data.isHide);
  };
  React.useEffect(() => {
    PostRequestHandler.getPost(postId || '', {
      onSuccess: onSuccess
    });
  }, []);

  const submitPostStateUpdate = () => {
    if (postId) {
      const param: UpdatePostStateParam = {
        postId: postId,
        isHide: postState
      };
      PostRequestHandler.updatePostState(param, { onSuccess: () => alert('수정하였습니다.') });
    }
  };

  const handleMovePage = () => {
    if (post.type === 'OFFICIAL') {
      navigate(`/member/editor/${post.userId}/info`);
    } else {
      navigate(`/member/user/${post.userId}/info`);
    }
  };
  const openImageWindow = (imgsrc: string) => {
    setModalImgSrc(imgsrc);
  };

  return (
    <>
      {modalImgSrc && <ImageWindow imgsrc={modalImgSrc} setModalImgSrc={setModalImgSrc} />}
      {isReplyModalOpen && <CreateReplyModal setIsReplyModalOpen={setIsReplyModalOpen} postId={postId} zoneId={post.zoneId} />}
      <CMBoxStretch direction="column">
        {adminType === 'OFFICIAL' && <FlexEndMainButton text="댓글작성" backgroundColor="green" onClick={() => setIsReplyModalOpen(true)} />}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <ItemBoxLineSpacing>
              <ItemHead18 text="분류" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getTypeText(post.type)}</Typography>
              </Box>
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="닉네임" />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ float: 'left', paddingRight: 2 }}>{post.userNickName}</Typography>
                <Typography sx={{ color: '#0000FF', cursor: 'pointer' }} onClick={() => handleMovePage()}>
                  계정정보 보기
                </Typography>
              </Box>
            </ItemBoxLineSpacing>
            {post.video && post.video.url && (
              <ItemBoxLineSpacing>
                <ItemHead18 text="영상" />
                <Box sx={{ flex: 1 }}>
                  <ReactPlayer url={`${MEDIA_BASE_URL}/${post.video.url}`} width="300px" height="300px" controls />
                </Box>
              </ItemBoxLineSpacing>
            )}
            {post.imageList && post.imageList.length > 0 && (
              <ItemBoxLineSpacing>
                <ItemHead18 text="이미지" />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {post.imageList
                      .sort((a: any, b: any) => a.ord - b.ord)
                      .map((img: any) => {
                        return (
                          <Box key={v4()}>
                            <PreviewBox imgsrc={util.getImageProxyPath(img.url)} onClick={() => openImageWindow(`${MEDIA_BASE_URL}/${img.url}`)} />
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </ItemBoxLineSpacing>
            )}
            <ItemBoxLineSpacing>
              <ItemHead18 text="내용" />
              <Box sx={{ flex: 1 }}>
                <Box pr={2}>
                  <TextField
                    sx={{ width: '100%', border: 0 }}
                    multiline={true}
                    minRows={4}
                    InputProps={{
                      readOnly: true
                      // , classes:{notchedOutline:classes.noBorder}
                    }}
                    value={post.content}
                  />
                </Box>
              </Box>
            </ItemBoxLineSpacing>
          </Box>

          <Box sx={{ flex: 1 }}>
            <ItemBoxLineSpacing>
              <ItemHead18 text="작성일자" />
              <Box sx={{ flex: 1 }}>
                <Typography>{util.getDate(post.created)}</Typography>
              </Box>
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="상태" />

              {adminType === 'MASTER' ? (
                <Box sx={{ flex: 1 }}>
                  <Select value={postState} size="small" onChange={(e: any) => setPostState(e.target.value)}>
                    {optionData.POST_STATE.map((item: any) => {
                      return (
                        <MenuItem value={item.value} key={v4()}>
                          {item.text}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Box sx={{ display: 'inline' }} px={1} />
                  <SmallButton text="적용" onClick={() => submitPostStateUpdate()} backgroundColor={'neutral.moderate'} />
                </Box>
              ) : (
                <Box sx={{ flex: 1 }}>
                  <Typography>{util.getDisplayStateReverseText(post.isHide)}</Typography>
                </Box>
              )}
            </ItemBoxLineSpacing>
            <ItemBoxLineSpacing>
              <ItemHead18 text="조회수" />
              <Box sx={{ flex: 1 }}>
                <Typography>{post.viewsCount}</Typography>
              </Box>
            </ItemBoxLineSpacing>
          </Box>
        </Box>
      </CMBoxStretch>
    </>
  );
};

export default PostBasicInfo;
