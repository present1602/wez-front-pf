import { Box, styled, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

interface TProps {
  active: boolean;
}
const TabItemBox: any = styled('div')((props: TProps) => ({
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  border: props.active === true ? '1px solid rgb(66,66,66)' : '1px solid rgb(188,188,188)',
  fontWeight: props.active === true ? 'bold' : 'normal',
  padding: 5,
  margin: 8,
  marginBottom: 0,
  cursor: 'pointer',
  borderBottom: '1px solid #fff'
}));

const TabMenu = (props: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeContentPath = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <Box sx={{ display: 'flex', borderBottom: 1 }}>
      {props.menuListData.map((el: any) => (
        <TabItemBox onClick={props.onClick ? props.onClick : () => navigate(`./${el.key}`)} key={el.key} active={activeContentPath === el.key ? 'true' : 'false'}>
          <Typography>{el.text}</Typography>
        </TabItemBox>
      ))}
    </Box>
  );
};

export const TabMenuWithPathVariable = (props: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeContentPath = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <Box sx={{ display: 'flex', borderBottom: 1 }}>
      {props.menuListData.map((el: any) => (
        <TabItemBox
          onClick={
            props.onClick
              ? props.onClick
              : () => {
                  navigate(`${props.path}/${el.key}`, { state: { init: true } });
                  props.setReportContentType(el.key);
                }
          }
          key={el.key}
          active={activeContentPath === el.key ? 'true' : 'false'}
        >
          <Typography>{el.text}</Typography>
        </TabItemBox>
      ))}
    </Box>
  );
};

export default TabMenu;

// export default class TabMenu extends React.Component<ITabMenuProps> {
//   public render() {
//     return (
//       <Box sx={{ display: 'flex', borderBottom: 1 }}>
//         {/* {menuData.map((el: any) => {
//           // return <Box key={el.key}>{el.text}</Box>;

//         })} */}
//         {this.props.menuDataList.map((el: any) => (
//           // <TabItem menu={el} key={el.key} />
//           <TabItemBox onClick={() => AppHistory.push(`/zone/${id}/${el.key}`)} menuName={el.text} />
//         ))}
//       </Box>
//     );
//   }
// }
