import React, { useEffect, useState } from 'react';

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // mount될 때만 실행
  useEffect(() => {
    console.log('Mount!');
  }, []);

  // update될 때만 실행
  useEffect(() => {
    console.log('Update!');
  });

  // count값이 udpate될 때만 실행
  useEffect(() => {
    console.log(`count is updated to: ${count}`);
    if (count > 5) {
      alert('count가 5를 초과했습니다. 0으로 초기화합니다.');
      setCount(0);
    }
  }, [count]);

  // text값이 update될 때만 실행
  useEffect(() => {
    console.log(`text is updated to : ${text}`);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
