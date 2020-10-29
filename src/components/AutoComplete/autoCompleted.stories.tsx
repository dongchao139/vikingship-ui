import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { AutoCompleted } from './autoCompleted';
import { DataSourceType } from './autoComplete';

export default {
    title: 'New/AutoCompleted',
    component: AutoCompleted,
} as Meta;

const arr: DataSourceType<{ number: number }>[] = [
    { value: 'abc', number: 1 }, { value: 'def', number: 1 }, { value: 'ghi', number: 1 },
    { value: 'jkl', number: 1 }, { value: 'mno', number: 1 }, { value: 'pqr', number: 1 },
    { value: 'stu', number: 1 }, { value: 'vwx', number: 1 }, { value: 'yz', number: 1 }]

const searchFunction = (key: string, item: DataSourceType<{ number: number }>) => {
    return item.value.includes(key) || item.number.toString().includes(key);
};

const handleSelect = (item: DataSourceType<{ number: number }>) => {
    console.log(item);
}

const renderOption = (item: DataSourceType<{ number: number }>) => {
    return (
        <h3>{item.value} - {item.number}</h3>
    )
}

export const Default = (args) => (
    <AutoCompleted dataArr={arr}
        placeholder="test" renderOption={renderOption}
        searchFunc={searchFunction} onSelect={handleSelect} {...args} />
)