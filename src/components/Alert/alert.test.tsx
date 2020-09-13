import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { IAlertProps, AlertType } from './alert';

const testAlertProp: IAlertProps = {
  title: "testAlert",
  closable: true,
  customClose: "关闭",
  type: AlertType.DEFAULT
}


const testSuccessAlertProp: IAlertProps = {
  closable: true,
  customClose: "关闭",
  type: AlertType.SUCCESS
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const wrapper = render(<Alert {...testAlertProp}>Nice</Alert>);
    const element = wrapper.queryByText('Nice');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('P');
    expect(element).toHaveClass('alert-message');
    expect(element.parentNode).toHaveClass('alert alert-default');

    const titleElement = wrapper.queryByText('testAlert');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('alert-title');
    expect(titleElement.parentNode).toBe(element.parentNode);

    const iconElement = wrapper.queryByText('关闭');
    fireEvent.click(iconElement);
    expect(element).not.toBeInTheDocument();
  });
  
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Alert {...testSuccessAlertProp}>Nice</Alert>);
    const element = wrapper.queryByText('Nice');

    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('P');
    expect(element).toHaveClass('alert-message');
    expect(element.parentNode).toHaveClass('alert alert-success');

    const iconElement = wrapper.queryByText('关闭');
    expect(iconElement).toBeInTheDocument();
    fireEvent.click(iconElement);
    expect(element).not.toBeInTheDocument();
  });
})