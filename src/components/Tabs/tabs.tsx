import React, {useState, useEffect} from 'react'
import classNames from 'classnames';
import {TabsItemProps} from "./tabs-item";

type TabStyle = "underline" | "outline";

export interface TabProps {
  defaultIndex?: number;
  styleType?: TabStyle;
  onSelect?: (selectedIndex: number) => void;
  className?: string;
}

const Tabs: React.FC<TabProps> = (props) => {
  const classes = classNames('tabs-nav', props.className, {
    'tabs-underline': props.styleType === "underline",
    'tabs-outline': props.styleType === "outline"
  });
  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(index) {
    setActiveIndex(index);
    if (typeof props.onSelect === 'function') {
      props.onSelect(index);
    }
  }

  return (
    <div>
      <nav className={classes}>
        <ul className="tabs-ul">
          {React.Children.map(props.children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>;
            const itemLabelClasses = classNames('tabs-label', {
              'tabs-label-active': activeIndex === index,
              'tabs-label-disabled': childElement.props.disabled
            });
            return (
              <li key={index} className={itemLabelClasses} onClick={() => handleClick(index)}>
                {childElement.props.label}
              </li>)
          })}
        </ul>
      </nav>
      {React.Children.map(props.children, (child, index) => {
        const childElement = child as React.FunctionComponentElement<TabsItemProps>;
        return React.cloneElement(childElement, {isActive: activeIndex === index});
      })}
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  styleType: 'underline'
}
export default Tabs;