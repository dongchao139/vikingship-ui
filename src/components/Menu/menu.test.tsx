import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu,{MenuProps} from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}
const testProps2: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const func =(props)=> {
    return (
        <Menu {...props}>
          <MenuItem>
            cool link1
          </MenuItem>
          <MenuItem disabled={true}>
            cool link2
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu>
    )
}
let wrapper: RenderResult, menuElement: HTMLElement, 
    activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test men', () => {
    beforeEach(()=> {
        wrapper = render(func(testProps));
        menuElement = wrapper.getByTestId("test-menu");
        activeElement = wrapper.getByText('cool link1');
        disabledElement = wrapper.getByText('cool link2');
    });

    it('default', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('viking-menu test');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click', () => {
        const item3 = wrapper.getByText('cool link3');

        fireEvent.click(item3);
        expect(item3).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalled();


        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
    });
    it('vertical', () => {
        cleanup();
        const wrapper2 = render(func(testProps2));
        const menuElement2 = wrapper2.getByTestId("test-menu");

        expect(menuElement2).toHaveClass('menu-vertical')
    });
})