import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import { Icon } from '../icon';
import {Input} from '../Input';

export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * default value
     */
    defaultValue?: number | '';
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
    const {onValueChange, defaultValue, children, ...restprops} = props;
    
    const [value, setvalue] = useState<number | ''>(defaultValue || null)

    const handleChange = useCallback((e) => {
        const val: string = e.target.value;
        if (val === '') {
            setvalue('');
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
        setvalue(currVal + 1)
    }, [value]);
    const handleDown = useCallback(() => {
        const currVal = value || 0;
        setvalue(currVal - 1)
    }, [value]);
    return (
        <Input {...restprops} value={value}
          onChange={handleChange}
        >
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
        </Input>

    )
}