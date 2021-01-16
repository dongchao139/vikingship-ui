import React, { InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import {useClickOutside2} from '../../hooks/useClickOutside';
import { Icon } from '../icon';
import {Input} from '../Input';

export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * type
     */
    type?: 'default' | 'calculator';
    /**
     * default value
     */
    defaultValue?: number | string;
    /**
     * size
     */
    size?: 'df' | 'lg' | 'sm';
    /**
     * onchange
     */
    onValueChange?: (option: number) => void;
}

export const InputNumber: React.FC<InputNumberProps> = (props) => {
    const {onValueChange, type = 'default', defaultValue, children, ...restprops} = props;
    
    const [value, setvalue] = useState<number | string>(defaultValue || null);
    const [show, setShow] = useState<boolean>(false);
    const handleChange = useCallback((e) => {
        const val: string = e.target.value;
        if (val === '') {
            setvalue('');
            return;
        }
        if (val.charAt(val.length - 1) === '.') {
            if (val.indexOf('.') !== (val.length - 1)) {
                return;
            }
            setvalue(val);
            return;
        }
        const num: number = Number(val);
        if (!isNaN(num)) {
            setvalue(num);
        } else {
            console.warn('value is ' + val + ' not a number');
        }
    }, []);
    const handleUp = useCallback(() => {
        const currVal = value || 0;
        setvalue(parseFloat(currVal + '') + 1)
    }, [value]);
    const handleDown = useCallback(() => {
        const currVal = value || 0;
        setvalue(parseFloat(currVal + '') - 1)
    }, [value]);

    const ref = useRef();
    const inputRef = useRef<HTMLElement>();

    useClickOutside2(ref,inputRef, () => {
        setShow(false);
    });
    const renderNumber = (num) => {
        return <span onClick={() => setvalue(val => {
            if (!val) {
                return num;
            }
            if (num === '.') {
                if (typeof val === 'string' && val.indexOf('.') !== (val.length - 1) 
                    && val.indexOf('.') !== -1) {
                    return val;
                }
            }
            return '' + val + num;
        })}>{num}</span>
    }
    return (
        <Input {...restprops} value={value}
          onChange={handleChange} inputRef={inputRef}
          onFocus={() => setShow(true)}
        >
            {type === 'default' ? 
            <>
            <span className="number-arrow-up"
                onClick={handleUp}
            >
                <Icon icon="angle-up"></Icon>
            </span>
            <span className="number-arrow-down"
                onClick={handleDown}
            >
                <Icon icon="angle-down"></Icon>
            </span> 
            </>:
            (show ? <>
            <Icon className="calculator-icon" icon="calculator"></Icon>
            <div className="number-calculator" ref={ref}>
                {[7,8,9,4,5,6,1,2,3,0,'.'].map(val => renderNumber(val))}
                <span>确认</span>
            </div></> : <><Icon className="calculator-icon" icon="calculator"></Icon></>)
           }
        </Input>

    )
}