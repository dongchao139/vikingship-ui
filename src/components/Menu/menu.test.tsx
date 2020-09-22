import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import Menu,{MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './submenu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}
const testProps2: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
    mode: 'vertical'
}

const testProps3: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
    mode: 'vertical',
    defaultOpenSubs: ['3']
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
          <SubMenu title="drop down">
            <MenuItem>
                drop1
            </MenuItem>
          </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const css = `
        .viking-submenu {
            display: none;
        }
        .viking-submenu.menu-opened {
            display: block;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, 
    activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test men', () => {
    beforeEach(()=> {
        wrapper = render(func(testProps));
        wrapper.container.appendChild(createStyleFile());
        menuElement = wrapper.getByTestId("test-menu");
        activeElement = wrapper.getByText('cool link1');
        disabledElement = wrapper.getByText('cool link2');
    });
    it('default', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('viking-menu test');
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    it('click', () => {
        const item3 = wrapper.getByText('cool link3');

        fireEvent.click(item3);
        expect(item3).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');

        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    });
    it('submenu dropdown', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();

        const dropdownElement = wrapper.getByText('drop down');
        fireEvent.mouseEnter(dropdownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        });
        fireEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');

        fireEvent.mouseLeave(dropdownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        })
    });
    it('vertical', () => {
        cleanup();
        const wrapper2 = render(func(testProps2));
        wrapper2.container.appendChild(createStyleFile());
        const menuElement2 = wrapper2.getByTestId("test-menu");

        expect(menuElement2).toHaveClass('menu-vertical');
        expect(wrapper2.queryByText('drop1')).not.toBeVisible();

        const dropdownElement2 = wrapper2.getByText('drop down');
        fireEvent.click(dropdownElement2);
        expect(wrapper2.queryByText('drop1')).toBeVisible();

        fireEvent.click(dropdownElement2);
        expect(wrapper2.queryByText('drop1')).not.toBeVisible();
    });

    it('vertical', () => {
        cleanup();
        const wrapper3 = render(func(testProps3));
        wrapper3.container.appendChild(createStyleFile());
        const menuElement2 = wrapper3.getByTestId("test-menu");

        expect(menuElement2).toHaveClass('menu-vertical');
        expect(wrapper3.queryByText('drop1')).toBeVisible();

        const dropdownElement2 = wrapper3.getByText('drop down');
        fireEvent.click(dropdownElement2);
        expect(wrapper3.queryByText('drop1')).not.toBeVisible();

        fireEvent.click(dropdownElement2);
        expect(wrapper3.queryByText('drop1')).toBeVisible();
    });

})