import React, { useState, useEffect, useRef, useContext } from 'react';
import ThemeContext from '../contexts';

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);

  // 不需要清除的副作用
  useEffect(() => {
    document.title = `You Clicked ${like} times`;
  }, [like]); // 只有当like改变时才执行effect

  const likeRef = useRef(0); // 每一次渲染之间都保留相同的引用

  function handleAlertClick() {
    setTimeout(() => {
      alert('you clicked on ' + likeRef.current);
    }, 3000);
  }

  const domRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus();
    }
  });

  const theme = useContext(ThemeContext);

  return (
    <>
      <input type='text' ref={domRef} />
      <button style={{ color: theme.color, background: theme.background }} onClick={() => {
        setLike(like + 1); likeRef.current++;
      }}>{like} 赞</button>
      <button onClick={() => setOn(!on)}>{on ? 'ON' : 'OFF'} 赞</button>
      <button onClick={handleAlertClick}>Alert</button>
    </>
  )
}

export default LikeButton;