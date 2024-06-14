import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { makeAutoObservable } from 'mobx';
import { NoticeRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';
import htmlToDraft from 'html-to-draftjs';

class NoticeFormStore {
  constructor() {
    makeAutoObservable(this);
  }
  languageCode = 'KO';
  subject = '';
  content: any = '';
  created: any = null;
  isHide: any = false;
  type: string = 'NORMAL';
  editorState: any = EditorState.createEmpty();

  status = 1;

  setSubject(val: any) {
    this.subject = val;
  }

  setLanguageCode(val: any) {
    this.languageCode = val;
  }

  setType(val: string) {
    this.type = val;
  }

  setContent(val: any) {
    this.content = val;
  }

  setStatus(val: any) {
    this.status = val;
  }
  setIsHide(val: any) {
    this.isHide = val;
  }

  setCreated(val: any) {
    this.created = val;
  }

  onEditorStateChange(editorState: any) {
    this.editorState = editorState;
  }

  setHtml = (html: any) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const firstTag = htmlDoc.body.firstElementChild;
    // 첫번째 html 은 무조건 p 태그여야 한다 wyswyg draft 제약.
    if (firstTag && firstTag.tagName !== 'P') {
      html = '<p></p> ' + html;
    }

    const contentBlock: any = htmlToDraft(html);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.editorState = editorState;
    } else {
      this.editorState = EditorState.createEmpty();
    }
  };

  setMultipleItem(obj: any) {
    for (let key in obj) {
      switch (key) {
        case 'created':
          this.setCreated(obj[key]);
          break;
        case 'subject':
          this.setSubject(obj[key]);
          break;
        case 'isHide':
          this.setIsHide(obj[key]);
          break;
        case 'content':
          this.setHtml(obj[key]);
          // this.setContent(obj[key]);
          break;
        case 'code':
          this.setLanguageCode(obj[key]);
          break;
        case 'type':
          this.setType(obj[key]);
          break;
        default:
          break;
      }
    }
  }

  getHtml() {
    return draftToHtml(convertToRaw(this.editorState.getCurrentContent()));
  }
  async submitCreate() {
    let param: any = {
      subject: this.subject,
      content: this.getHtml(),
      type: this.type,
      languageCode: this.languageCode
    };

    // const blocks = convertToRaw(this.content.getCurrentContent()).blocks;
    // const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');

    // param.content = value;

    // const validationResult = validatePhotoCard(param);
    // if (!validationResult.result) {
    //   alert(validationResult.message);
    //   return;
    // }

    // const fileResult = await FileRequestHandler.upload(this.photoCardImageFile, 'photocard', { onSuccess: () => {} });

    // param.photoCardImage = {
    //   ord: 0,
    //   type: 'IMAGE',
    //   name: fileResult.name,
    //   url: fileResult.url
    // };

    NoticeRequestHandler.create(param, {
      onSuccess: () => {
        alert('공지사항을 등록하였습니다');
        AppHistory.push('/cs/notice');
      }
    });
  }

  async submitUpdate(noticeId: string) {
    let param: any = {
      noticeId: noticeId,
      subject: this.subject,
      type: this.type,
      content: this.getHtml(),
      languageCode: this.languageCode
    };
    NoticeRequestHandler.update(param, {
      onSuccess: () => {
        alert('공지사항을 수정하였습니다');
        AppHistory.push('/cs/notice');
      }
    });
  }

  // const validationResult = validatePhotoCard(param);
  // if (!validationResult.result) {
  //   alert(validationResult.message);
  //   return;
  // }

  //   if (this.photoCardImageFile) {
  //     const fileResult = await FileRequestHandler.upload(this.photoCardImageFile, 'photocard', { onSuccess: () => {} });
  //     param.photoCardImage = {
  //       ord: 0,
  //       type: 'IMAGE',
  //       name: fileResult.name,
  //       url: fileResult.url
  //     };
  //   }

  //   NoticeRequestHandler.update(param, {
  //     onSuccess: () => {
  //       alert('공지사항을 수정하였습니다');
  //       AppHistory.push('/customer/notice');
  //     }
  //   });

  init() {}
}

export default NoticeFormStore;
