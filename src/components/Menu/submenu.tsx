import React, {useState, useContext} from 'react'
import classNames from 'classnames';
import {MenuContext} from './menu';
import {MenuItemProps} from './menuItem';
import Icon from "../icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {index, title, children, className} = props;
  const context = useContext(MenuContext);
  const isOpen: boolean = index && context.mode === 'vertical'
    && context.defaultOpenSubs.includes(index);

  const [menuOpen, setMenuOpen] = useState(isOpen);

  const handleClick = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 250);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
  } : {};

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });

  const childrenComponent = React.Children.map(children, (child, i) => {
    const childElement = child as React.FunctionComponentElement<MenuItemProps>;
    if (childElement.type.displayName === 'MenuItem') {
      return React.cloneElement(childElement, {
        index: `${index}-${i}`
      });
    }
    console.error("Warning: Menu has a child witch is not a MenuItem Component");
    return null;
  });
  const subMenuClasses = classNames('viking-submenu', {
    'menu-opened': menuOpen
  });

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="arrow-down" className="arrow-icon"/>
      </div>
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
      {/*<CSSTransition in={menuOpen} timeout={300} classNames="zoom-in-top"
                     // 初次加载时也有动画
                     appear
                    // 进入时挂载, 离开时卸载
                     unmountOnExit={true}
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>*/}
    </li>
  )
}

SubMenu.displayName = "MenuItem";
export default SubMenu