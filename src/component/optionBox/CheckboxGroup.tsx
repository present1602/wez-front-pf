import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
// import { getOptionConstants } from '../../store/SearchOptionStore';
import { OptionItemHead } from './OptionItemHead';

interface Props {
  name?: string;
  optionList?: any;
  // CheckboxGroupContent;
  checkedList?: number[];
  excludeHasAll?: boolean;
  listKey?: string;
  optionKey?: string;
  onClickAll?: any;
  store?: any;
  searchOptionStore?: any;
  onClick?: any;
  // checkedOptionKeyList?: Array<String>;
}

export const CheckboxGroupContentWithCheckedList = observer((props: any) => {
  return (
    <Box sx={{ maxWidth: '1000px' }} px={1}>
      <FormGroup row={true}>
        {props.optionList.map((option: any) => (
          <FormControlLabel
            key={option.value}
            control={<Checkbox size="small" value={option.value} checked={props.checkedList?.includes(option.value.toString()) ? true : false} />}
            label={option.text}
            onClick={(e) => props.onClick(e.target)}
          />
        ))}
      </FormGroup>
    </Box>
  );
});

export const CheckboxGroupContent = observer((props: any) => {
  const { searchOptionStore, optionKey } = props;
  const [optionList, setOptionList] = React.useState(props.optionList);
  // const searchOptionStore = store.searchOptionStore;

  // const optionList = optionDataStore.getOptionData(optionKey)

  // const optionList = searchOptionStore.getOptionList(optionKey || '');
  // const optionList = this.props.opgetOptionConstants(optionKey || '');

  const checkedList = searchOptionStore.getCheckedList(optionKey);

  React.useEffect(() => {
    // if (optionKey === 'artistList') {
    //   const artistListFromRequest = getMissedData();
    //   setOptionList(artistListFromRequest);
    // }
  }, []);

  return (
    <Box sx={{ maxWidth: '1000px' }} px={1}>
      {/* <button onClick={() => searchOptionStore.checkAll(optionKey)}> ALL</button> */}

      <FormControlLabel
        key="all"
        control={<Checkbox size="small" value="all" />}
        label="전체"
        // onClick = { (option.zoneId) => this.props.onClick(option.zoneId) ) }
        onClick={(e) => searchOptionStore.checkAll(optionKey)}
        sx={{ float: 'left' }}
      />

      <FormGroup row={true}>
        {optionList.map((option: any) => {
          return (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  size="small"
                  value={option.value}
                  checked={checkedList.includes(option.value.toString()) ? true : false}
                  onClick={(e) => searchOptionStore.changeOptionValue(optionKey, e.target)}
                />
              }
              label={option.text}
              // onClick = { (option.zoneId) => this.props.onClick(option.zoneId) ) }
            />
          );
        })}
      </FormGroup>
    </Box>
  );
});

class CheckboxGroup extends React.Component<Props> {
  render() {
    return (
      <Box sx={{ display: 'flex' }} my={1}>
        <OptionItemHead text="아티스트" />
        <Box sx={{ maxWidth: '1000px' }} px={1}>
          <CheckboxGroupContent optionList={this.props.optionList} onClick={this.props.onClick} />
          {/* <FormGroup row={true}>
            {this.props.optionList.map((option: any) => (
              <FormControlLabel key={option.zoneId} control={<Checkbox size="small" />} label={option.name} />
            ))}
          </FormGroup> */}
        </Box>
      </Box>
    );
  }
}

export default CheckboxGroup;
