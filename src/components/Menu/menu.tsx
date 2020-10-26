import React, { useState, createContext } from 'react'
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'hrizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubs?: string[]
}

interface IMenuContext {
  activeIndex: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubs?: string[]
}

export const MenuContext = createContext<IMenuContext>({ activeIndex: '0' });

/**
 * the menu component
 * @param param0 
 */
export const Menu: React.FC<MenuProps> = 
({
  defaultIndex = '0',
   className, mode = 'hrizontal', 
   style, children, onSelect,
   defaultOpenSubs = []
}) => {
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const [currentActive, setActive] = useState(defaultIndex);

  const handleSelect = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContent: IMenuContext = {
    activeIndex: currentActive,
    onSelect: handleSelect,
    mode: mode,
    defaultOpenSubs: defaultOpenSubs
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContent}>
        {React.Children.map(children, (child, index) => {
          const childElement = child as React.FunctionComponentElement<MenuItemProps>;
          if (childElement.type.displayName === 'MenuItem') {
            return React.cloneElement(childElement, { index: index + '' });
          }
          console.error("Warning: Menu has a child whitch is not a MenuItem Component");
          return null;
        })}
      </MenuContext.Provider>
    </ul>
  )
};