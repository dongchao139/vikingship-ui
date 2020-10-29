import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import axios from 'axios';
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'
import { Upload, UploadProps } from './upload';

// Icon组件是命名导出, 这里需要同样mock命名导出
jest.mock('../icon/icon', () => {
    return {
        Icon: ({ icon, onClick }) => {
            console.log("icon=" + icon);
            return <span onClick={onClick}>{icon}</span>
        }
    }
})

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: "fakeurl.com",
    defaultFileList: [],
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn(),
    drag: true
};

let wrapper: RenderResult, fileInput: HTMLInputElement,
    uploadArea: HTMLElement;

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('text upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.viking-file-input');
        uploadArea = wrapper.queryByText('Click to upload');
    });
    it('upload process should works fine', async () => {
        mockedAxios.post.mockImplementation(() => {
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve({'data': 'cool'})
                }, 10)
            })
        });
        expect(uploadArea).toBeInTheDocument();
        expect(fileInput).not.toBeVisible();
        
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        expect(wrapper.queryByText('spinner')).toBeInTheDocument();
        await wait(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument();
        });
        expect(wrapper.queryByText('check-circle')).toBeInTheDocument();
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', 
            expect.objectContaining({
                raw: testFile
            })
        );
        expect(testProps.onChange).toHaveBeenCalledWith(
            expect.objectContaining({
                raw: testFile
            })
        );
        expect(wrapper.queryByText('times')).toBeInTheDocument();

        fireEvent.click(wrapper.queryByText('times'));
        expect(wrapper.queryByText('test.png')).not.toBeInTheDocument();
        expect(testProps.onRemove).toBeCalledWith(
            expect.objectContaining({
                raw: testFile
            })
        )
    });
    it('drag', async () => {
        mockedAxios.post.mockImplementation(() => {
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    resolve({'data': 'cool'})
                },10)
            })
        });
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('is-dragover');

        fireEvent.dragLeave(uploadArea);
        expect(uploadArea).not.toHaveClass('is-dragover');

        const mockDropEvent = createEvent.drop(uploadArea);
        Object.defineProperty(mockDropEvent, "dataTransfer", {
            value: {
                files: [testFile]
            }
        })
        fireEvent(uploadArea, mockDropEvent);

        await wait(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
    })
})