import React, {useState} from 'react'
import classNames from 'classnames';
import {TabsItemProps} from "./tabs-item";

type TabStyle = "underline" | "outline";

export interface TabProps {
  defaultIndex?: number;
  styleType?: TabStyle;
  onSelect?: (selectedIndex: number) => void;
  className?: string;
}

export const Tabs: React.FC<TabProps> = 
({
  className, styleType = 'underline', defaultIndex = 0, children,onSelect
}) => {
  const classes = classNames('tabs-nav', className, {
    'tabs-underline': styleType === "underline",
    'tabs-outline': styleType === "outline"
  });
  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(index: number, disabled: boolean): void {
    if (disabled) {
      return;
    }
    setActiveIndex(index);
    if (typeof onSelect === 'function') {
      onSelect(index);
    }
  }

  return (
    <div>
      <nav className={classes}>
        <ul className="tabs-ul">
          {React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>;
            const itemLabelClasses = classNames('tabs-label', {
              'tabs-label-active': activeIndex === index,
              'tabs-label-disabled': childElement.props.disabled
            });
            return (
              <li key={index} className={itemLabelClasses} onClick={() => handleClick(index, childElement.props.disabled)}>
                {childElement.props.label}
              </li>)
          })}
        </ul>
      </nav>
      {React.Children.map(children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<TabsItemProps>;
        return React.cloneElement(childElement, {isActive: activeIndex === index});
      })}
    </div>
  )
}