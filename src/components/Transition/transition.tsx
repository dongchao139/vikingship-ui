import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import classNames from "classnames";

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom';

export type TransitionProps<Ref extends undefined | HTMLElement = undefined>
  = CSSTransitionProps<Ref> & {
  animation?: AnimationName
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {children, animation, ...restProps} = props;
  const clsNames = props.classNames;
  const classes = classNames(animation, clsNames);
  return (
    <CSSTransition classNames={classes} {...restProps}>
      {children}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition;