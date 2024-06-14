import { styled } from '@mui/material';

const ModalBackground: any = styled('div')((props: any) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: props.zIndex ? props.zIndex : 200,
  display: 'flex',
  justifyContent: 'center',
  background: 'rgba(122,122,122,0.5)',
  alignItems: 'center'
}));

export { ModalBackground };
