import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Upload, UploadProps, UploadFile } from './upload';
import { Button, ButtonType } from '../Button/button';

export default {
    title: 'New/Upload',
    component: Upload,
} as Meta;

const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 20 },
    { uid: '456', size: 1234, name: 'xyz.md', status: 'success', percent: 40 },
    { uid: '789', size: 1234, name: 'eyiha.md', status: 'error', percent: 55 }
]
const handleSuccess = (data) => {
    console.log('success: ' + JSON.stringify(data));
}
const handleError = (err) => {
    console.error(err);
}
const handleProgress = (percentage) => {
    console.log("percentage: " + percentage);
}
export const Default = (args) => (
    <Upload action="http://127.0.0.1:4200/users/upload"
        data={{ key: 'value' }} headers={{ 'token': 'abc123a' }}
        accept="*.xlsx" multiple={true}
        onSuccess={handleSuccess} onError={handleError}
        onProgress={handleProgress} defaultFileList={defaultFileList}
        {...args}
    >
        <Button btnType={ButtonType.Primary}>
            Upload File
     </Button>
    </Upload>
)