import React, {useState} from 'react';
import classNames from 'classnames';

interface DraggerProps {
    onFile?:(files: FileList) => void;
}

export const Dragger: React.FC<DraggerProps> = 
({
    onFile, children
}) => {
    const [dragOver, setDragOver] = useState(false);
    const clazz = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    });
    const handleDrag = (e: React.DragEvent<HTMLDivElement>, over: boolean) => {
        e.preventDefault();
        setDragOver(over);
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    }
    return (
        <div className = {clazz}
        onDragOver={e => handleDrag(e, true)}
        onDragLeave={e => handleDrag(e, false)}
        onDrop={e => handleDrop(e)}
        >
            {children}
        </div>
    )
}