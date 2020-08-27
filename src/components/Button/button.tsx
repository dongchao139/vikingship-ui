import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * 不同的Button Type：
 *   primary default danger（button元素） link-button（a元素）
 * 不同的Button Size：
 *   Normal Small Large
 * Disabled状态
 *   Disabled link-button disabled（a链接没有disabled属性，需要使用 .dissabled）
 * 
 * Button隐藏属性：
 *   className、title、name、autofocus
 * 
 * 使用方法：
 * <Button
 *   size='lg'
 *   type='primary'
 *   disabled
 *   href=''?
 *   className=''?
 *   autoFocus=''?
 * >
 *   Viking Button
 * </Button>
 */
const Button: React.FC<BaseButtonProps> = (props) => {
  const { btnType, disabled, size, children, href } = props;
  // btn, btn-lg btn-primary
  const classes = classnames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  });
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes}
        disabled={disabled}
      >{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
};

export default Button;