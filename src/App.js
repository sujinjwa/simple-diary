import { useState, useEffect, useRef, useMemo } from 'react';

import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';

function App() {
  const [data, setData] = useState([]); // data : 일기 리스트

  const dataId = useRef(0);

  // 프로미스를 반환하는 비동기 함수
  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((elem) => {
      return {
        id: dataId.current++,
        author: elem.email,
        content: elem.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 1 ~ 5 중 랜덤 생성
        created_date: new Date().getTime(),
      };
    });

    setData(initData);
  };

  useEffect(() => {
    // app 컴포넌트가 mount되는 시점에 실행
    getData();
  }, []);

  const onCreate = (author, content, emotion, date) => {
    dataId.current += 1;
    setData([
      ...data,
      {
        id: dataId.current,
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

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((elem) => elem.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRate = (goodCount / data.length) * 100;

    return [goodCount, badCount, goodRate];
  }, [data.length]);

  const [goodCount, badCount, goodRate] = getDiaryAnalysis;

  return (
    <div className='App'>
      <OptimizeTest />
      <h2>일기장</h2>
      <DiaryEditor onCreate={onCreate} />
      <div>
        <p>좋은 감정 일기 개수 : {goodCount}개</p>
        <p>나쁜 감정 일기 개수 : {badCount}개</p>
        <p>좋은 감정 일기 비율 : {goodRate}%</p>
      </div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
