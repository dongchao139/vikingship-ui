import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

/**
 * jest @testing-library/jest-dom @testing-library/react
 * AAA模式：编排（Arrange），执行（Act），断言（Assert）。
 */
describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        // @ts-ignore
        expect(element.disabled).toBeFalsy();
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice');
        
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    });
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(
            <Button btnType={ButtonType.Link} href='http://dummyurl'>
                Link
            </Button>
        );
        const element = wrapper.queryByText('Link');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>);
        const element = wrapper.queryByText('Nice');

        expect(element).toBeInTheDocument();
        // @ts-ignore
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
})

export default {}