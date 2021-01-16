import React from "react";
import {InputDate, InputDateProps} from "./inputDate";
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
  title: 'New/InputDate',
  component: InputDate,
} as Meta;

const Template: Story<InputDateProps> = (args) => <InputDate {...args}/>

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