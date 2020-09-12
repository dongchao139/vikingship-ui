import React, { useState } from 'react';
import classnames from 'classnames';

export enum AlertType {
    SUCCESS = 'success',
    DEFAULT = 'default',
    DANGER = 'danger',
    WARNING = 'warning'
}

export interface IAlertProps {
    title?: string;
    closable?: boolean;
    customClose?: string;
    children: React.ReactNode;
    type: AlertType;
}

/**
 * <Alert title="提示标题欧亲" closable={true}, customClose={'x' | '关闭'}
 *      type={AlertType.SUCCESS}>
 *  this is alert!
 * </Alert>
 */
const Alert = (props: IAlertProps) => {
    const { title, closable = true, customClose = '关闭', type } = props;

    const classes = classnames('alert', {
        [`alert-${type}`]: type
    });

    const [visible, setVisible] = useState(true);
    return (
        visible ?
            <div className={classes}>
                {title ? <h4 className="alert-title">{title}</h4> : null}
                <p className="alert-message">{props.children}</p>
                {closable ? <i onClick={() => setVisible(false)}>{customClose}</i> : null}
            </div>
            : null
    );
}

export default Alert;