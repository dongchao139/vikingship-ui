import React, { useState, useContext } from 'react'
import classNames from 'classnames';
import {MenuContext} from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {index, title, children, className} = props;
    const context = useContext(MenuContext);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.activeIndex === index
    });

    const childrenComponent = React.Children.map(children, (child, i) => {
        const childElement = child as React.FunctionComponentElement<MenuItemProps>;
        if (childElement.type.displayName === 'MenuItem') {
            return childElement;
        }
        return null;
    });
    const subMenuClasses = classNames('viking-submenu', {
        'menu-opened': menuOpen
    });

    return (
        <li key={index} className={classes}>
            <div className="submenu-title" onClick={handleClick}>
                {title}
            </div>
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        </li>
    )
}

SubMenu.displayName = "MenuItem";
export default SubMenu