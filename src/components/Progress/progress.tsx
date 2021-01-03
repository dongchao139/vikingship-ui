import React from "react";
import {ThemeProps} from "../icon/icon";

export interface ProgressProps {
  /**
   * 当前百分比
   */
  percent: number;
  /**
   * 高度
   */
  strokeHeight?: number;
  /**
   * 是否显示百分比数字
   */
  showText?: boolean;
  /**
   * 额外的样式
   */
  styles?: React.CSSProperties;
  /**
   * 主题
   */
  theme?: ThemeProps;
}

export const Progress: React.FC<ProgressProps> =
  ({
     percent,
     strokeHeight = 15,
     showText = true,
     styles,
     theme = "primary"
  }) => {
    return (
      <div className="viking-progress-bar" style={styles}>
        <div className="viking-progress-bar-outer" style={{height: `${strokeHeight}px`}}>
          <div className={`viking-progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
            {showText && <span className="inner-text">{`${percent}%`}</span>}
          </div>
        </div>
      </div>
    )
}