import { useState } from 'react';

import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]); // data : 일기 리스트

  const onCreate = (author, content, emotion, date) => {
    setData([
      ...data,
      {
        id: data.length,
        author: author,
        content: content,
        emotion: emotion,
        created_date: date,
      },
    ]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}번째 일기를 삭제합니다.`);
    let newDataList = data.filter((elem) => elem.id !== targetId);
    setData(newDataList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((elem) =>
        elem.id === targetId ? { ...elem, content: newContent } : elem
      )
    );
  };

  return (
    <div className='App'>
      <h2>일기장</h2>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
