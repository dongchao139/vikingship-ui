import React from "react";
import {InputNumber, InputNumberProps} from "./InputNumber";
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
  title: 'New/InputNumber',
  component: InputNumber,
} as Meta;

const Template: Story<InputNumberProps> = (args) => <InputNumber {...args}/>

/**
 disabled?: boolean;
 size?: 'df' | 'lg' | 'sm';
 icon?: IconProp;

 prepend?: string | ReactElement;
 append?: string | ReactElement;
 */
export const Default = Template.bind({});
Default.args = {
    defaultValue: 1
}

export const Calculator = Template.bind({});
Calculator.args = {
  defaultValue: '',
  type: 'calculator'
}