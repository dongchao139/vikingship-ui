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
}

export const MultipleSelect: React.FC<SelectProps> = 
({
    defaultSelectedOptions, options
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelectedOptions);
    const componentRef = useRef(null);
    const [showList, setShowList] = useState(true);
    const selectOptionList = map((opt: string) => {
            if (selectedOptions.includes(opt)) {
                return {name: opt, selected: true}
            }
            return {name: opt, selected: false}
   })(options);

    const handleItemClick = (option) => {
        setSelectedOptions(preSelectedOptions => {
            if (!preSelectedOptions.includes(option.name)) {
                return append(option.name)(preSelectedOptions);
            }
            const index = indexOf(option.name)(preSelectedOptions);
            return remove(index, 1)(preSelectedOptions) as string[];
        })
    }
    const handleOptionClick = (optionName) => {
        setSelectedOptions(preSelectedOptions => {
            if (preSelectedOptions.includes(optionName)) {
                const index = indexOf(optionName)(preSelectedOptions);
                return remove(index, 1)(preSelectedOptions) as string[];
            }
            return preSelectedOptions;
        })
    }
    useClickOutside(componentRef,()=> {
        setShowList(false);
    });
    return (
        <div className="viking-select-wrapper" ref={componentRef}>
            <Input icon={showList ? 'arrow-up' : 'arrow-down'}
            placeholder="" onOptionClick={handleOptionClick}
            onIconClick={() => setShowList(!showList)}
            onFocus={() => setShowList(true)} >
                {selectedOptions}
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