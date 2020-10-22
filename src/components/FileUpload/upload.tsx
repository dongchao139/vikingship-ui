import React, {ChangeEvent, useRef} from 'react';
import axios from 'axios';

import {Button, ButtonType} from '../Button/button';

export interface UploadProps {
  /**
   * the url file will be send to
   */
  action: string;
  /**
   * 上传文件之前验证或进行转换
   * @param file
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * on progress life-cycle callback
   * @param percentage
   * @param file
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * on success life-cycle callback
   * @param data
   * @param file
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * on error life-cycle callback
   * @param err
   * @param file
   */
  onError?: (err: any, file: File) => void;
  /**
   * 成功和失败后的回调
   * @param file
   */
  onChange?: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = (
  {
    action, beforeUpload, onProgress, onSuccess, onError, onChange
  }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if(inputRef.current) {
      inputRef.current.value = null;
    }
  }
  const uploadFiles = (fiels: FileList) => {
    let postFiles = Array.from(fiels);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if(result !== false) {
          post(file);
        }
      }
    })
  }
  const post = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage <= 100) {
          if (onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then(resp => {
      if (onSuccess) {
        onSuccess(resp.data, file);
      }
      if (onChange) {
        onChange(file);
      }
    }).catch(err => {
      if (onError) {
        onError(err, file);
      }
      if (onChange) {
        onChange(file);
      }
    })
  }
  return (
    <div className="viking-upload-component">
      <Button btnType={ButtonType.Primary}
       onClick={handleClick}>
        Upload File
      </Button>
      <input className="viking-file-input" style={{display: 'none'}}
       type="file" ref={inputRef} onChange={handleFileChange}
      />
    </div>
  )
}
