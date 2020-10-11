import React, {InputHTMLAttributes, ReactElement} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../icon/icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: 'df' | 'lg' | 'sm';
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}

/**
 * <Input
 *   disabled
 *   size
 *   icon
 *   prepend
 *   append
 * />
 * .input .input-disabled .input-lg/.input-sm
 * @param props
 * @constructor
 */
export const Input: React.FC<InputProps> = (props) => {
  const {disabled, size, icon, prepend, append, style, ...restProps} = props;

  const classes = classNames('viking-input-wrapper', {
    'is-disabled': disabled,
    [`input-size-${size}`]: size,
    'input-group': prepend || append,
    'input-group-append': append,
    'input-group-prepend': prepend,
  });

  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon}/></div>}
      <input className="viking-input-inner" disabled={disabled} {...restProps}/>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}