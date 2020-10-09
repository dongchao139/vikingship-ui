import React, {useState} from 'react';
import classnames from 'classnames';
import Transition from "../Transition/transition";
import Icon from "../icon/icon";

export type AlertType = 'success' | 'primary' | 'warning' | 'danger';

export interface IAlertProps {
  title?: string;
  closable?: boolean;
  customClose?: string;
  onClose?: (() => void);
  children?: React.ReactNode;
  type: AlertType;
}

/**
 * <Alert title="提示标题欧亲" closable={true}, customClose={'x' | '关闭'}
 *      type={AlertType.SUCCESS}>
 *  this is alert!
 * </Alert>
 */
const Alert: React.FC<IAlertProps> = (props: IAlertProps) => {
  const {title, closable = true, type} = props;

  const customClose = props.customClose
    || <Icon icon="times" className="window-close" size='lg'/>;

  const classes = classnames('alert', {
    [`alert-${type}`]: type
  });

  const handleClick = () => {
    setVisible(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  const [visible, setVisible] = useState(true);
  return (
    <Transition in={visible} animation="zoom-in-left" timeout={300} wrapper={true}>
      <div className={classes}>
        {title ? <h4 className="alert-title">{title}</h4> : null}
        <p className="alert-message">{props.children}</p>
        {closable ? <i onClick={handleClick}>{customClose}</i> : null}
      </div>
    </Transition>
  );
}

export default Alert;