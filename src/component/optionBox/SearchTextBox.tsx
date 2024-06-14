import { Box, TextField } from '@mui/material';
import * as React from 'react';

export interface ISearchTextBoxProps {
  placeholder: string;
  onChange: any;
  listDataStore: any;
  maxWidth?: string;
}

export default class SearchTextBox extends React.Component<ISearchTextBoxProps> {
  render() {
    return (
      <Box sx={{ display: 'flex', alighItem: 'center', flex: 1, maxWidth: this.props.maxWidth && this.props.maxWidth }} px={1}>
        <TextField
          size="small"
          placeholder={this.props.placeholder}
          onChange={(e: any) => this.props.listDataStore.searchOptionStore.changeOptionValue('keyword', e.target.value)}
          sx={{ borderRadius: 2, flex: 1 }}
        />
      </Box>
    );
  }
}
