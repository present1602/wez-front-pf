const AppHistory: any = {
  navigate: null,
  push: (page: any, ...rest: any) => AppHistory.navigate(page, ...rest)
};

export default AppHistory;
