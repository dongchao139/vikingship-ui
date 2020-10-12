import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Input, InputProps} from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}

describe('test input component', () => {
  it('should render the correct default input', function () {
    const wrapper = render(<Input {...defaultProps} />)
    const testNode = wrapper.getByPlaceholderText('test-input')  as HTMLInputElement;

    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('viking-input-inner');

    fireEvent.change(testNode, {target: {value: '23'}});
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('23');
  });
  it('should render the disabled input on disabled property', function () {
    const wrapper = render(<Input placeholder="disabled" disabled />);
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it('should render different input sizes on size property', function () {
    const wrapper = render(<Input placeholder="sizes" size="lg" />)
    const testContainer = wrapper.container.querySelector('.viking-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  });
  it('should render prepend and append element on prepend/append property', function () {
    const wrapper = render(<Input placeholder="pend" prepend="https://" append=".com" />);
    const testContainer = wrapper.container.querySelector(".viking-input-wrapper");

    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    expect(wrapper.queryByText('https://')).toBeInTheDocument();
    expect(wrapper.queryByText('.com')).toBeInTheDocument();
  });
})