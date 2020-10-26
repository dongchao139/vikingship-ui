import "@testing-library/jest-dom/extend-expect";
import React from 'react';
import axios from 'axios';
import { render, cleanup, RenderResult, fireEvent, wait } from '@testing-library/react';
import { Upload, UploadProps } from './upload';

jest.mock('../icon/icon', () => {
    return ({ icon, onClick }) => {
        return <span onClick={onClick}>{icon}</span>
    }
})

jest.mock('axios');

const testProps: UploadProps = {
    action: "fakeurl.com",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
};

let wrapper: RenderResult, fileInput: HTMLInputElement,
    uploadArea: HTMLElement;

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('text upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
        fileInput = wrapper.container.querySelector('.vking-file-input');
        uploadArea = wrapper.queryByText('Click to upload');
    })
    it('upload process should works fine', async () => {
        const { queryByText } = wrapper;
        expect(uploadArea).toBeInTheDocument();
        expect(fileInput).not.toBeVisible();

        fireEvent.change(fileInput, { target: { files: [testFile] } });
        (axios.post as any).mockInplementation(() =>
            Promise.resolve({ 'data': 'cool' })
        );

        expect(queryByText('spinner')).toBeInTheDocument();
        await wait(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        });
        expect(queryByText('check-circle')).toBeInTheDocument();
        expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
        expect(testProps.onChange).toHaveBeenCalledWith(testFile);

        expect(queryByText('times')).toBeInTheDocument();

        fireEvent.click(queryByText('times'));
        expect(queryByText('test.png')).not.toBeInTheDocument();
        expect(testProps.onRemove).toBeCalledWith(
            expect.objectContaining({
                raw: testFile
            })
        )
    });
    it('drag', async () => {
        fireEvent.dragOver(uploadArea);
        expect(uploadArea).toHaveClass('is-dragover');

        fireEvent.dragLeave(uploadArea);
        expect(uploadArea).not.toHaveClass('is-dragover');

        fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
        await wait(() => {
            expect(wrapper.queryByText('test.png')).toBeInTheDocument()
        })
    })
})