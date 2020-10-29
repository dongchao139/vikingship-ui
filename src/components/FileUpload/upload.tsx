import React, {ChangeEvent, useRef, useState} from 'react';
import axios from 'axios';
import {map, filter, mergeLeft} from 'ramda';

import {Dragger} from './dragger';
import {UploadList} from "./uploadList";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**
   * 文件列表
   */
  defaultFileList?: UploadFile[];
  /**
   * the url file will be send to
   */
  action: string;
  /**
   * 上传文件之前验证或进行转换
   * @param file
   */
  beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
  /**
   * on progress life-cycle callback
   * @param percentage
   * @param file
   */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**
   * on success life-cycle callback
   * @param data
   * @param file
   */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**
   * on error life-cycle callback
   * @param err
   * @param file
   */
  onError?: (err: any, file: UploadFile) => void;
  /**
   * 成功和失败后的回调
   * @param file
   */
  onChange?: (file: UploadFile) => void;
  /**
   * 移除文件列表
   * @param file
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 额外的请求头
   */
  headers?: {[key: string]: any};
  /**
   * 文件名
   */
  name?: string;
  /**
   * 额外的参数
   */
  data?: {[key: string]: any};
  /**
   * 是否携带请求参数
   */
  withCredentials?: boolean;
  /**
   * 筛选可用的文件类型
   */
  accept?: string;
  /**
   * 允许上传多个文件
   */
  multiple?: boolean;
  /**
   * 是否拖动上传
   */
  drag?: boolean;
}

export const Upload: React.FC<UploadProps> = (
  {
    defaultFileList, action, beforeUpload, onProgress,
    onSuccess, onError, onChange, onRemove,
    headers,name,data,withCredentials,
    accept, multiple, drag = false, children
  }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return filter((item: UploadFile) => item.uid !== file.uid)(prevList)
    })
    if (onRemove) {
      onRemove(file)
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
      let _file: UploadFile = {
        uid: Date.now() + "-",
        status: 'uploading',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file
      }
      if (!beforeUpload) {
        post(_file);
      } else {
        const result = beforeUpload(_file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if(result !== false) {
          post(_file);
        }
      }
    })
  }
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return map((file: UploadFile) => {
        if (file.uid === updateFile.uid) {
          return mergeLeft(updateObj, updateFile);
        }
        return file;
      })(prevList);
    })
  }
  const post = (_file: UploadFile) => {
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData();
    formData.append(name || 'file', _file.raw);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage <= 100) {
          updateFileList(_file, {percent: percentage, status: "uploading"});
          if (onProgress) {
            onProgress(percentage, _file);
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, {status: "success", response: resp.data});
      if (onSuccess) {
        onSuccess(resp.data, _file);
      }
      if (onChange) {
        onChange(_file);
      }
    }).catch(err => {
      updateFileList(_file, {status: "error", response: err});
      if (onError) {
        onError(err, _file);
      }
      if (onChange) {
        onChange(_file);
      }
    })
  }
  return (
    <div className="viking-upload-component">
      <div onClick={handleClick}>
      {drag ? <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger> : children}
      </div>
      <input className="viking-file-input" style={{display: 'none'}}
       type="file" ref={inputRef} onChange={handleFileChange} 
       accept={accept} multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}
