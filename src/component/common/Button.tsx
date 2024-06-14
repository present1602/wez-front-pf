import { Button, Typography } from '@mui/material';
import * as React from 'react';

interface IButtonProps {
  text: string;
  onClick?: any;
  backgroundColor?: string;
  color?: string;
  px?: number;
  pl?: number;
  disabled?: any;
}

class TailTextButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Typography onClick={this.props.onClick} sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
        {this.props.text}
      </Typography>
    );
  }
}

class MainButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ marginRight: 3 }} onClick={this.props.onClick}>
        <Typography>{this.props.text}</Typography>
      </Button>
    );
  }
}

class BasicButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ px: 2, mx: 1 }} onClick={this.props.onClick}>
        <Typography>{this.props.text}</Typography>
      </Button>
    );
  }
}

class LightButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ backgroundColor: 'neutral.light', px: 2, mx: 1 }} onClick={this.props.onClick}>
        <Typography sx={{ color: 'neutral.main' }}>{this.props.text}</Typography>
      </Button>
    );
  }
}

class DangerButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ backgroundColor: '#ab0f24', px: 2, mx: 1 }} onClick={this.props.onClick}>
        <Typography sx={{ color: '#fff' }}>{this.props.text}</Typography>
      </Button>
    );
  }
}

class HighlightButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'highlight.main', px: 2, mx: 1 }} onClick={this.props.onClick}>
        <Typography sx={{ color: '#fff' }}>{this.props.text}</Typography>
      </Button>
    );
  }
}

class AccentButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" sx={{ px: 2, mx: 1, backgroundColor: this.props.backgroundColor }} onClick={this.props.onClick}>
        <Typography>{this.props.text}</Typography>
      </Button>
    );
  }
}

class SmallButton extends React.Component<IButtonProps> {
  render() {
    return (
      <Button variant="contained" disabled={this.props.disabled ? this.props.disabled : false} sx={{ px: 1, backgroundColor: this.props.backgroundColor }} onClick={this.props.onClick}>
        <Typography sx={{ color: this.props.color && this.props.color }}>{this.props.text}</Typography>
      </Button>
    );
  }
}

export { BasicButton, LightButton, MainButton, TailTextButton, DangerButton, AccentButton, SmallButton, HighlightButton };
