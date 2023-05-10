import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryEditor = React.memo(() => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({ author: '', content: '', emotion: 1 });

  const authorInput = useRef();
  const contentInput = useRef();

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      // alert('작성자의 이름을 1자 이상 입력하세요');
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      // alert('일기 내용을 5자 이상 입력하세요');
      return;
    }

    let date = new Date().getTime();
    onCreate(state.author, state.content, state.emotion, date);
    alert('저장 완료!');

    // input 값 리셋하기
    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name='author'
          value={state.author}
          onChange={handleState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name='content'
          value={state.content}
          onChange={handleState}
        />
      </div>
      <div>
        <select name='emotion' value={state.emotion} onChange={handleState}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleClick}>일기 저장하기</button>
      </div>
    </div>
  );
});

export default React.memo(DiaryEditor);
