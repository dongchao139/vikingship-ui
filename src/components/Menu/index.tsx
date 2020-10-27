import React from 'react'

import {Menu, MenuProps} from './menu';
import SubMenu, { SubMenuProps } from './submenu';
import MenuItem, { MenuItemProps } from './menuItem';

export type IMenuComponent = React.FC<MenuProps> & {
    Item?: React.FC<MenuItemProps>
    SubMenu?: React.FC<SubMenuProps>
}

let TransMenu: IMenuComponent = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu

// export type {MenuProps, MenuItemProps};
export default TransMenu;