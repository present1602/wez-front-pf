import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DashboardScreen from '../screen/dashboard/DashboardScreen';
import UserScreen from '../screen/account/user/UserScreen';
import NotFound from '../screen/etc/NotFound';
import { Box } from '@mui/material';
import TopBar from '../component/topBar/TopBar';
import SideBar from '../component/sideBar/Sidebar';
import PrivateRoute from './PrivateRoute';
import MasterRoute from './MasterRoute';
import TypoList from '../screen/dashboard/TypoList';
import ZoneScreen from '../screen/zone/ZoneScreen';
import CreateZoneScreen from '../screen/zone/CreateZoneScreen';
import ZoneInfoScreen from '../screen/zone/ZoneInfoScreen';
import AdminScreen from '../screen/account/admin/AdminScreen';
import AddAdminScreen from '../screen/account/admin/AddAdminScreen';
import AdminInfoScreen from '../screen/account/admin/AdminInfoScreen';
import EditorScreen from '../screen/account/editor/EditorScreen';
import AddEditorScreen from '../screen/account/editor/AddEditorScreen';
import EditorInfoScreen from '../screen/account/editor/EditorInfoScreen';
import UserInfoScreen from '../screen/account/user/UserInfoScreen';
import { ZoneRequestHandler } from '../api/content';
import { useStore } from '../../src/store/RootStore';
import PostScreen from '../screen/post/PostScreen';
import CreatePostScreen from '../screen/post/CreatePostScreen';
import PostInfoScreen from '../screen/post/PostInfoScreen';
import ReportScreen from '../screen/report/ReportScreen';
import AlbumScreen from '../screen/album/AlbumScreen';
import CreateAlbumScreen from '../screen/album/CreateAlbumScreen';
import AlbumInfoScreen from '../screen/album/AlbumInfoScreen';
import PhotoCardScreen from '../screen/photocard/PhoroCardScreen';
import CreatePhotoCardScreen from '../screen/photocard/CreatePhotoCardScreen';
import PhotoCardInfoScreen from '../screen/photocard/PhoroCardInfoScreen';
import NoticeScreen from '../screen/customer/notice/NoticeScreen';
import CreateNoticeScreen from '../screen/customer/notice/CreateNoticeScreen';
import BannerScreen from '../screen/banner/BannerScreen';
import ArtistBannerScreen from '../screen/banner/ArtistBannerScreen';
import BannerPairScreen from '../screen/banner/BannerPairScreen';
import ArtistBannerEditOrderScreen from '../screen/banner/ArtistBannerEditOrderScreen';
import EditorMyPageScreen from '../screen/mypage/editor/EditorMyPageScreen';
import TagScreen from '../screen/tag/TagScreen';
import NoticeInfoScreen from '../screen/customer/notice/NoticeInfoScreen';
import TermsScreen from '../screen/customer/terms/TermsScreen';
import TermsInfoScreen from '../screen/customer/terms/TermsInfoScreen';
import AppVersionScreen from '../screen/settings/version/AppVersionScreen';
import MissionScreen from '../screen/mission/MissionScreen';
import ChatScreen from '../screen/chat/ChatScreen';
import OpenChatInfoScreen from '../screen/chat/OpenChatInfoScreen';
import MissionInfoScreen from '../screen/mission/MissionInfoScreen';
import Cookies from 'js-cookie';
import ForbiddenWordScreen from '../screen/forbiddenWord/ForbiddenWordScreen';

interface IAppRouterProps {}

// const ContentRouter: React.FunctionComponent<IAppRouterProps> = (props) => {
//   let element = useRoutes([
//     { path: '/dashboard', element: <DashboardScreen /> },
//     {
//       path: '/member',
//       element: <MemberBase />,
//       children: [
//         {
//           path: '',
//           element: <MasterRoute component={<MemberScreen />} />
//         },
//         {
//           path: 'admin/*',
//           // children: [{ path: '', element: <MasterRoute component={<MemberAdminRouter />} /> }]
//           element: <MasterRoute component={<MemberAdminRouter />} />
//         }
//       ]
//     },
//     { path: '/', element: <Navigate to="dashboard" /> },
//     {
//       path: '*',
//       element: <NotFound />
//     }
//   ]);
//   return element;
// };

const AppRouter: React.FunctionComponent<IAppRouterProps> = (props) => {
  const { optionDataStore, authStore } = useStore();

  React.useEffect(() => {
    authStore.isAuthenticated &&
      ZoneRequestHandler.fetchArtistList({
        onSuccess: (data: any) => {
          optionDataStore.setArtistList(data);
        }
      });
  }, []);

  return (
    <Box height="100%">
      <TopBar />
      <Box sx={{ display: 'flex', flexDirection: 'row' }} minHeight="100%">
        <SideBar />
        <Box pt="60px" px={5} sx={{ width: '100%' }}>
          {/* <ContentRouter /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/content/post" />} />
            <Route path="dashboard" element={<MasterRoute component={<DashboardScreen />} />} />
            <Route path="typo" element={<TypoList />} />
            <Route path="member">
              <Route path="user">
                <Route index element={<MasterRoute component={<UserScreen />} />} />
                <Route path=":userId/*" element={<PrivateRoute component={<UserInfoScreen />} />} />
              </Route>

              <Route path="admin">
                <Route path="" element={<MasterRoute component={<AdminScreen />} />} />
                <Route path="add" element={<MasterRoute component={<AddAdminScreen />} />} />
                <Route path=":adminId/*" element={<MasterRoute component={<AdminInfoScreen />} />} />
              </Route>
              <Route path="editor">
                <Route path="" element={<MasterRoute component={<EditorScreen />} />} />
                <Route path="add" element={<MasterRoute component={<AddEditorScreen />} />} />
                <Route path=":userId/*" element={<MasterRoute component={<EditorInfoScreen />} />} />
              </Route>
            </Route>

            <Route path="zone">
              <Route path="" element={<MasterRoute component={<ZoneScreen />} />} />
              <Route path="create" element={<MasterRoute component={<CreateZoneScreen />} />} />
              <Route path=":zoneId/*" element={<MasterRoute component={<ZoneInfoScreen />} />} />
            </Route>

            <Route path="content">
              <Route path="post">
                <Route path="" element={<PrivateRoute component={<PostScreen />} />} />
                <Route path="create" element={<PrivateRoute component={<CreatePostScreen />} />} />
                <Route path=":postId/*" element={<PrivateRoute component={<PostInfoScreen />} />} />
              </Route>
              <Route path="banner">
                <Route path="" element={<MasterRoute component={<BannerScreen />} />} />
                <Route path="artist/:zoneId" element={<MasterRoute component={<ArtistBannerScreen />} />} />
                <Route path="artist/:zoneId/edit-order" element={<MasterRoute component={<ArtistBannerEditOrderScreen />} />} />
                <Route path="create" element={<MasterRoute component={<BannerPairScreen mode="CREATE" />} />} />
                <Route path=":bannerGroupId" element={<MasterRoute component={<BannerPairScreen mode="UPDATE" />} />} />
              </Route>

              <Route path="tag" element={<MasterRoute component={<TagScreen />} />} />
              <Route path="report/:type" element={<MasterRoute component={<ReportScreen />} />} />
            </Route>

            <Route path="forbidden-word" element={<MasterRoute component={<ForbiddenWordScreen />} />} />

            <Route path="chat">
              <Route path="" element={<MasterRoute component={<ChatScreen />} />} />
              {/* <Route path="create" element={<MasterRoute component={<CreateScreen />} />} /> */}
              <Route path=":chatRoomId/*" element={<MasterRoute component={<OpenChatInfoScreen />} />} />
            </Route>

            <Route path="collection">
              <Route path="album">
                <Route path="" element={<MasterRoute component={<AlbumScreen />} />} />
                <Route path="create" element={<MasterRoute component={<CreateAlbumScreen />} />} />
                <Route path=":albumId" element={<MasterRoute component={<AlbumInfoScreen />} />} />
              </Route>
              <Route path="photocard">
                <Route path="" element={<MasterRoute component={<PhotoCardScreen />} />} />
                <Route path="create" element={<MasterRoute component={<CreatePhotoCardScreen />} />} />
                <Route path=":photoCardId" element={<MasterRoute component={<PhotoCardInfoScreen />} />} />
              </Route>
              <Route path="mission">
                <Route path="" element={<MasterRoute component={<MissionScreen />} />} />
                <Route path=":missionId" element={<MasterRoute component={<MissionInfoScreen />} />} />
              </Route>
            </Route>
            <Route path="cs">
              <Route path="notice">
                <Route path="" element={<MasterRoute component={<NoticeScreen />} />} />
                <Route path="create" element={<MasterRoute component={<CreateNoticeScreen />} />} />
                <Route path=":noticeId/*" element={<MasterRoute component={<NoticeInfoScreen />} />} />
              </Route>
              <Route path="terms">
                <Route path="" element={<MasterRoute component={<TermsScreen />} />} />
                <Route path="create" element={<MasterRoute component={<TermsInfoScreen mode="CREATE" />} />} />
                <Route path=":termsId" element={<MasterRoute component={<TermsInfoScreen mode="UPDATE" />} />} />
              </Route>
            </Route>

            <Route path="settings">
              <Route path="app/version" element={<MasterRoute component={<AppVersionScreen />} />} />
            </Route>

            <Route path="editor">
              <Route path="mypage/*" element={<PrivateRoute component={<EditorMyPageScreen />} />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default AppRouter;
