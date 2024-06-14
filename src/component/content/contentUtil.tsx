const contentUtil = {
  handleSearch: (listDataStore: any) => {
    listDataStore.setPage(1);
    listDataStore.fetchListData();
  }
  // handleArtistListData: (optionDataStore: any, setArtistList: any) => {
  //   if (optionDataStore.getOptionData('artistList').length > 0) {
  //     setArtistList(optionDataStore.getOptionData('artistList'));
  //   } else if (localStorage.getItem('artistList')) {
  //     const strData: any = localStorage.getItem('artistList');
  //     setArtistList(JSON.parse(strData));
  //   }
  // }
};

export default contentUtil;
