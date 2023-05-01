const DiaryItem = ({
  onRemove,
  author,
  content,
  emotion,
  created_date,
  id,
}) => {
  return (
    <div className='DiaryItem'>
      <div calssName='info'>
        <span>
          작성자 : {author} | 감정 점수: {emotion}
        </span>
        <br />
        <span className='date'>{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className='content'>{content}</div>
      <button onClick={() => onRemove(id)}>삭제하기</button>
    </div>
  );
};

export default DiaryItem;
