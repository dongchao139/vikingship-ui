import React from 'react'
import {Meta} from "@storybook/react/types-6-0";
import {MultipleSelect} from './select';

export default {
    title: 'New/Select',
    component: MultipleSelect
} as Meta;

export const DEFAULT = (args) => {
    return <MultipleSelect options={['nihao','nihao2','nihao3','disabled','nihao5']} 
    onChange={values => console.log(values)}
     defaultSelectedOptions={['nihao','nihao2']}  {...args}/>
}