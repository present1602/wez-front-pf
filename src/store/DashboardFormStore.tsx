import { makeAutoObservable } from 'mobx';
import { DashboardRequestHandler } from '../api/content';

class DashboardFormStore {
  constructor() {
    makeAutoObservable(this);
  }

  activeCard = 'USER';

  optionType = 'PERIOD'; //  기간별 or 그룹별 'PERIOD' || 'GROUP'
  periodOption = 'DAY'; // day, weeky, month, year

  startDate: any = this.getDefaultStartDate();
  endDate: any = new Date();

  startYear = 2022;
  endYear = 2022;
  startMonth = 1;
  endMonth = new Date().getMonth() + 1;

  contentData: any = [];

  zoneId = 'ALL';

  setActiveCard(val: any) {
    this.activeCard = val;
    this.fetchContentData();
  }

  setStartDate(val: any) {
    this.startDate = val;
    this.fetchContentData();
  }
  setEndDate(val: any) {
    this.endDate = val;
    this.fetchContentData();
  }
  setStartMonth(val: any) {
    this.startMonth = val;
    this.fetchContentData();
  }
  setEndMonth(val: any) {
    this.endMonth = val;
    this.fetchContentData();
  }
  setStartYear(val: any) {
    this.startYear = val;
    this.fetchContentData();
  }
  setEndYear(val: any) {
    this.endYear = val;
    this.fetchContentData();
  }

  setOptionType(val: any) {
    // this.initZoneId();
    this.optionType = val;

    if (val === 'ARTIST') {
      this.initPeriodData();
      this.fetchContentData();
    } else if (val === 'PERIOD') {
      this.fetchContentData();
    }
  }
  setPeriodOption(val: any) {
    this.initPeriodData();
    this.periodOption = val;
    this.fetchContentData();
    // this.periodOption = val;
    // switch (val) {
    //   case 'MONTH':
    //     break;
    //   case 'YEAR':
    //     break;
    // }
  }
  setZoneId(val: any) {
    this.zoneId = val;
    this.fetchContentData();
  }
  setContentData(data: any) {
    this.contentData = data;
  }

  getDefaultStartDate() {
    const calcEndDate = new Date();
    calcEndDate.setMonth(calcEndDate.getMonth() - 1);
    return new Date(calcEndDate);
  }

  fetchContentData() {
    // if (this.startYear > this.endYear) {
    //   alert('시작년도가 종료년도보다 클 수 없습니다.');
    //   return;
    // } else if (this.startYear === this.endYear) {
    //   if (this.startMonth > this.endMonth) {
    //     alert('시작월이 종료월보다 클 수 없습니다.');
    //     return;
    //   }
    // }

    if (this.activeCard === 'USER') {
      if (this.optionType === 'PERIOD') {
        let param: any = { periodOption: this.periodOption, zoneId: this.zoneId };

        switch (this.periodOption) {
          case 'MONTH':
            param.startYear = this.startYear;
            param.startMonth = this.startMonth;
            param.endYear = this.endYear;
            param.endMonth = this.endMonth;
            break;
          case 'YEAR':
            param.startYear = this.startYear;
            param.endYear = this.endYear;
            break;
          default:
            param.startDate = this.startDate;
            param.endDate = this.endDate;
            break;
        }
        DashboardRequestHandler.getUserPeriodicData(param, {
          onSuccess: (data: any) => {
            this.setContentData(data);
          }
        });
      } else if (this.optionType === 'ARTIST') {
        DashboardRequestHandler.getArtistZoneUserData({
          onSuccess: (data: any) => {
            this.setContentData(data);
          }
        });
      }
    } else if (this.activeCard === 'POST') {
      if (this.optionType === 'PERIOD') {
        let param: any = { periodOption: this.periodOption, zoneId: this.zoneId };

        switch (this.periodOption) {
          case 'MONTH':
            param.startYear = this.startYear;
            param.startMonth = this.startMonth;
            param.endYear = this.endYear;
            param.endMonth = this.endMonth;
            break;
          case 'YEAR':
            param.startYear = this.startYear;
            param.endYear = this.endYear;
            break;
          default:
            param.startDate = this.startDate;
            param.endDate = this.endDate;
            break;
        }
        DashboardRequestHandler.getPostPeriodicData(param, {
          onSuccess: (data: any) => {
            this.setContentData(data);
          }
        });
      } else if (this.optionType === 'ARTIST') {
        DashboardRequestHandler.getArtistZonePostData({
          onSuccess: (data: any) => {
            this.setContentData(data);
          }
        });
      }
    }
  }

  initZoneId() {
    this.zoneId = 'ALL';
  }

  initPeriodData() {
    this.startYear = 2022;
    this.endYear = 2022;

    this.startMonth = 1;
    this.endMonth = new Date().getMonth() + 1;

    this.startDate = this.getDefaultStartDate();
    this.endDate = new Date();
  }

  initMonthYear() {
    this.startYear = 2022;
    this.endYear = 2022;

    this.startMonth = 1;
    this.endMonth = new Date().getMonth() + 1;
  }

  init() {
    this.activeCard = 'USER';
    this.optionType = 'PERIOD'; //  기간별 or 그룹별 'PERIOD' || 'GROUP'
    this.periodOption = 'DAY'; // day, weeky, month, year
    this.startDate = this.getDefaultStartDate();
    this.endDate = new Date();
    this.startYear = 2022;
    this.endYear = 2022;
    this.startMonth = 1;
    this.endMonth = new Date().getMonth() + 1;
    this.contentData = [];
    this.zoneId = 'ALL';
  }
}

export default DashboardFormStore;
