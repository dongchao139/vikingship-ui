import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {MultipleSelect, SelectProps} from './select';

// Icon组件是命名导出, 这里需要同样mock命名导出
jest.mock('../icon/icon', () => {
    return {
        Icon: ({ icon, onClick }) => {
            return <span onClick={onClick}>{icon}</span>
        }
    }
})
const defaultProps: SelectProps = {
    options: ['nihao','nihao2','nihao3','disabled','nihao5'],
    defaultSelectedOptions: ['nihao','nihao2'],
    onChange: jest.fn()
}
describe("test multiple select", () => {
    it('', () => {
        const wrapper = render(<MultipleSelect {...defaultProps}/>);
        // 找到input
        const input: HTMLInputElement = wrapper.container.querySelector('input.viking-input-inner');
        expect(input).toBeInTheDocument();
        // input里默认有两个选项
        expect(wrapper.container.querySelectorAll('span.input-selected-option').length)
            .toBe(2);
        // 有两个关闭x
        expect(wrapper.queryAllByText('times').length).toBe(2);
        //input里的选项的容器div
        const inputOpts = wrapper.container.querySelector('div.input-selected-options');
        //第一个选项是nihao, 第二个是nihao2
        expect(inputOpts.childNodes[0]).toHaveTextContent('nihao');
        expect(inputOpts.childNodes[1]).toHaveTextContent('nihao2');

        // 点input
        fireEvent.focus(input);
        // 右侧箭头向上
        expect(wrapper.queryByText('arrow-up')).toBeInTheDocument();
        expect(wrapper.queryByText('arrow-down')).not.toBeInTheDocument();
        // 下拉列表出现
        expect(wrapper.container.querySelector('ul.select-options')).toBeInTheDocument();
        //同时有下拉列表和input内的选项
        expect(wrapper.queryAllByText('nihao').length).toBe(2);
        expect(wrapper.queryAllByText('nihao2').length).toBe(2);
        expect(defaultProps.onChange).toHaveBeenCalledTimes(0); // 事件没有被触发
        
        // 找到第一个下拉选项
        const selectOption1 = wrapper.container.querySelectorAll('li.select-option-item')[0]
        // 选项内有"你好"字样, 右侧有对勾
        expect(selectOption1).toHaveTextContent('nihao');
        const checkedc1 = wrapper.queryAllByText('check')[0];
        expect(checkedc1.parentNode).toBe(selectOption1);

        //点一次下拉选项, input内只剩下一个, 同时下拉选项也只有一个选中
        fireEvent.click(selectOption1);
        expect(wrapper.queryAllByText('check').length).toBe(1);
        expect(wrapper.container.querySelectorAll('span.input-selected-option').length)
            .toBe(1);
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1); // 触发事件

        // 再点一次下拉选项, 两个被选中
        fireEvent.click(selectOption1);
        expect(wrapper.queryAllByText('check').length).toBe(2);
        expect(wrapper.container.querySelectorAll('span.input-selected-option').length)
            .toBe(2);
        expect(defaultProps.onChange).toHaveBeenCalledTimes(2); // 触发事件

        // 点input内选项的关闭x, 只有一个被选中
        fireEvent.click(wrapper.queryAllByText('times')[0]);      
        expect(wrapper.queryAllByText('check').length).toBe(1);
        expect(wrapper.container.querySelectorAll('span.input-selected-option').length)
        .toBe(1);
        expect(defaultProps.onChange).toHaveBeenCalledTimes(3); // 触发事件
        
        // input内的value始终为空字符串
        fireEvent.change(input,  { target: { value: 'a' } });
        expect(input.value).toBe("");

        // 点外部, 下拉选项消失
        fireEvent.click(document);
        expect(wrapper.queryByText('arrow-down')).toBeInTheDocument();
        expect(wrapper.queryByText('arrow-up')).not.toBeInTheDocument();
        expect(wrapper.container.querySelector('ul.select-options')).not.toBeInTheDocument();
    })
})