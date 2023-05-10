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
  // const [data, setData] = useState([]); // data : 일기 리스트
  const [data, dispatch] = useReducer(reducer, []);

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

    dispatch({ type: 'INIT', data: initData });
    // setData(initData);
  };

  useEffect(() => {
    // app 컴포넌트가 mount되는 시점에 실행
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    // const newItem = {
    //   id: dataId.current,
    //   author: author, // author 로만 표기 가능
    //   content: content, // content 로만 표기 가능
    //   emotion: emotion, // emotion 으로만 표기 가능
    //   created_date: date,
    // };

    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;

    //setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    console.log(`${targetId}번째 일기를 삭제합니다.`);

    dispatch({ type: 'REMOVE', targetId });
    // setData((data) => data.filter((elem) => elem.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
    // setData((data) =>
    //   data.map((elem) =>
    //     elem.id === targetId ? { ...elem, content: newContent } : elem
    //   )
    // );
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
