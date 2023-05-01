import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  { author: '조수진', content: '하이~', emotion: 2 },
  { author: '조수진', content: '하이2~', emotion: 2 },
  { author: '조수진', content: '하이3~', emotion: 2 },
];

function App() {
  return (
    <div className='App'>
      <h2>일기장</h2>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
