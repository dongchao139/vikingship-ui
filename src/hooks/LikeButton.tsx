import React, { useState, useEffect } from 'react';

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);

  // 不需要清除的副作用
  useEffect(() => {
    document.title = `You Clicked ${like} times`;
  }, [like]); // 只有当like改变时才执行effect

  return (
    <>
      <button onClick={() => setLike(like + 1)}>{like} 赞</button>
      <button onClick={() => setOn(!on)}>{on ? 'ON' : 'OFF'} 赞</button>
    </>
  )
}

export default LikeButton;