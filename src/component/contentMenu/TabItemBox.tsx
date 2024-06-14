import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';

export interface ITabItemProps {
  onClick: any;
  menuName: string;
}

// const MyStyledButton = styled('button')((props) => ({
//   backgroundColor: props.myBackgroundColor,
// }));

const TabItemBoxCommon: any = styled('div')((props: any) => ({
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

class TabItemBoxActive extends React.Component<ITabItemProps> {
  public render() {
    return (
      <TabItemBoxCommon>
        <Typography>{this.props.menuName}</Typography>
      </TabItemBoxCommon>
    );
  }
}

class TabItemBox extends React.Component<ITabItemProps> {
  public render() {
    return (
      <TabItemBoxCommon>
        <Typography sx={{ color: 'neutral.moderate' }}>{this.props.menuName}</Typography>
      </TabItemBoxCommon>
    );
  }
}

export { TabItemBox, TabItemBoxActive };
