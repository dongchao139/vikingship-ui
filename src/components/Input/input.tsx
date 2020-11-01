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

  /**
   * selected options for select component
   */
  children?: string[];
  /**
   * one option was clicked
   */
  onOptionClick?: (option: string) => void;
  /**
   * icon was clicked
   */
  onIconClick?: () => void;
}

/**
 * .viking-input-wrapper .is-disabled .input-size-lg/.input-size-sm
 * .input-group .input-group-append .input-group-prepend .input-inner
 */
export const Input: React.FC<InputProps> = (props) => {
  const {disabled, size, icon, prepend, append, style,placeholder, children,
    onOptionClick,onIconClick, ...restProps} = props;

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
      {icon && <div className="icon-wrapper" onClick={onIconClick} ><Icon icon={icon}/></div>}
      <input placeholder={placeholder}
             className="viking-input-inner"
             disabled={disabled} {...restProps}/>
             <div className="input-selected-options">
             {React.Children.map(children, option => {
               return <span className="input-selected-option" 
                onClick={() => onOptionClick && onOptionClick(option)}>
                 {option}
                 <Icon icon="times" />
               </span>
             })} 
               </div>
      {append && 
      <div className="viking-input-group-append">{append}</div>
      }
    </div>
  )
}