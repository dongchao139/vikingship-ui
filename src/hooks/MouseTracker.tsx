import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 });
    // 需要清除的副作用
    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY });
        }
        document.addEventListener('mousemove', updateMouse);
        return () => {
            document.removeEventListener('mousemove', updateMouse);
        }
    }, []);
    return (
        <p>
            X: {positions.x},Y: {positions.y}
        </p>
    )
}

export default MouseTracker;