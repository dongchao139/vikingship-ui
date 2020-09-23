import React, { useState, useEffect } from 'react'
import classNames from 'classnames';

type TabStyle = "underline" | "outline";

export interface TabProps {
    defaultIndex:number;
    styleType: TabStyle;
    onSelect:(selectedIndex: number) => void;
    className: string;
}

function Tabs(props) {
    const classes = classNames('tabs-nav',{
        'tabs-underline': props.styleType === "underline",
        'tabs-outline': props.styleType === "outline"
    });

    return (
        <div>
            <nav className={classes}>
                <ul className="tabs-ul">
                    <li className="tabs-label tabs-label-active">label1</li>
                    <li className="tabs-label">label2</li>
                    <li className="tabs-label tabs-label-disabled">label3</li>
                </ul>
            </nav>
            <div className="tabs-content tabs-content-active">content1</div>
            <div className="tabs-content">content2</div>
            <div className="tabs-content">content3</div>
        </div>
    )
}

Tabs.defaultProps = {
    defaultIndex: '0',
    styleType: 'underline'
  }
export default Tabs;