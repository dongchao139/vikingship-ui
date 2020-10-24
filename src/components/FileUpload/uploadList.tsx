import React from "react";
import {UploadFile} from "./upload";
import Icon from '../icon/icon';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}
export const UploadList: React.FC<UploadListProps> = (
  {
    fileList, onRemove
  }) => {

  return (
    <ul className="viking-upload-list">
      {fileList.map(item => {
        return <li className="viking-upload-list-item"
        key={item.uid}>
          <span className={`file-name file-name-${item.status}`}>
            <Icon icon="file-alt" theme="secondary" />
            {item.name}
          </span>
          <span className="file-status">
            {item.status === "uploading" &&
              <Icon icon="spinner" spin theme="primary"/>}
            {item.status === "success" &&
            <Icon icon="check-circle" theme="success"/>}
            {item.status === "error" &&
            <Icon icon="times-circle" theme="danger"/>}
          </span>
          <span className="file-actions">
            <Icon icon="times" onClick={() => onRemove(item)}/>
          </span>
        </li>
      })}
    </ul>
  )
}