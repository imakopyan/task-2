import React, { Component } from 'react';
import cn from 'classnames';
import s from './FileUploader.module.scss';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.maxSize = 5000000;// 50 МБ
    this.state = {
      declined: false,
      isLoading: false,
      isChecked: false,
      fileName: null,
      fileSize: null,
      fileType: null,
      approved: false,
    };
  }

  onUpload = (e) => {
    const file = e.target.files[0];
    this.setState({
      fileName: file.name,
      fileSize: file.size,
      file,
      fileType: file.type,
      isLoading: true,
      isChecked: false,
      approved: false,
      declined: false,
    });
    setTimeout(() => this.verify(), 2000);

  }

  waitAnswer = () => {
   const randomResult = Math.round(Math.random());
    setTimeout(() => {
      this.setState({
        isChecked: false,
        approved: Boolean(!randomResult),
        declined: Boolean(randomResult),
      });
    }, 2000);
  }

  verify = () => {
    this.setState ({
      isLoading: false,
    });
    if (this.state.file && this.state.fileType.includes('image') && this.state.fileSize < this.maxSize) {
        this.setState({
          isLoading: false,
          isChecked: true,
        }, () => this.waitAnswer());
    } else {
      this.setState({
        declined: true,
        file: null,
        isLoading: false,
      });
    }
  }

  handleClass = () => {
    let classname = '';
    if (this.state.isLoading) {
      classname = s.isLoading;
    } else if (this.state.isChecked) {
      classname = s.isChecked;
    } else if (this.state.approved) { classname = s.approved; }

    return cn(s.uploadIcon, classname);
  }


  render() {
    return (
      <div className={s.uploadWrapper}>
        <label htmlFor={this.props.id} className={s.upload}>
          <div className={this.handleClass()} />
          <div className={s.uploadTextWrapper}>
            <div className={s.uploadText}>
              {this.state.isChecked ? "Файл загружен" : (this.state.approved ? this.props.text.after : this.props.text.before)}
            </div>
            <div className={s.uploadTextDescription}>
              {this.state.approved || this.state.isChecked ? `${this.state.fileName} (${Math.round(this.state.fileSize / 1024)} Кб)`
                : 'Размер файла не более 5 мб'}
            </div>
          </div>
          <input id={this.props.id} type="file" className={s.uploadHidden} onChange={this.onUpload} />
        </label>
        <div className={cn(s.message, this.state.declined && s.messageDeclined, this.state.approved && s.messageApproved)}>
        {this.state.declined && 'Отклонено'}
        {this.state.isChecked && 'Идет проверка'}
        {this.state.approved && 'Проверено'}

        </div>
      </div>
    );
  }
}

export default FileUploader;
