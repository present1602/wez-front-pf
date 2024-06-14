import { makeAutoObservable } from 'mobx';
import { AlbumRequestHandler, FileRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';
import { validateAlbum } from '../helper/Validator';

export const HOUR_OPTIONS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

export const MINUTE_OPTIONS = ['00', '10', '20', '30', '40', '50'];

export const KOMCA_INITIAL = {
  serialId: '',
  rangeStartNumber: 0,
  rangeEndNumber: 0
};
class AlbumFormStore {
  constructor() {
    makeAutoObservable(this);
  }
  zoneId = '';
  albumId = '';
  title = '';
  artistZone: any = {};
  releaseDate: any = new Date();
  created: any = null;
  albumCover: any = null;
  albumCoverFile: any = null;
  albumKeepCount = 0;

  albumSerialList: any = [KOMCA_INITIAL];

  albumVolume = 0;
  isActive = true;

  setAlbumId(val: any) {
    this.albumId = val;
  }

  setZoneId(val: any) {
    this.zoneId = val;
  }

  setTitle(val: any) {
    this.title = val;
  }

  setArtistZone(data: any) {
    this.artistZone = data;
  }
  setReleaseDate(val: any) {
    this.releaseDate = val;
  }
  setCreated(val: any) {
    this.created = val;
  }
  setAlbumSerialList(data: any) {
    this.albumSerialList = data;
  }

  updateAlbumVolume() {
    const KomcaList = this.albumSerialList;
    this.setAlbumSerialList(KomcaList);
    let volume = 0;

    KomcaList.map((serial: any) => {
      if (serial.rangeEndNumber > 0) {
        if (serial.rangeStartNumber < serial.rangeEndNumber) {
          volume += serial.rangeEndNumber - serial.rangeStartNumber;
        }
      }
    });
    this.setAlbumVolume(volume);
  }

  changeKomkaRangeInput(val: string, idx: number, startOrEnd: string) {
    // this.albumSerialList = data;
    if (startOrEnd === 'start') {
      let newData = this.albumSerialList;
      newData[idx].rangeStartNumber = val;
      this.setAlbumSerialList(newData);
    } else if (startOrEnd === 'end') {
      let newData = this.albumSerialList;
      newData[idx].rangeEndNumber = val;
      this.setAlbumSerialList(newData);
    }
  }

  addKOMCAInputGroup() {
    this.albumSerialList.push(KOMCA_INITIAL);
  }
  removeKOMCAInputGroup(idx: any) {
    this.albumSerialList.splice(idx, 1);
    this.updateAlbumVolume();
  }

  // setAlbumSerialRangeStartNumber(val: any) {
  //   this.albumSerial = { ...this.albumSerial, rangeStartNumber: val };
  // }
  // setAlbumSerialRangeEndNumber(val: any) {
  //   this.albumSerial = { ...this.albumSerial, rangeEndNumber: val };
  // }
  setAlbumKeepCount(val: any) {
    this.albumKeepCount = val;
  }
  setAlbumVolume(val: any) {
    this.albumVolume = val;
  }
  setIsActive(val: any) {
    this.isActive = val;
  }

  setAlbumCoverFile(file: any) {
    this.albumCoverFile = file;
  }
  setAlbumCover(data: any) {
    this.albumCover = data;
  }

  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        case 'albumId':
          this.setAlbumId(obj[key]);
          break;
        case 'title':
          this.setTitle(obj[key]);
          break;
        case 'isActive':
          this.setIsActive(obj[key]);
          break;
        case 'created':
          this.setCreated(obj[key]);
          break;
        case 'releaseDate':
          this.setReleaseDate(obj[key]);
          break;
        case 'serials':
          if (obj[key].length > 0) {
            const KomcaList = obj[key];
            this.setAlbumSerialList(KomcaList);
            let volume = 0;
            KomcaList.map((serial: any) => {
              volume += serial.rangeEndNumber - serial.rangeStartNumber;
            });
            this.setAlbumVolume(volume);
          } else {
            this.setAlbumSerialList([KOMCA_INITIAL]);
          }
          break;
        case 'collectionKeepCount':
          this.setAlbumKeepCount(obj[key]);
          break;
        case 'artistZone':
          this.setArtistZone(obj[key]);
          break;
        case 'coverImage':
          this.setAlbumCover(obj[key]);
          break;
        default:
          break;
      }
    }
  }

  async submit() {
    let param: any = {
      title: this.title,
      zoneId: this.zoneId,
      releaseDate: this.releaseDate,
      serials: this.albumSerialList,
      albumVolume: this.albumVolume
    };

    const validationResult = validateAlbum(param);

    if (!validationResult.result) {
      alert(validationResult.message);
      return;
    }
    if (!this.albumCoverFile) {
      alert('앨범 이미지를 등록해주세요');
      return;
    }

    // if (this.albumCoverFile) {
    const fileResult = await FileRequestHandler.upload(this.albumCoverFile, 'album', { onSuccess: () => {} });

    param.coverImage = {
      ord: 0,
      type: 'IMAGE',
      name: fileResult.name,
      url: fileResult.url
    };
    // }
    AlbumRequestHandler.create(param, {
      onSuccess: () => {
        alert('앨범을 등록하였습니다');
        this.init();
        AppHistory.push('/collection/album');
      }
    });
  }

  async submitUpdate() {
    let param: any = {
      albumId: this.albumId,
      title: this.title,
      releaseDate: this.releaseDate,
      serials: this.albumSerialList,
      coverImage: this.albumCover
    };

    validateAlbum(param);

    if (this.albumCoverFile) {
      const fileResult = await FileRequestHandler.upload(this.albumCoverFile, 'album', { onSuccess: () => {} });
      param.coverImage = {
        ord: 0,
        type: 'IMAGE',
        name: fileResult.name,
        url: fileResult.url
      };
    }

    AlbumRequestHandler.update(param, {
      onSuccess: () => {
        alert('앨범을 수정하였습니다');
        this.init();
        AppHistory.push('/collection/album');
      }
    });
  }

  submitDelete(albumId: string) {
    AlbumRequestHandler.delete(albumId, {
      onSuccess: () => {
        alert('앨범을 삭제하였습니다');
        this.init();
        AppHistory.push('/collection/album');
      }
    });
  }

  init() {
    this.zoneId = '';
    this.albumId = '';
    this.title = '';
    this.artistZone = {};
    this.releaseDate = new Date();
    this.created = null;
    this.albumCover = null;
    this.albumCoverFile = null;
    this.albumKeepCount = 0;
    this.albumSerialList = [KOMCA_INITIAL];
    this.albumVolume = 0;
    this.isActive = true;
  }
}

export default AlbumFormStore;
