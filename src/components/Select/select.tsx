import { append, filter, indexOf, map, remove } from 'ramda';
import React, { useRef, useState } from 'react';
import { Icon } from '../icon';
import {Input} from '../Input/input';
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectProps {
    /**
     * 选项
     */
    options: string[];
    /**
     * 默认选中的选项
     */
    defaultSelectedOptions?: string[];
    /**
     * the value was changed
     */
    onChange: (opts: string[]) => void;
}

export const MultipleSelect: React.FC<SelectProps> = 
({
    defaultSelectedOptions, options,onChange
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelectedOptions);
    const componentRef = useRef(null);
    const [showList, setShowList] = useState(false);
    const selectOptionList = map((opt: string) => {
            if (selectedOptions.includes(opt)) {
                return {name: opt, selected: true}
            }
            return {name: opt, selected: false}
   })(options);

    const handleItemClick = (option) => {
        setSelectedOptions(preSelectedOptions => {
            if (!preSelectedOptions.includes(option.name)) {
                const values = append(option.name)(preSelectedOptions);
                onChange(values);
                return values;
            }
            const index = indexOf(option.name)(preSelectedOptions);
            const values = remove(index, 1)(preSelectedOptions) as string[];
            onChange(values);
            return values;
        })
    }
    const handleOptionClick = (optionName) => {
        setSelectedOptions(preSelectedOptions => {
            if (preSelectedOptions.includes(optionName)) {
                const index = indexOf(optionName)(preSelectedOptions);
                const values = remove(index, 1)(preSelectedOptions) as string[];
                onChange(values);
                return values;
            }
            return preSelectedOptions;
        })
    }
    useClickOutside(componentRef,() => {
        setShowList(false);
    });
    return (
        <div className="viking-select-wrapper" ref={componentRef}>
            <Input icon={showList ? 'arrow-up' : 'arrow-down'}
            placeholder=""
            onIconClick={() => setShowList(!showList)}
            onFocus={() => setShowList(true)} value="">
                <div className="input-selected-options">
                    {selectedOptions && selectedOptions.map(option => {
                        return (
                        <span className="input-selected-option" 
                            onClick={() => handleOptionClick && handleOptionClick(option)}>
                            {option}
                            <Icon icon="times" />
                        </span>
                        )
                    })} 
                </div>
            </Input>
            {showList && 
            <ul className="select-options">
                {selectOptionList.map(option => {
                    const classes = classNames('select-option-item', {
                        'selected': option.selected
                    })
                    return (
                        <li key={option.name} className={classes}
                            onClick={() => handleItemClick(option)}>
                            {option.name}
                            {option.selected && <Icon icon="check" />}
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    )
}