import React from "react";
import Menu from "../components/Menu/menu";
import MenuItem from "../components/Menu/menuItem";
import SubMenu from "../components/Menu/submenu";

function Demo02(_props) {
  return (
    <>
      <hr/>
      <Menu defaultIndex={'0'} onSelect={i => console.log(i)}>
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
      <hr/>
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
    </>
  )
}

export default Demo02;