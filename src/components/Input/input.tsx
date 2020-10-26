import React, {InputHTMLAttributes, ReactElement} from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import {Icon} from "../icon/icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * disabled
   */
  disabled?: boolean;
  /**
   * size
   */
  size?: 'df' | 'lg' | 'sm';
  /**
   * icon
   */
  icon?: IconProp;
  /**
   * prepend
   */
  prepend?: string | ReactElement;
  /**
   * append
   */
  append?: string | ReactElement;

  /**
   * the placeholder
   */
  placeholder: string;
}

/**
 * .viking-input-wrapper .is-disabled .input-size-lg/.input-size-sm
 * .input-group .input-group-append .input-group-prepend .input-inner
 */
export const Input: React.FC<InputProps> = (props) => {
  const {disabled, size, icon, prepend, append, style,placeholder, ...restProps} = props;

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
      <input placeholder={placeholder}
             className="viking-input-inner"
             disabled={disabled} {...restProps}/>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}