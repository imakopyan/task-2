import React, { Component } from 'react';
import s from './App.module.scss';
import FileUploader from './components/FileUploader/FileUploader';

class App extends Component {
  render() {
    return (
      <div className={s.appWrapper}>
      <div className={s.app}>
      <div className={s.uploadWrapper}>
       <span className={s.title}>
       Подтверждение аккаунта
       </span> 
       <span className={s.description}>
       Для подтверждения вашего аккаунта вам нужно заполнить все поля, подтвердить почтовый ящик и телефон, а также загрузить сканы ваших документов.
       </span>
       <FileUploader text={{before: "Загрузить скан страницы с фотографией", after: "Страница с фотографией"}} id='1'/>
       <FileUploader text={{before: "Загрузить скан страницы с пропиской", after: "Страница с пропиской"}} id='2'/>
       </div>
      </div>
       </div>
    );
  }
}

export default App;
