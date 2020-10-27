import React, {useState} from "react";
import {Menu} from "../components/Menu/menu";
import MenuItem from "../components/Menu/menuItem";
import SubMenu from "../components/Menu/submenu";
import {Button, ButtonSize, ButtonType} from "../components/Button/button";
import Transition from "../components/Transition/transition";

export default function (props) {
  const [show, setShow]= useState(false);
  return (
    <>
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
      <Button size={ButtonSize.Large} onClick={() => setShow(!show)}>
        Toggle
      </Button>
      <Transition in={show} animation="zoom-in-left" timeout={300}>
        <div>
          <code>
            const a = 'b';
          </code>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </div>
      </Transition>
      <Transition in={show} animation="zoom-in-left" timeout={300} wrapper={true}>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
          A Large Button
        </Button>
      </Transition>
    </>
  )
}