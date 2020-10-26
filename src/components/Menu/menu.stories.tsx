import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Menu, MenuProps} from './menu';
import MenuItem from './menuItem';
import SubMenu from './submenu';

export default {
    title: 'New/Menu',
    component: Menu,
} as Meta;

export const Horizontal = (args) => (
    <Menu defaultIndex={'0'} onSelect={i => console.log(i)}
        {...args}
    >
        <MenuItem>
          cool link1
        </MenuItem>
        <MenuItem disabled={true}>
          cool link2
        </MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>
            cool link3
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link3
        </MenuItem>
      </Menu>
)

export const Vertical = (args) => (
    <Menu defaultIndex={'0'} onSelect={i => console.log(i)}
        mode="vertical"
        // defaultOpenSubs= {['2']}
      >
        <MenuItem>
          cool link1
        </MenuItem>
        <MenuItem disabled={true}>
          cool link2
        </MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>
            cool link3
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
          <MenuItem>
            cool link3
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link3
        </MenuItem>
      </Menu>
)