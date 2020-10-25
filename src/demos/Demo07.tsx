import React from 'react'
import {Upload, UploadFile} from "../components/FileUpload/upload";

const defaultFileList: UploadFile[] = [
  {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 20},
  {uid: '456', size: 1234, name: 'xyz.md', status: 'success', percent: 40},
  {uid: '789', size: 1234, name: 'eyiha.md', status: 'error', percent: 55}
]

function Demo07() {
  const handleSuccess = (data) => {
    console.log('success: ' + JSON.stringify(data));
  }
  const handleError = (err) => {
    console.error(err);
  }
  const handleProgress = (percentage) => {
    console.log("percentage: " + percentage);
  }
  return (
    <Upload action="http://127.0.0.1:4200/users/upload"
     data={{key: 'value'}} headers={{'token': 'abc123a'}}
     accept="*.xlsx" multiple={true}
     onSuccess={handleSuccess} onError={handleError}
     onProgress={handleProgress} defaultFileList={defaultFileList}
    />
  )
}

export default Demo07;
