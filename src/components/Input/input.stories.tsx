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
  placeholder: 'default input'
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'disabled input'
}

export const Sm = Template.bind({});
Sm.args = {
  size: 'sm',
  placeholder: 'sm input'
}

export const Lg = Template.bind({});
Lg.args = {
  size: 'lg',
  placeholder: 'lg input'
}

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'calculator',
  placeholder: 'default input with calculator'
}

export const WithPrepend = Template.bind({});
WithPrepend.args = {
  prepend: 'https://',
  placeholder: 'default input with prepend'
}

export const WithAppend = Template.bind({});
WithAppend.args = {
  append: '@outlook.com',
  placeholder: 'default input with append'
}
