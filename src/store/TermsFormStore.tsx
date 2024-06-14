import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { makeAutoObservable } from 'mobx';
import { TermsRequestHandler } from '../api/content';
import AppHistory from '../AppHistory';

class TermsFormStore {
  constructor() {
    makeAutoObservable(this);
  }
  languageCode = 'KO';
  subject = '';
  content: any = '';
  created: any = null;
  termsType: string = '';
  editorState: any = EditorState.createEmpty();

  setSubject(val: any) {
    this.subject = val;
  }

  setLanguageCode(val: any) {
    this.languageCode = val;
  }

  setContent(val: any) {
    this.content = val;
  }

  setTermsType(val: any) {
    this.termsType = val;
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
        case 'content':
          this.setHtml(obj[key]);
          break;
        case 'code':
          this.setLanguageCode(obj[key]);
          break;
        case 'type':
          this.setTermsType(obj[key]);
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
    if (!this.termsType) {
      alert('약관 타입을 선택해주세요');
      return;
    }
    let param: any = {
      subject: this.subject,
      content: this.getHtml(),
      languageCode: this.languageCode,
      termsType: this.termsType
    };

    TermsRequestHandler.create(param, {
      onSuccess: () => {
        alert('약관을 등록하였습니다');
        this.init();
        AppHistory.push('/cs/terms');
      }
    });
  }

  async submitUpdate(termsId: string) {
    let param: any = {
      termsId: termsId,
      subject: this.subject,
      content: this.getHtml(),
      languageCode: this.languageCode
    };

    TermsRequestHandler.update(param, {
      onSuccess: () => {
        alert('약관을 수정하였습니다');
        this.init();
        AppHistory.push('/cs/terms');
      }
    });
  }
  async submitDelete(termsId: string) {
    if (window.confirm('약관을 삭제하시겠습니까?')) {
      TermsRequestHandler.delete(termsId, {
        onSuccess: () => {
          alert('약관을 삭제하였습니다');
          this.init();
          AppHistory.push('/cs/terms');
        }
      });
    }
  }

  init() {
    this.languageCode = 'ko';
    this.subject = '';
    this.content = '';
    this.created = null;
    this.termsType = '';
    this.editorState = EditorState.createEmpty();
  }
}

export default TermsFormStore;
