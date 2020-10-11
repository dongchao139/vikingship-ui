import React from "react";
import {Input, InputProps} from "./input";
import {Story, Meta} from "@storybook/react/types-6-0";

export default {
  title: 'New/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args}/>

/**
 disabled?: boolean;
 size?: 'df' | 'lg' | 'sm';
 icon?: IconProp;

 prepend?: string | ReactElement;
 append?: string | ReactElement;
 */
export const Default = Template.bind({});
Default.args = {
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
}

export const Sm = Template.bind({});
Sm.args = {
  size: 'sm',
}

export const Lg = Template.bind({});
Lg.args = {
  size: 'lg',
}

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'calculator',
}

export const WithPrepend = Template.bind({});
WithPrepend.args = {
  prepend: 'https://',
}

export const WithAppend = Template.bind({});
WithAppend.args = {
  append: '@outlook.com',
}
