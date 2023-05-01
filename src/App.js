import { useState } from 'react';

import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: '조수진',
//     content: '하이~',
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: '조수진',
//     content: '하이2~',
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '조수진',
//     content: '하이3~',
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]); // data : 일기 리스트

  const onCreate = (author, content, emotion, date) => {
    setData([
      ...data,
      {
        id: data.length + 1,
        author: author,
        content: content,
        emotion: emotion,
        created_date: date,
      },
    ]);
  };

  return (
    <div className='App'>
      <h2>일기장</h2>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
