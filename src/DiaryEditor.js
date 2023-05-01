import { useState } from 'react';

const DiaryEditor = () => {
  const [state, setState] = useState({ author: '', content: '', emotion: 1 });

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    console.log(state);
    alert('저장 완료!');
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        <input name='author' value={state.author} onChange={handleState} />
      </div>
      <div>
        <textarea name='content' value={state.content} onChange={handleState} />
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
};

export default DiaryEditor;
