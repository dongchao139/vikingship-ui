import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import classNames from "classnames";

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';

export type TransitionProps<Ref extends undefined | HTMLElement = undefined>
  = CSSTransitionProps<Ref> & {
  animation?: AnimationName,
  wrapper?: boolean // 添加一层dom, 避免transition冲突
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {children, animation, wrapper, ...restProps} = props;
  const clsNames = props.classNames;
  const classes = classNames(animation, clsNames);
  return (
    <CSSTransition classNames={classes} {...restProps}>
      {wrapper ?<div>{children}</div> :children}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  unmountOnExit: true,// 进入时挂载, 离开时卸载
  appear: true// 初次加载时也有动画
}

export default Transition;