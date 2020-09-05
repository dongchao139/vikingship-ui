import React, { useState, useEffect } from 'react';
import useMousePositions from './useMousePositions';

const MouseTracker: React.FC = () => {
  const positions = useMousePositions();
  return (
    <p>
      X: {positions.x},Y: {positions.y}
    </p>
  )
}

export default MouseTracker;