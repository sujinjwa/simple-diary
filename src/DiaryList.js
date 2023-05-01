const DiaryList = ({ diaryList }) => {
  return (
    <div>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((elem) => {
          return (
            <div key={elem.id}>
              <div>작성자: {elem.author}</div>
              <div>일기: {elem.content}</div>
              <div>감정: {elem.emotion}</div>
              <div>시간: {elem.created_date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
