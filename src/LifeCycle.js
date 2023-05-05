import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
  // UnmountTest 컴포넌트가 마운트될 때 실행
  useEffect(() => {
    console.log('Mount!');

    // unmount 시점일 때 실행
    return () => {
      console.log('Unmount!');
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
