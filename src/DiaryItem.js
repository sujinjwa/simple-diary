import React, { useRef, useState, useContext } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ author, content, emotion, created_date, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localData, setLocalData] = useState(content);

  const diaryContent = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const quitEdit = () => {
    setLocalData(content);

    toggleIsEdit();
  };

  const handleEdit = () => {
    if (localData.length < 5) {
      diaryContent.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localData);
      toggleIsEdit();
    }
  };

  return (
    <div className='DiaryItem'>
      <div className='info'>
        <span>
          작성자 : {author} | 감정 점수: {emotion}
        </span>
        <br />
        <span className='date'>{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className='content'>
        {isEdit ? (
          <>
            <textarea
              ref={diaryContent}
              value={localData}
              onChange={(e) => setLocalData(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      <div>
        {isEdit ? (
          <>
            <button onClick={quitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        ) : (
          <>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
