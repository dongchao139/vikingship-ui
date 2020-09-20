import React, { useState, createContext } from 'react'
import classNames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';

type MenuMode = 'hrizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  activeIndex: number;
  onSelect?: SelectCallback;
}

export const MenuContenxt = createContext<IMenuContext>({ activeIndex: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  });

  const [currentActive, setActive] = useState(defaultIndex);

  const handleSelect = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContent: IMenuContext = {
    activeIndex: currentActive,
    onSelect: handleSelect
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContenxt.Provider value={passedContent}>
        {React.Children.map(children, (child, index) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          if (childElement.type.displayName === 'MenuItem') {
            return React.cloneElement(childElement, { index });
          }
          console.error("Warning: Menu has a child whitch is not a MenuItem Component");
          return null;
        })}
      </MenuContenxt.Provider>
    </ul>
  )
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'hrizontal'
}

export default Menu;