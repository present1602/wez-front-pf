import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Collapse, Typography } from '@mui/material';
import { CMBoxAlignCenter } from '../common/Box';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ForumIcon from '@mui/icons-material/Forum';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import LocalPlayIcon from '@mui/icons-material/LocalPlay';
import { useLocation, useNavigate } from 'react-router';
import { useStore } from '../../store/RootStore';
import { observer } from 'mobx-react';
import Cookies from 'js-cookie';

interface ISideBarProps {}

const SideBarHeader: React.FunctionComponent = () => {
  return (
    <CMBoxAlignCenter>
      <Box py={2}>
        <Typography variant="h3" px={8} fontWeight="bold">
          WEZ
        </Typography>
      </Box>
    </CMBoxAlignCenter>
  );
};

const SideBar: React.FunctionComponent<ISideBarProps> = observer((props) => {
  const adminType = Cookies.get('type');
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(true);
  const [contentMenuOpen, setContentMenuOpen] = React.useState(true);
  const [collectionMenuOpen, setCollectionMenuOpen] = React.useState(true);
  const [customerMenuOpen, setCustomerMenuOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    if (menu === 'post') {
      if (location.pathname === '/content/post') {
        window.location.reload();
      } else {
        navigate('/content/post', { state: { init: true } });
      }
    } else if (menu === 'user') {
      if (location.pathname === '/member/user') {
        window.location.reload();
      } else {
        navigate('/member/user', { state: { init: true } });
      }
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', zIndex: 180, maxWidth: 280, backgroundColor: 'primary.moderate' }}>
      {adminType && adminType === 'MASTER' && (
        <List sx={{}} component="nav" aria-labelledby="nested-list-subheader" subheader={<SideBarHeader />}>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="대시보드" />
          </ListItemButton>
          <ListItemButton onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="계정" />
            {accountMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={accountMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuClick('user')}> */}
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/member/user', { state: { init: true } })}>
                <ListItemText primary="회원" />
              </ListItemButton>
              {Cookies.get('type') === 'MASTER' && (
                <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/member/admin')}>
                  <ListItemText primary="관리자" />
                </ListItemButton>
              )}

              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/member/editor', { state: { init: true } })}>
                <ListItemText primary="오피셜" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => navigate('/zone')}>
            <ListItemIcon>
              <LocalPlayIcon />
            </ListItemIcon>
            <ListItemText primary="아티스트존" />
          </ListItemButton>

          <ListItemButton onClick={() => setContentMenuOpen(!contentMenuOpen)}>
            <ListItemIcon>
              <PermMediaIcon />
            </ListItemIcon>
            <ListItemText primary="콘텐츠 관리" />
            {contentMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={contentMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 6 }} onClick={() => handleMenuClick('post')}> */}
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/content/post', { state: { init: true } })}>
                <ListItemText primary="게시물" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/content/banner')}>
                <ListItemText primary="배너" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/content/tag')}>
                <ListItemText primary="인기태그" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/content/report/post', { state: { init: true } })}>
                <ListItemText primary="신고" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => navigate('/forbidden-word')}>
            <ListItemIcon>
              <GppMaybeIcon />
            </ListItemIcon>
            <ListItemText primary="금칙어 관리" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate('/chat')}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="채팅방 관리" />
          </ListItemButton>

          <ListItemButton onClick={() => setCollectionMenuOpen(!collectionMenuOpen)}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="컬렉션관리" />
            {collectionMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={collectionMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/collection/album', { state: { init: true } })}>
                <ListItemText primary="앨범" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/collection/photocard', { state: { init: true } })}>
                <ListItemText primary="포토카드" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/collection/mission')}>
                <ListItemText primary="미션" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => setCustomerMenuOpen(!customerMenuOpen)}>
            <ListItemIcon>
              <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="고객센터" />
            {customerMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={customerMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/cs/notice')}>
                <ListItemText primary="공지사항" />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/cs/terms')}>
                <ListItemText primary="약관" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => setCustomerMenuOpen(!customerMenuOpen)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="설정" />
            {/* {settingsMenuOpen ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>

          <Collapse in={customerMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/settings/app/version')}>
                <ListItemText primary="앱 버전 관리" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      )}

      {adminType && adminType === 'OFFICIAL' && (
        <List sx={{}} component="nav" aria-labelledby="nested-list-subheader" subheader={<SideBarHeader />}>
          <ListItemButton>
            <ListItemIcon>
              <PermMediaIcon />
            </ListItemIcon>
            <ListItemText primary="콘텐츠 관리" />
          </ListItemButton>

          <Collapse in={contentMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }} onClick={() => navigate('/content/post', { state: { init: true } })}>
                <ListItemText primary="게시물" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      )}
    </Box>
  );
});

export default SideBar;
