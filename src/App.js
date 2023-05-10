import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from 'react';

import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((elem) => elem.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((elem) =>
        elem === action.targetId
          ? { ...elem, content: action.newContent }
          : elem
      );
    }
    default:
      return state;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

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

    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    // app 컴포넌트가 mount되는 시점에 실행
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((elem) => elem.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRate = (goodCount / data.length) * 100;

    return [goodCount, badCount, goodRate];
  }, [data.length]);

  const [goodCount, badCount, goodRate] = getDiaryAnalysis;

  return (
    <div className='App'>
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
