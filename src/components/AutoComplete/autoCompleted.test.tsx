import React from 'react'
import { config } from 'react-transition-group';
import { render, cleanup, RenderResult, fireEvent, wait } from '@testing-library/react';
import { AutoCompleted, DataSourceType, AutoCompleteProps } from './autoCompleted';

config.disabled = true;
const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]
const testProps: AutoCompleteProps = {
    searchFunc: (query: string, item: DataSourceType) => item.value.includes(query),
    dataArr: testArray,
    onSelect: jest.fn(),
    placeholder: 'auto-completed'
}
const testProps2: AutoCompleteProps = {
    searchFunc: (query: string, item: DataSourceType) => item.value.includes(query),
    dataArr: testArray,
    onSelect: jest.fn(),
    placeholder: 'auto-completed',
    renderOption: (item: DataSourceType<{number: number}>) => <span>{item.value} - {item.number}</span>
}

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe('test AutoComplet component', () => {
    beforeEach(() => {
        wrapper = render(<AutoCompleted {...testProps} />);
        inputNode = wrapper.getByPlaceholderText('auto-completed') as HTMLInputElement;
    });
    it('test basic', async () => {
        ;
        fireEvent.change(inputNode, { target: { value: 'a' } });

        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });
        expect(wrapper.container.querySelectorAll('.suggestion-item').length)
            .toEqual(2);

        fireEvent.click(wrapper.getByText('ab'));
        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });

        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
        expect(inputNode.value).toBe('ab');
    });
    it('keyboard', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } });

        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });

        const firstResult = wrapper.queryByText('ab');
        const secondResult = wrapper.queryByText('abc');

        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(firstResult).toHaveClass('item-highlight');

        fireEvent.keyDown(inputNode, { keyCode: 40 });
        expect(secondResult).toHaveClass('item-highlight');

        fireEvent.keyDown(inputNode, { keyCode: 38 });
        expect(firstResult).toHaveClass('item-highlight');

        fireEvent.keyDown(inputNode, { keyCode: 13 });

        expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 });
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    });
    it('click outside hide dropdown', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } });

        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument();
        });

        fireEvent.click(document);
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
    });
    it('renderOption', async () => {
        cleanup();
        wrapper = render(<AutoCompleted {...testProps2} />);
        inputNode = wrapper.getByPlaceholderText('auto-completed') as HTMLInputElement;

        fireEvent.change(inputNode, { target: { value: 'a' } });

        await wait(()=>{
            expect(wrapper.queryByText('ab - 11')).toBeInTheDocument();
        })
        expect(wrapper.container.querySelectorAll('.suggestion-item').length)
        .toEqual(2);
    });
    it('async fetchSuggestions', () => {
        
    })
});