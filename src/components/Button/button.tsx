import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
  Default = 'df'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  /**
   * the size of this button
   */
  size?: ButtonSize;
  /**
   * the type of this button
   */
  btnType?: ButtonType;
  /**
   * whether the button can be clicked
   */
  disabled?: boolean;
  /**
   * button name
   */
  children: React.ReactNode;
  /**
   * href url
   */
  href?: string;
  /**
   * classes
   */
  className?: string;
}

// 添加button和a的所有原生属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 不同的Button Type：<br/>
 *   <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>primary default danger（button元素） link-button（a元素）<br/>
 * 不同的Button Size：<br/>
 *   <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>Normal Small Large<br/>
 * Disabled状态<br/>
 *   <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>Disabled link-button disabled（a链接没有disabled属性，需要使用 .disabled）<br/>
 * <br/>
 * Button隐藏属性：<br/>
 *   <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>className、title、name、autofocus<br/>
 */
export const Button: React.FC<ButtonProps> = (
  {
    btnType = ButtonType.Primary, className, disabled,
    size = ButtonSize.Default,
    children, href, ...restProps
  }) => {
  // btn, btn-lg btn-primary
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  });
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes}
              disabled={disabled} {...restProps}
      >{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
};
